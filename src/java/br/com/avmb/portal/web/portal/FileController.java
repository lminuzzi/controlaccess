package br.com.avmb.portal.web.portal;

/**
 * @author Thiago Pereira Mello (thiago.pereira@avmb.com.br)
 * @version 4/8/13
 * @since (colocar_versao)
 */
import br.com.avmb.bpmn.model.Usuario;
import br.com.avmb.bpmn.service.IBpmnInstanciaVariavelService;
import br.com.avmb.bpmn.utils.AnexoUtils;
import br.com.avmb.bpmn.utils.FileUtils;
import br.com.avmb.bpmn.web.interceptor.UsuarioInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * @author Thiago Pereira Mello (thiago.pereira@avmb.com.br)
 * @version 26/07/12
 * @since 1.0
 */
@Controller
public class FileController
        implements HandlerExceptionResolver
{
    @Autowired
    private IBpmnInstanciaVariavelService instanciaVariavelService;

    @Autowired
    private MessageSource messageSource;

    private
    @Value( "#{configuracaoProps['tamanho.arquivos.upload']}" )
    Integer maxFileUpload;

    @RequestMapping( value = "/iframe/portal/anexo.action", method = POST )
    public String anexo( @RequestParam( "anexo" ) MultipartFile anexo, Model model, HttpServletRequest request )
    {
        Usuario usuario = UsuarioInterceptor.get( request );
        String pathToFiles = AnexoUtils.getTempPath( request, usuario );
        FileOutputStream outputStream;
        try {
            AnexoUtils.createPathTempToUser( usuario, pathToFiles );
            String nameFile = AnexoUtils.getNameFile( anexo );
            outputStream = new FileOutputStream( new File( pathToFiles + File.separator + nameFile ) );
            outputStream.write( anexo.getBytes() );
            outputStream.close();
            model.addAttribute( "resultAnexo", Boolean.TRUE );
            model.addAttribute( "nameFile", anexo.getOriginalFilename() );
            model.addAttribute( "nameFileInDisk", nameFile );
        } catch ( Exception e ) {
            e.printStackTrace();
            model.addAttribute( "resultAnexo", Boolean.FALSE );
            String message = messageSource.getMessage( "msg.error.send.anexo", null, null );
            model.addAttribute( "errors", message );
        }
        return "/portal/anexo/post-anexo";
    }

    @RequestMapping( value = "/ajax/portal/downloadanexo.action", method = GET )
    public void downloadAnexo( @RequestParam Long idInstanciaVar,
                               HttpServletResponse response )
            throws Exception
    {
        Map<String, Object> anexo = instanciaVariavelService.getAnexo( idInstanciaVar );
        byte[] fatorBlob = ( byte[] ) anexo.get( "FATOR_BLOB" );
        String nomeBlob = ( String ) anexo.get( "NOME_ANEXO" );
        String extensao = ( String ) anexo.get( "EXTENSAO_ANEXO" );
        String extensaoBlob = extensao == null ? "" : "." + extensao;
        String nameFileToSave = AnexoUtils.detectNameRealFile( nomeBlob ) + extensaoBlob;
        response.setHeader( "Content-disposition", "attachment;filename=\"" + nameFileToSave + "\"" );
        response.getOutputStream().write( fatorBlob );
        response.getOutputStream().flush();
        response.getOutputStream().close();
    }

    public ModelAndView resolveException( HttpServletRequest request,
                                          HttpServletResponse response,
                                          Object o,
                                          Exception e )
    {
        if ( e instanceof MaxUploadSizeExceededException ) {
            Map<Object, Object> model = new HashMap();
            Object[] params = new Object[ 1 ];
            params[ 0 ] = FileUtils.getInMega( maxFileUpload );
            String message = messageSource.getMessage( "msg.error.tamanho.excedido", params, null );
            model.put( "errors", message );
            return new ModelAndView( "/processos/step/anexo/post-anexo", ( Map ) model );
        }
        return null;
    }
}
