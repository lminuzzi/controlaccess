package br.com.avmb.portal.web.portal;

import br.com.avmb.bpmn.service.IBpmnErrorInstanciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * @author Thiago Pereira Mello (thiago.pereira@avmb.com.br)
 * @version 4/9/13
 * @since 1.0
 */
@Controller
public class ErrorsController
{
    @Autowired
    private IBpmnErrorInstanciaService errorInstanciaService;

    @RequestMapping( value = "/ajax/portal/errors/errors.action", method = GET )
    public String getErrors( Model model, @RequestParam( "instancia" ) Long idInstancia )
    {
        List<Map<String, Object>> errors = errorInstanciaService.getByInstancia( idInstancia );
        if ( errors != null && !errors.isEmpty() ) {
            replace( errors );
            model.addAttribute( "erros", errors );
        }
        return "/processos/errors/errors";
    }

    //////////////////////////

    private void replace( List<Map<String, Object>> errors )
    {
        for ( Map<String, Object> error : errors ) {
            String msg = ( String ) error.get( "MSG_ERROR" );
            error.put( "MSG_ERROR", msg.replaceAll( "\n", "<br/>" ) );
        }
    }
}

