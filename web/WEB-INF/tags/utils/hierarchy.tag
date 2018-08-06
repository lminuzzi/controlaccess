<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ attribute
        name="hierarchy"
        required="true"
        type="java.util.List" %>

<c:if test="${not empty hierarchy}">
    <c:forEach items="${hierarchy}" var="entry" varStatus="i">
        <c:set var="descricao" value="${entry['DESCRICAO']}"/>
        ${descricao}
        <c:if test="${not i.last}">
            <strong>&nbsp;>&nbsp;</strong>
        </c:if>
    </c:forEach>
</c:if>