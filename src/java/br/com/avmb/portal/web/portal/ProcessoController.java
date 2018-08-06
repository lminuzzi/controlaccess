package br.com.avmb.portal.web.portal;

import br.com.avmb.bpmn.components.XmlComponent;
import br.com.avmb.bpmn.model.*;
import br.com.avmb.bpmn.service.*;
import br.com.avmb.bpmn.service.com.IBpmnInstanciaCOMService;
import br.com.avmb.bpmn.utils.AnexoUtils;
import br.com.avmb.bpmn.utils.FileUtils;
import br.com.avmb.bpmn.web.interceptor.UsuarioInterceptor;
import br.com.avmb.bpmn.web.step.BinariosToView;
import br.com.avmb.bpmn.web.step.BpmnAcaoView;
import br.com.avmb.bpmn.web.step.JSON2BpmnInstanciaVariavel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * @author: Leandro Sacchet (leandro.sacchet@avmb.com.br)
 * @version: 02/04/13
 * @since: 1.0
 */
@Controller
public class ProcessoController
{
    private Logger logger = Logger.getLogger( PortalController.class.getName() );

    @Autowired
    private IBpmnInstanciaService instanciaService;
    @Autowired
    private IBpmnInstanciaCOMService instanciaCOMService;
    @Autowired
    private IBpmnMapaNavegacaoService mapaNavegacaoService;
    @Autowired
    private IBpmnAcaoService acaoService;
    @Autowired
    private IBpmnComponentService componentService;
    @Autowired
    private IBpmnInstanciaElementoService instanciaElementoService;
    @Autowired
    private IBpmnErrorInstanciaService errorInstanciaService;
    @Autowired
    private IBpmnService service;
    @Autowired
    private IBpmnMenuService menuService;
    @Autowired
    private IBpmnElementoService elementoService;

    private
    @Value( "#{configuracaoProps['tamanho.arquivos.upload']}" )
    Integer maxFileUpload;
    @Value( "#{configuracaoProps['tamanho.extensao.anexo']}" )
    Integer tamanhoExtensaoAnexo;
    @Value( "#{configuracaoProps['ultimos.andamentos.max.results']}" )
    private Integer maxResults;

    @Resource( name = "dateFormat" )
    private DateFormat dateFormat;

