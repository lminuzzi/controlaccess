<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ attribute
        name="text"
        required="true"
        type="java.lang.String" %>

<%@ attribute
        name="value"
        required="true"
        type="java.lang.Integer" %>

<c:choose>
    <c:when test="${fn:length(text) > value}">
        ${fn:substring(text, 0, value)}...
    </c:when>
    <c:otherwise>${text}</c:otherwise>
</c:choose>

