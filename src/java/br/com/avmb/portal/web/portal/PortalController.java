package br.com.avmb.portal.web.portal;

import br.com.avmb.bpmn.service.IBpmnInstanciaService;
import br.com.avmb.bpmn.service.IBpmnMenuService;
import br.com.avmb.bpmn.web.interceptor.UsuarioInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @author: Leandro Sacchet (leandro.sacchet@avmb.com.br)
 * @version: 29/03/13
 * @since: 1.0
 */
@Controller
public class PortalController
{
    @Autowired
    private IBpmnMenuService menuService;
    @Autowired
    private IBpmnInstanciaService instanciaService;

    @Value( "#{configuracaoProps['ultimos.andamentos.max.results']}" )
    private Integer maxResults;

    @RequestMapping(value = "/portal")
    public String index()
    {
        return "redirect:/portal/index";
    }

    @RequestMapping(value = "/portal/index")
    public String index( Model model, HttpServletRequest request )
    {
        Long idUsuario = UsuarioInterceptor.get( request ).getId();
        model.addAttribute( "menus", menuService.getRaizByUsuario( idUsuario ) );
        model.addAttribute( "toolBars", menuService.getMenuToolBar( idUsuario ) );
        model.addAttribute( "ultimosAndamentos", instanciaService.getCriadasUsuarioAtivas( idUsuario, maxResults ) );
        return "/portal/index";
    }

    @RequestMapping(value = "/portal/index/{menu}")
    public String index( @PathVariable("menu") Long idMenu, Model model, HttpServletRequest request )
    {
        List<Map<String, Object>> navegacao = menuService.getNavegacao( idMenu );
        if( navegacao != null && !navegacao.isEmpty() ) {
            Collections.reverse( navegacao );
        }
        model.addAttribute( "navegacao", navegacao );
        Long idUsuario = UsuarioInterceptor.get( request ).getId();
        model.addAttribute( "menus", menuService.getChildrenByUsuario( idUsuario, idMenu ) );
        model.addAttribute( "toolBars", menuService.getMenuToolBar( idUsuario ) );
        model.addAttribute( "ultimosAndamentos", instanciaService.getCriadasUsuarioAtivas( idUsuario, maxResults ) );
        return "/portal/index";
    }
}