    @RequestMapping( value = "/portal/processo/{versao}" )
    public String processo( @PathVariable( "versao" ) Long idVersao,
                            @RequestParam( value = "instancia", required = false ) Long id,
                            @RequestParam( value = "elemento", required = false ) Long idElemento,
                            @RequestParam( value = "elementoAnterior", required = false ) Long idElementoAnterior,
                            Model model,
                            RedirectAttributes ra,
                            HttpServletRequest request )
            throws Exception
    {
        Map<String, Object> map = model.asMap();
        if( map != null ) {
            Object instanciaObj = map.get( "instancia" );
            if( instanciaObj != null ) {
                id = ( Long ) instanciaObj;
            }
            Object elementoAnteriorObj = map.get( "elementoAnterior" );
            if( elementoAnteriorObj != null ) {
                idElementoAnterior = ( Long ) elementoAnteriorObj;
            }
        }

        if( id == null ) {
            logger.info( "Criando a nova instancia ..." );
            // não podemos colocar tudo em um serviço devido a necessidade de uma nova transação ao chamar o COM
            BpmnInstancia instancia = instanciaService.insert( idVersao );
            id = instancia.getId();

            logger.info( "Chamando o SI* ..." );
            instanciaCOMService.executeNoThread( id );
        }

        logger.info( "Buscando as ações ..." );
        Usuario usuario = UsuarioInterceptor.get( request );

        if( idElementoAnterior != null || idElemento == null ) {
            Map<String, Object> step = mapaNavegacaoService.getStep( id,
                    idElementoAnterior != null ? idElementoAnterior : null,
                    usuario );
            if( step != null ) {
                Object elementoObj = step.get( "ID_ELEMENTO" );
                idElemento = elementoObj != null ? ( ( Number ) elementoObj ).longValue() : null;
                Object instanciaObj = step.get( "ID_INSTANCIA" );
                id = instanciaObj != null ? ( ( Number ) instanciaObj ).longValue() : null;
            }
        }

        if( idElemento != null ) {

            if( elementoService.hasPermissao( id, idElemento, usuario.getId(), idVersao ) ) {

                // ATENÇÃO: a primeira instrução que precisamos fazer é chamar o método de restrições antes de continuar
                // deve ser chamado ANTES de buscar as ações!!!
                Long idInstanciaElemento = instanciaElementoService.getByInstanciaAndElemento( id, idElemento );

                // primeiramente vamos verificar se temos restrições
                if( elementoService.hasRestricoes( idElemento ) ) {
                    logger.info( "Executando restrições..." );
                    instanciaCOMService.executeRestricoes( idInstanciaElemento );
                }

                Collection<BpmnAcao> acoes = acaoService.getByInstanciaX( id, idElemento, usuario );

                Collection<BpmnAcao> acoesComponents = componentService.getAcoesAndComponentesReadonly( id,
                        idVersao,
                        idElemento,
                        usuario );

                boolean hasAcoes = acoes != null && !acoes.isEmpty();
                boolean hasComponents = acoesComponents != null && !acoesComponents.isEmpty();
                if( hasAcoes || hasComponents ) {

                    idElemento = hasAcoes ? acoes.iterator().next().getElemento().getId() : acoesComponents.iterator()
                            .next()
                            .getElemento()
                            .getId();

                    Number idUsuarioResp = instanciaElementoService.getResponsavel( id, idElemento );

                    // se não foi assumido ainda, ou foi assumido pelo usuário logado, podemos prosseguir no passo
                    if( idUsuarioResp == null || isAssumidoUsuarioLogado( request, idUsuarioResp ) ) {

                        Map<String, Object> processo = instanciaService.getProcesso( id );
                        model.addAttribute( "processo", processo );

                        model.addAttribute( "instanciaElemento",
                                instanciaElementoService.getByInstanciaAndElemento( id, idElemento ) );

                        //Se tiver campos que ainda não sao componentes, tbm são enviados para a tela!
                        if( hasAcoes ) {
                            Collection<BpmnAcaoView> acoesView = getAcoesView( acoes );
                            model.addAttribute( "acoesView", acoesView );
                            model.addAttribute( "loopIteracao", getLoopIteracao( acoesView ) );
                        }

                        if( hasComponents ) {
                            Collection<BpmnAcaoView> acoesViewComponents = getAcoesView( acoesComponents );
                            model.addAttribute( "acoesViewComponents", acoesViewComponents );
                            model.addAttribute( "loopIteracao", getLoopIteracao( acoesViewComponents ) );
                        }

                        model.addAttribute( "maxFileUpload", FileUtils.getInMega( maxFileUpload ) );
                        model.addAttribute( "tamanhoExtensaoAnexo", tamanhoExtensaoAnexo );
                        model.addAttribute( "idElemento", idElemento );

                        model.addAttribute( "isAssumido", idUsuarioResp != null );
                        model.addAttribute( "hasError", errorInstanciaService.hasError( id ) );

                        model.addAttribute( "versao", idVersao );

                        model.addAttribute( "hasRemoveInstancia",
                                instanciaService.isPermitidoDeletar( id, idElemento, usuario.getId() ) );
                        model.addAttribute( "ultimosAndamentos",
                                instanciaService.getCriadasUsuarioAtivas( usuario.getId(), maxResults ) );

                        model.addAttribute( "toolBars", menuService.getMenuToolBar( usuario.getId() ) );

                        return "/portal/processo";
                    }
                }
            }
        }

        ra.addFlashAttribute( "finalizado", Boolean.TRUE );
        ra.addFlashAttribute( "isInstanciaAberta", instanciaService.isAberta( id ) );
        return "redirect:/portal/index";
    }

    @RequestMapping( value = "/portal/processo/removeinstancia.action", method = POST )
    public String removeInstancia( @RequestParam( "instancia" ) Long idInstancia,
                                   @RequestParam( "elemento" ) Long idElemento,
                                   HttpServletRequest request )
    {
        instanciaService.delete( idInstancia, idElemento, UsuarioInterceptor.get( request ).getId() );
        return "redirect:/portal/index";
    }

