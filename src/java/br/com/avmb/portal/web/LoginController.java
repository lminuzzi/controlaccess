package br.com.avmb.portal.web;

import br.com.avmb.bpmn.service.IAuthenticationService;
import br.com.avmb.bpmn.web.interceptor.UsuarioInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

import static br.com.avmb.bpmn.service.IAuthenticationService.Status;
import static br.com.avmb.bpmn.service.IAuthenticationService.UsuarioStatus;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * @author: Leandro Sacchet (leandro.sacchet@avmb.com.br)
 * @version: 29/03/13
 * @since: 1.0
 */
@Controller
public class LoginController
{
    @Autowired
    private IAuthenticationService authenticationService;

    @RequestMapping(value = "/login", method = GET)
    public String form( @RequestParam( required = false ) String uri, Model model )
    {
        model.addAttribute( "uri", uri );
        return "/login/login";
    }

    @RequestMapping(value = "/login", method = POST)
    public String submit( @RequestParam String login,
                          @RequestParam String senha,
                          @RequestParam(required = false) String uri,
                          Model model,
                          HttpServletRequest request )
    {
        UsuarioStatus us = authenticationService.authenticate( login, senha );
        Status status = us.getStatus();
        switch( status ) {
            case UserOK: {
                UsuarioInterceptor.set( request, us.getUsuario() );
                return "redirect:" + (uri != null && !uri.isEmpty() ? uri: "/portal/index");
            }
            case ExpiredPassword:
            case MandatoryPasswordChange: {
                model.addAttribute( "status", status );
                return "/login/changepassword";
            }
            default: {
                model.addAttribute( "status", status );
                model.addAttribute( "uri", uri);
                return "/login/login";
            }
        }
    }

    @RequestMapping(value = "/logout", method = GET)
    public String logout( HttpServletRequest request )
    {
        request.getSession().invalidate();
        return "redirect:/";
    }
}

