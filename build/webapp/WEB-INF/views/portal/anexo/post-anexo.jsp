<%@ include file="/WEB-INF/views/include/heads.jspf" %>
<!--Este arquivo, somente servira para responder ao parent que chamou o anexo de arquivos e responder se o anexo
foi bem sucedido ou nao-->
<script type="text/javascript">
    <c:choose>
    <c:when test="${resultAnexo}">
    parent.Processos.respostaAnexo( ${param.acaoId}, '${nameFile}', '${nameFileInDisk}' );
    </c:when>
    <c:otherwise>
    parent.Processos.respostaAnexo( ${param.acaoId}, null, null, '${errors}' );
    </c:otherwise>
    </c:choose>
</script>