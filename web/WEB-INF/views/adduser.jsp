<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<jwr:style src="/bundles/adduser.css"/>

<div id="container-center" class="shadow corner">
    <div class="title">
        <table cellspacing="0" cellpadding="0">
            <tbody>
            <tr>
                <td>
                    <img src="<c:url value="/img/add-user-big.png"/>">
                </td>
                <td style="padding-left: 10px;">
                    <fmt:message key="text.acesso.login"/>
                    <br/>
                    <span class="smaller">
                                            <fmt:message key="text.cadastramento"/>
                    </span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div class="body">

        <c:url var="url" value="/adduser"/>
        <form:form commandName="command" action="${url}" method="POST">
            <table>
                <tbody>
                <tr>
                    <td>
                        <fmt:message key="label.nome.completo"/>:<br/>
                        <form:input path="nome" size="50"/>
                        <span class="required">*</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <fmt:message key="label.email"/>:<br/>
                        <form:input path="email" size="50"/>
                        <span class="required">*</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <fmt:message key="label.confirmacao.email"/>:<br/>
                        <form:input path="confirmacaoEmail" size="50"/>
                        <span class="required">*</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <fmt:message key="label.senha"/>:<br/>
                        <form:password path="senha" size="50"/>
                        <span class="required">*</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <fmt:message key="label.confirmacao.senha"/>:<br/>
                        <form:password path="confirmacaoSenha" size="50"/>
                        <span class="required">*</span>
                    </td>
                </tr>
                <tr>
                    <td style="padding-top: 7px;">
                        <input id="button-enviar" type="button" value="<fmt:message key="button.enviar"/>"/>
                    </td>
                </tr>
                </tbody>
            </table>

        </form:form>

    </div>
</div>

<jwr:script src="/bundles/adduser.js"/>
