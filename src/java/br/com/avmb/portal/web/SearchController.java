package br.com.avmb.portal.web;

import br.com.avmb.bpmn.model.Usuario;
import br.com.avmb.bpmn.service.IBpmnMenuService;
import br.com.avmb.bpmn.utils.ContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * @author: Alessandro Ceron (alessandro.ceron@avmb.com.br)
 * @version: 16/04/2013
 * @since: 1.0
 */
@Controller
public class SearchController
{
    @Autowired
    private IBpmnMenuService menuService;

    @RequestMapping( value = "/ajax/serach/autocomplete.action", method = GET )
    public
    @ResponseBody
    List<Map<String, Object>> search( @RequestParam( "term" ) String term )
    {
        Usuario usuario = ContextUtils.getUsuarioCorrente();
        return menuService.buscaRapida( usuario != null ? usuario.getId() : null, term );
    }
}