    @RequestMapping( value = "/portal/processo/submit", method = POST )
    public String stepSubmit( @RequestParam( "instancia" ) Long idInstancia,
                              @RequestParam( "elemento" ) Long idElemento,
                              @RequestParam( "iteracao" ) Integer iteracao,
                              @RequestParam( "versao" ) Long idVersao,
                              @RequestParam String valuesJSON,
                              RedirectAttributes ra,
                              HttpServletRequest request )
            throws Exception
    {
        Usuario usuario = UsuarioInterceptor.get( request );

        // vamos verificar se tem alguma ação...
        Collection<BpmnAcao> acoes = acaoService.getByInstanciaX( idInstancia, idElemento, usuario );
        Collection<BpmnAcao> acoesComponents = componentService.getAcoesAndComponents( idInstancia,
                idVersao,
                idElemento,
                usuario );

        Collection<BpmnInstanciaVariavel> ivs = null;
        Collection<BpmnInstanciaVariavel> ivsComponents = null;

        boolean hasAcoes = acoes != null && !acoes.isEmpty();
        boolean hasComponents = acoesComponents != null && !acoesComponents.isEmpty();
        if( hasAcoes || hasComponents ) {

            // tem ações, precisamos converter e validar os dados vindos do form

            String path = AnexoUtils.getTempPath( request, usuario );

            Map<Long, BpmnAcao> mapAcoes = null;
            if( hasAcoes ) {
                mapAcoes = getMapDestinoToAcao( acoes );
            }

            Map<Long, BpmnAcao> mapAcoesComponents = null;
            if( hasComponents ) {
                mapAcoesComponents = getMapDestinoToAcao( acoesComponents );
            }

            if( hasAcoes ) {
                ivs = JSON2BpmnInstanciaVariavel.convert( idInstancia, mapAcoes, path, valuesJSON, dateFormat );
            }

            if( hasComponents ) {
                ivsComponents = JSON2BpmnInstanciaVariavel.convert( idInstancia,
                        mapAcoesComponents,
                        path,
                        valuesJSON,
                        dateFormat );
            }

            if( ivs != null && !ivs.isEmpty() ) {
                // antes de chamarmos o serviço, vamos validar se está OK
                validationX( mapAcoes, ivs );
            }

            if( ivsComponents != null && !ivsComponents.isEmpty() ) {
                validation( mapAcoesComponents, ivsComponents );
            }

            // remove todos os campos de binario que nao precisam ser salvos
            JSON2BpmnInstanciaVariavel.removeBinaryNotWillSave( ivs );
            JSON2BpmnInstanciaVariavel.removeBinaryNotWillSave( ivsComponents );

        } else {
            logger.warn( "Nenhuma ação encontrada ao salvar o elemento=" + idElemento + " da instância=" + idInstancia );
        }

        // ATENÇÃO: deve ser executada antes da chamada ao SI*,
        // já que processos dependentes são deletados do banco após a execução
        Long raiz = instanciaService.getRaiz( idInstancia );
        // map.put( "instancia", raiz );

        // ATENÇÃO: independentemente de ter acoes ou não, temos que chamar o execute
        // dessa forma sempre atualizamos a instância antes de chamar a planilha
        try {
            service.execute( idInstancia, idElemento, iteracao, usuario, ivs, ivsComponents, Boolean.FALSE );

            Map<Long, BinariosToView> allCamposBinariosToView = JSON2BpmnInstanciaVariavel.getAllCamposBinariosToView(
                    ivs );
            // map.put( "binariosSalvos", allCamposBinariosToView );

            // não podemos colocar dentro do service, precisamos de outra transação !!!
            logger.info( "Chamando a execução do SI*..." );
            instanciaCOMService.executeNoThread( idInstancia );

        } catch( IllegalStateException e ) {
            // formulário estava aberto e nesse instante foi assumido por outro usuário
            // vamos indicar o ocorrido
            // map.put( "isAssumidoOutroUsuario", Boolean.TRUE );
        }

        ra.addFlashAttribute( "elementoAnterior", idElemento );
        ra.addFlashAttribute( "instancia", raiz );
        return "redirect:/portal/processo/" + idVersao;
    }

