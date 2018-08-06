package br.com.avmb.portal.web;

import br.com.avmb.bpmn.model.Usuario;
import br.com.avmb.bpmn.service.IBpmnMenuService;
import br.com.avmb.bpmn.utils.ContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author: Leandro Sacchet (leandro.sacchet@avmb.com.br)
 * @version: 28/03/13
 * @since: 1.0
 */
@Controller
public class IndexController
{
    @Autowired
    private IBpmnMenuService menuService;

    @RequestMapping(value = "/index")
    public String index( Model model )
    {
        Usuario usuario = ContextUtils.getUsuarioCorrente();
        if( usuario != null ) {
            return "redirect:/portal/index";
        }
        model.addAttribute( "menus", menuService.getRaiz() );
        return "/index";
    }

    @RequestMapping(value = "/index/{menu}")
    public String index( @PathVariable("menu") Long idMenu, Model model )
    {
        Usuario usuario = ContextUtils.getUsuarioCorrente();
        if( usuario != null ) {
            return "redirect:/portal/index/" + idMenu;
        }
        model.addAttribute( "navegacao", menuService.getNavegacao( idMenu ) );
        model.addAttribute( "menus", menuService.getChildren( idMenu ) );
        return "/index";
    }
}
