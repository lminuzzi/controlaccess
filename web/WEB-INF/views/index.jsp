<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<jwr:style src="/bundles/index.css"/>

<div id="container-header">
    <div>
        <h2><fmt:message key="text.processos.top"/></h2>
    </div>
</div>

<div id="container-content">
    <div>
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
            <tr>
                <td>
                    <%@include file="include/navegacao.jspf" %>
                    <%@include file="include/menu.jspf" %>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<div id="div-details"></div>

<jwr:script src="/bundles/index.js"/>