    @RequestMapping( value = "/ajax/processo/hasconnection.action", method = GET )
    public
    @ResponseBody
    Boolean hasConnectionToProcessos()
    {
        return Boolean.TRUE;
    }

    ///////////////////////////

    private static Map<Long, BpmnAcao> getMapDestinoToAcao( Collection<BpmnAcao> acoes )
    {
        // ID_DESTINO -> BpmnAcao
        Map<Long, BpmnAcao> mapAcoes = new LinkedHashMap( acoes.size() );
        for( BpmnAcao bpmnAcao : acoes ) {
            BpmnVariavel destino = bpmnAcao.getCampo().getDestino();
            if( destino != null ) {
                mapAcoes.put( destino.getId(), bpmnAcao );
            }
        }
        return mapAcoes;
    }

    private Collection<BpmnAcaoView> getAcoesView( Collection<BpmnAcao> acoes )
    {
        Collection<BpmnAcaoView> acoesView = new LinkedList();
        for( BpmnAcao acao : acoes ) {
            acoesView.add( new BpmnAcaoView( acao ) );
        }
        return acoesView;
    }

    private Integer getLoopIteracao( Collection<BpmnAcaoView> acoesView )
    {
        return acoesView.iterator()
                .next()
                .getAcao()
                .getElemento()
                .getInstanciaElementos()
                .iterator()
                .next()
                .getLoopIteracao();
    }

    private boolean isAssumidoUsuarioLogado( HttpServletRequest request, Number idUsuarioResp )
    {
        return UsuarioInterceptor.get( request ).getId().equals( idUsuarioResp.longValue() );
    }

    /**
     * @see #validation(java.util.Map, java.util.Collection)
     * @deprecated
     */
    private void validationX( Map<Long, BpmnAcao> mapAcoes, Collection<BpmnInstanciaVariavel> ivs )
            throws Exception
    {
        Collection<BpmnAcao> acoes = mapAcoes.values();
        for( BpmnAcao acao : acoes ) {
            BpmnCampo campo = acao.getCampo();
            TipoDado tipoDado = campo.getTipoDado();
            BpmnInstanciaVariavel iv = getInstanciaVariavelByCampo( campo, ivs );

            if( campo.isRequired() ) {
                if( iv == null ) {
                    throw new Exception( "Campo não enviado" );
                }

                // a sequencia de if é para verificar os tipos de dados
                if( tipoDado.equals( TipoDado.Alfanumerico ) ) {
                    if( iv.getFatorChar() == null || iv.getFatorChar().trim().isEmpty() ) {
                        errorTypeRequired( TipoDado.Alfanumerico );
                    }
                    // verifica se o tamanho é o correto
                    checkSizeAndLength( campo, iv );
                } else if( tipoDado.equals( TipoDado.Data ) ) {
                    if( iv.getFatorData() == null || iv.getFatorData().toString().trim().isEmpty() ) {
                        errorTypeRequired( TipoDado.Data );
                    }
                } else if( tipoDado.equals( TipoDado.Numerico ) ) {
                    if( iv.getFatorNum() == null || iv.getFatorNum().toString().trim().isEmpty() ) {
                        errorTypeRequired( TipoDado.Numerico );
                    }
                } else if( tipoDado.equals( TipoDado.Binario ) ) {
                    BpmnAnexo anexo = iv.getAnexo();
                    if( anexo == null || anexo.getFatorBinario() == null ) {
                        errorTypeRequired( TipoDado.Binario );
                    }
                } else {
                    errorTypeRequired( null );
                }
            } else if( iv != null && tipoDado.equals( TipoDado.Alfanumerico ) ) {
                // caso não seja obriatorio temos que verificar se veio o tamanho certo para os campos Alfanumerico
                checkSizeAndLength( campo, iv );
            }
        }
    }

