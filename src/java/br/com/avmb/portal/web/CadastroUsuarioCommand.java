package br.com.avmb.portal.web;

/**
 * @author: Leandro Sacchet (leandro.sacchet@avmb.com.br)
 * @version: 03/04/13
 * @since: 1.0
 */
public class CadastroUsuarioCommand
{
    private String nome;
    private String email;
    private String confirmacaoEmail;
    private String senha;
    private String confirmacaoSenha;

    public String getNome()
    {
        return nome;
    }

    public void setNome( String nome )
    {
        this.nome = nome;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail( String email )
    {
        this.email = email;
    }

    public String getConfirmacaoEmail()
    {
        return confirmacaoEmail;
    }

    public void setConfirmacaoEmail( String confirmacaoEmail )
    {
        this.confirmacaoEmail = confirmacaoEmail;
    }

    public String getSenha()
    {
        return senha;
    }

    public void setSenha( String senha )
    {
        this.senha = senha;
    }

    public String getConfirmacaoSenha()
    {
        return confirmacaoSenha;
    }

    public void setConfirmacaoSenha( String confirmacaoSenha )
    {
        this.confirmacaoSenha = confirmacaoSenha;
    }
}
