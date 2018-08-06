<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<jwr:style src="/bundles/portal.css"/>

<prop:properties>

    <prop:message key="title.confirmacao"/>
    <prop:message key="msg.envio.sucesso"/>
    <prop:message key="msg.envio.analise"/>

    <prop:property id="finalizado">${finalizado}</prop:property>
    <prop:property id="instanciaAberta">${isInstanciaAberta}</prop:property>

</prop:properties>

<%@include file="shortcut.jspf"%>

<div id="container-header">
    <div id="div-show-hide">
        <img src="<c:url value="/img/view.png"/>"/>
    </div>
    <div>
        <h2><fmt:message key="text.processos.top"/></h2>
    </div>
</div>

<%@include file="andamento.jspf"%>

<div id="container-content">
    <div>
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
            <tr>
                <td>
                    <%@include file="../include/navegacao.jspf" %>
                    <%@include file="../include/menu.jspf" %>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<div id="div-details"></div>

<jwr:script src="/bundles/portal.js"/>

