<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ tag body-content="empty" %>

<%@ attribute name="key"
              required="false"
              type="java.lang.String" %>

<%@ attribute name="label"
              required="false"
              type="java.lang.String" %>

<%@ attribute name="lineBreak"
              required="false"
              type="java.lang.Boolean" %>

<%@ attribute name="required"
              required="false"
              type="java.lang.Boolean" %>

<%@ attribute name="fixed"
              required="false"
              type="java.lang.String"
              description="funciona como o 'for' do label, foi utilizado o nome 'fixed' pois o 'for' é palavra reservada do sistema" %>

<%@ attribute name="cursorPointer"
              required="false"
              type="java.lang.Boolean" %>

<label class="label"
       <c:if test="${not empty fixed}">for="${fixed}"</c:if>
       <c:if test="${not empty cursorPointer}">style="cursor: pointer"</c:if>>
    <c:choose>
        <c:when test="${not empty key}">
            <fmt:message key="${key}"/>
        </c:when>
        <c:otherwise>
            ${label}
        </c:otherwise>
    </c:choose>
    <c:if test="${required}">
        <span class="required">*</span>
    </c:if>
</label>
<c:if test="${lineBreak}"><br/></c:if>
