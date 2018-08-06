package br.com.avmb.portal.web;

import br.com.avmb.bpmn.service.IBpmnMenuService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.io.OutputStream;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * @author: Leandro Sacchet (leandro.sacchet@avmb.com.br)
 * @version: 01/04/13
 * @since: 1.0
 */
@Controller
public class ImageController
{
    @Autowired
    private IBpmnMenuService menuService;

    private Resource imageDefault;

    public ImageController()
    {
        this.imageDefault = new ClassPathResource( "/br/com/avmb/portal/web/no-image.png" );
    }

    @RequestMapping( value = "/menuimg/{menu}", method = GET )
    public String image( @PathVariable( "menu" ) Long idMenu, OutputStream outputStream )
            throws IOException
    {
        byte[] icon = menuService.getIcon( idMenu );
        icon = icon != null && icon.length > 0 ? icon : IOUtils.toByteArray( imageDefault.getInputStream() );

        outputStream.write( icon );
        outputStream.flush();
        outputStream.close();

        return null;
    }
}
