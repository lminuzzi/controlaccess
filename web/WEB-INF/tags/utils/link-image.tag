<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ attribute
        name="imgUrl"
        required="true"
        type="java.lang.String" %>

<%@ attribute
        name="url"
        required="true"
        type="java.lang.String" %>

<a href="${url}" target="_blank">
    <table>
        <tbody>
        <tr>
            <td>
                <img src="<c:url value="${imgUrl}"/>" alt="" class="pointer"/>
            </td>
            <td>
                <jsp:doBody/>
            </td>
        </tr>
        </tbody>
    </table>
</a>
