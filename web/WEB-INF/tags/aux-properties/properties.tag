<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ attribute
        name="name"
        required="false"
        type="java.lang.String" %>

<div style="position: absolute; display: none">
    <auxjs xmlns="auxjs" <c:if test="${not empty name}">id="auxjs_${name}"</c:if>>
        <jsp:doBody/>
    </auxjs>
</div>