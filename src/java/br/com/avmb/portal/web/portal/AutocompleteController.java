package br.com.avmb.portal.web.portal;

import br.com.avmb.bpmn.service.IBpmnAcaoService;
import br.com.avmb.bpmn.service.IBpmnVariavelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * @author Thiago Pereira Mello (thiago.pereira@avmb.com.br)
 * @version 4/8/13
 * @since 1.0
 */
@Controller
public class AutocompleteController
{
    @Autowired
    private IBpmnAcaoService acaoService;

    @Autowired
    private IBpmnVariavelService variavelService;

    @Value( "#{configuracaoProps['autocomplete.max.results']}" )
    private Integer maxResults;

    @RequestMapping( value = "/ajax/portal/step/autocomplete.action", method = GET )
    public
    @ResponseBody
    List<Map<String, Object>> step( @RequestParam( "acao" ) Long idAcao, @RequestParam( "value" ) String value )
    {
        return acaoService.getToAutocomplete( idAcao, maxResults, value );
    }

    @RequestMapping( value = "/ajax/portal/filtro/autocompletenomevar.action", method = GET )
    public
    @ResponseBody
    List<Map<String, Object>> autoCompleteNomeVar( @RequestParam( "value" ) String value )
    {
        return variavelService.getToAutocomplete( maxResults, value );

    }
}