    private void validation( Map<Long, BpmnAcao> mapAcoesComponents, Collection<BpmnInstanciaVariavel> ivs )
            throws Exception
    {
        Collection<BpmnAcao> acoes = mapAcoesComponents.values();
        for( BpmnAcao acao : acoes ) {
            final BpmnCampo campo = acao.getCampo();

            TipoDado tipoDado = null;
            BpmnInstanciaVariavel iv = null;
            if( campo.getDestino() != null ) {
                //Alguns componentes podem nao ter variavel de destino, um exemplo é agrid simples!
                tipoDado = TipoDado.enumOfValue( campo.getTipoDado().getValue() );
                iv = getInstanciaVariavelByCampoComponent( campo.getDestino(), ivs );
            }

            final XmlComponent component = acao.getComponent();

            if( component.getRequired() ) {
                if( iv == null ) {
                    throw new Exception( "Campo não enviado" );
                }

                // a sequencia de if é para verificar os tipos de dados
                if( tipoDado.equals( TipoDado.Alfanumerico ) ) {
                    if( iv.getFatorChar() == null || iv.getFatorChar().trim().isEmpty() ) {
                        errorTypeRequired( TipoDado.Alfanumerico );
                    }
                    // verifica se o tamanho é o correto
                    checkSizeAndLengthComponent( acao, iv );
                } else if( tipoDado.equals( TipoDado.Data ) ) {
                    if( iv.getFatorData() == null || iv.getFatorData().toString().trim().isEmpty() ) {
                        errorTypeRequired( TipoDado.Data );
                    }
                } else if( tipoDado.equals( TipoDado.Numerico ) ) {
                    if( iv.getFatorNum() == null || iv.getFatorNum().toString().trim().isEmpty() ) {
                        errorTypeRequired( TipoDado.Numerico );
                    }
                } else if( tipoDado.equals( TipoDado.Binario ) ) {
                    BpmnAnexo anexo = iv.getAnexo();
                    if( anexo == null || anexo.getFatorBinario() == null ) {
                        errorTypeRequired( TipoDado.Binario );
                    }
                } else {
                    errorTypeRequired( null );
                }
            } else if( iv != null && tipoDado.equals( TipoDado.Alfanumerico ) ) {
                // caso não seja obriatorio temos que verificar se veio o tamanho certo para os campos Alfanumerico
                checkSizeAndLengthComponent( acao, iv );
            }
        }
    }

    private void errorTypeRequired( TipoDado tipoDado )
            throws Exception
    {
        if( tipoDado != null ) {
            throw new Exception( "Campo Obrigatorio não Preenchido! Tipo: " + tipoDado );
        } else {
            throw new Exception( "Erro na validação!" );
        }
    }

    private void checkSizeAndLengthComponent( BpmnAcao acao, BpmnInstanciaVariavel iv )
            throws Exception
    {
        XmlComponent component = acao.getComponent();
        Integer maxlength = component.getMaxlength();
        if( maxlength != null && iv.getFatorChar() != null ) {
            if( iv.getFatorChar().length() > maxlength ) {
                throw new Exception( "Tamanho do campo incorreto! Nome do campo: " + acao.getCampo().getDescricao() );
            }
        }
    }

    private void checkSizeAndLength( BpmnCampo campo, BpmnInstanciaVariavel iv )
            throws Exception
    {
        Integer fieldLength = campo.getFieldLength();
        if( fieldLength != null && iv.getFatorChar() != null ) {
            if( iv.getFatorChar().length() > fieldLength ) {
                throw new Exception( "Tamanho do campo incorreto! Nome do campo: " + campo.getDescricao() );
            }
        }
    }

    private BpmnInstanciaVariavel getInstanciaVariavelByCampo( BpmnCampo campo, Collection<BpmnInstanciaVariavel> ivs )
    {
        for( BpmnInstanciaVariavel iv : ivs ) {
            if( iv.getVariavel().getId().equals( campo.getDestino().getId() ) ) {
                return iv;
            }
        }
        return null;
    }

    private BpmnInstanciaVariavel getInstanciaVariavelByCampoComponent( BpmnVariavel destino,
                                                                        Collection<BpmnInstanciaVariavel> ivs )
    {
        for( BpmnInstanciaVariavel iv : ivs ) {
            if( iv.getVariavel().getId().equals( destino.getId() ) ) {
                return iv;
            }
        }
        return null;
    }
}
