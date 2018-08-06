<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ attribute
        name="title"
        required="true"
        type="java.lang.String" %>

<%@ attribute
        name="msg"
        required="true"
        type="java.lang.String" %>

<%@ attribute
        name="type"
        required="false"
        type="br.com.asten.processos.web.NotifyEnum"
        description="default = Aviso" %>

<script type="text/javascript">

    $( function()
    {
        <c:choose>
        <c:when test="${type == 'NoTime'}">
        Utils.showMsgNoTime( '${title}', '${msg}' );
        </c:when>
        <c:when test="${type == 'Error'}">
        Utils.showError( '${title}', '${msg}' );
        </c:when>
        <c:otherwise>
        Utils.showMsg( '${title}', '${msg}');
        </c:otherwise>
        </c:choose>
    } );

</script>
