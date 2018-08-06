package br.com.avmb.portal.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * @author: Leandro Sacchet (leandro.sacchet@avmb.com.br)
 * @version: 29/03/13
 * @since: 1.0
 */
@Controller
public class CadastroUsuarioController
{
    @RequestMapping( value = "/adduser" )
    public String form( @ModelAttribute CadastroUsuarioCommand command, Model model )
    {
        model.addAttribute( "command", command );
        return "/adduser";
    }

    @RequestMapping( value = "/adduser", method = POST )
    public String submit( @ModelAttribute CadastroUsuarioCommand command )
    {
        return "/adduser";
    }
}
