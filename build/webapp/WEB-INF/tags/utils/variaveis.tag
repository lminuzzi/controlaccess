<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ attribute
        name="idInstancia"
        required="true"
        type="java.lang.Long" %>

<%@ attribute
        name="variaveis"
        required="true"
        type="java.lang.String" %>

<c:if test="${not empty variaveis}">
    <div class="build-tooltip" instancia="${idInstancia}">
        ${fn:replace(variaveis, '###', ';')}
    </div>
    <div id="div-tooltip-variavel-${idInstancia}" class="hide">
        <div class="tooltip-title"><fmt:message key="text.variaveis"/></div>
        <div style="padding-top: 5px;">
            <c:set var="split" value="${fn:split(variaveis, '###')}"/>
            <c:forEach items="${split}" var="parcial" varStatus="j">
                <utils:truncate text="${parcial}" value="70"/>
                <c:if test="${not j.last}">
                    <br/>
                </c:if>
            </c:forEach>
        </div>
    </div>
</c:if>