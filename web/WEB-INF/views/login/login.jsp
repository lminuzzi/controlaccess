<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<jwr:style src="/bundles/login.css"/>

<prop:properties>

    <prop:message key="title.notify.login.fail"/>
    <prop:message key="title.notify.validacao"/>

    <prop:message key="msg.notify.login.fail"/>
    <prop:message key="msg.notify.usuario.inativo"/>
    <prop:message key="msg.notify.usuario.locked"/>

    <prop:property id="status">${status}</prop:property>

</prop:properties>

<div id="container-center" class="shadow corner">
    <div class="title">
        <table cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
                <td>
                    <img src="<c:url value="/img/user-lock.png"/>">
                </td>
                <td style="padding-left: 10px;">
                    <fmt:message key="text.acesso.login"/>
                    <br/>
                    <span class="smaller">
                                            <fmt:message key="text.autenticacao"/>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="body">

        <form id="form-login" action="<c:url value="/login"/>" method="POST">

            <input id="uri" name="uri" type="hidden" value="${uri}"/>

            <table>
                <tbody>
                <tr>
                    <td>
                        <fmt:message key="label.usuario"/>:<br/>
                        <input id="login" name="login" type="text" size="50"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <fmt:message key="label.senha"/>:<br/>
                        <input id="senha" name="senha" type="password" size="50"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a href="<c:url value="/esquecisenha"/>">
                            <fmt:message key="link.esqueci.senha"/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 7px;">
                        <input id="button-submit"
                               type="button"
                               value="<fmt:message key="button.entrar"/>"/>
                    </td>
                </tr>
                </tbody>
            </table>

        </form>

        <table class="cadastro" onclick="window.location='<c:url value="/adduser"/>';">
            <tbody>
            <tr>
                <td>
                    <img src="<c:url value="/img/add-user.png"/>">
                </td>
                <td>
                    <a>
                        <fmt:message key="link.cadastrar.user"/>
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<jwr:script src="/bundles/login.js"/>
