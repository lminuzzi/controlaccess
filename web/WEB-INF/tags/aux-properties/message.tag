<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ attribute
        name="key"
        required="true"
        type="java.lang.String" %>

<c:set var="name" value="${fn:replace(key, '.', '')}"/>
<${name} xmlns="${name}"><fmt:message key="${key}"/></${name}>
