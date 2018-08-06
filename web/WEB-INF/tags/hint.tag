<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ attribute name="id"
              required="false"
              type="java.lang.String" %>

<%@ attribute name="text"
              required="false"
              type="java.lang.String" %>

<%@ attribute name="title"
              required="false"
              type="java.lang.String" %>

<c:if test="${not empty text || not empty title}">

    <c:set var="tooltipid" value="tooltip${id}"/>

    <script type="text/javascript">

        var ${tooltipid} = Utils.tooltip( '${title}', '${text}' );

    </script>
    <span class="info"
          onmouseout="${tooltipid}.pnotify_remove();"
          onmousemove="${tooltipid}.css({'top': event.clientY+12, 'left': event.clientX+12});"
          onmouseover="${tooltipid}.pnotify_display();">
        <jsp:doBody/>
    </span>

</c:if>
