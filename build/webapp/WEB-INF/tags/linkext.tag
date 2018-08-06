<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ attribute name="url"
              required="true"
              type="java.lang.String" %>

<!-- se tem site e não contém 'http' na frente, vamos colocar -->
<c:if test="${not empty url && !fn:contains(url, 'http')}">
    <c:set var="url" value="http://${url}"/>
</c:if>

<c:if test="${not empty url}">
    <a href="${url}" target="_blank">
        <jsp:doBody/>
    </a>
</c:if>
