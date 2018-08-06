<%@ include file="/WEB-INF/views/include/heads.jspf" %>

<%@ page import="static br.com.avmb.bpmn.model.TipoCampo.*" %>
<%@ page import="static br.com.avmb.bpmn.model.BpmnAnexo.Situacao.Novo" %>
<%@ page import="static br.com.avmb.bpmn.model.BpmnAnexo.Situacao.Modificado" %>
<%@ page import="static br.com.avmb.bpmn.model.BpmnAnexo.Situacao.*" %>
<%@ page import="static br.com.avmb.bpmn.components.grid.XmlGrid.Type.Check" %>
<%@ page import="static br.com.avmb.bpmn.components.grid.XmlGrid.Type.Radio" %>
<%@ page import="static br.com.avmb.bpmn.components.grid.XmlGrid.Type.Simples" %>
<%@ page import="br.com.avmb.bpmn.model.TipoDado" %>
<%@ page import="static br.com.avmb.bpmn.components.grid.XmlGrid.Type.*" %>

<% pageContext.setAttribute( "gridTypeCheckbox", Check.getValue() ); %>
<% pageContext.setAttribute( "gridTypeRadio", Radio.getValue() ); %>
<% pageContext.setAttribute( "gridTypeSimples", Simples.getValue() ); %>

<% pageContext.setAttribute( "binario", TipoDado.Binario.getValue() ); %>

<% pageContext.setAttribute( "edit", Edit ); %>
<!-- ATENÇÃO: não pode ser 'label' o nome -->
<% pageContext.setAttribute( "fixedLabel", Label ); %>
<% pageContext.setAttribute( "memo", Memo ); %>
<% pageContext.setAttribute( "combo", Combo ); %>
<% pageContext.setAttribute( "comboMultiSelecao", ComboMultiSelecao ); %>
<% pageContext.setAttribute( "checkbox", Checkbox ); %>
<% pageContext.setAttribute( "radioGroup", RadioGroup ); %>
<% pageContext.setAttribute( "anexo", Anexo ); %>
<% pageContext.setAttribute( "autoComplete", AutoComplete ); %>
<% pageContext.setAttribute( "grid", Grid ); %>

<% pageContext.setAttribute( "anexoNovo", Novo ); %>
<% pageContext.setAttribute( "anexoModificado", Modificado ); %>
<% pageContext.setAttribute( "anexoRemovido", Removido ); %>
<% pageContext.setAttribute( "anexoAntigo", Antigo ); %>
<% pageContext.setAttribute( "anexoSalvo", Salvo ); %>

<jwr:style src="/bundles/processo.css"/>

<%@include file="shortcut.jspf" %>

<prop:properties>
    <prop:message key="msg.500"/>
    <prop:message key="title.500"/>
    <prop:message key="msg.notify.title.aviso"/>
    <prop:message key="msg.notify.solicitacao.sucesso"/>
    <prop:message key="msg.notify.validate.error"/>
    <prop:property id="maxFileUpload">${maxFileUpload}</prop:property>
    <!-- serve de base para todas URLs JS -->
    <prop:property id="context"><c:url value="/"/></prop:property>
</prop:properties>

<div id="div-form-upload-foto" style="position: absolute; top: -50000000px;">
    <form:form id="form-upload-foto" action="${action}" method="POST" enctype="multipart/form-data" target="frame-upload">
        <input name="file-foto-usuario" id="file-foto-usuario" type="file"/>
    </form:form>
    <iframe id="frame-upload" name="frame-upload"></iframe>
</div>

<div id="container-header">
    <div id="div-show-hide">
        <img src="<c:url value="/img/view.png"/>"/>
    </div>
    <div class="bold" style="padding: 8px;">
        ${processo['DESCRICAO_PROCESSO']} » ${acoesView[0].acao.elemento.descricao}
    </div>
</div>

<%@include file="andamento.jspf" %>

<div id="container-content">
    <div>
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
            <tr>
                <td>
                    <div class="form">
                        <form action="<c:url value="/portal/processo/submit"/>" method="POST">

                            <input id="instancia" name="instancia" type="hidden" value="${processo['ID_INSTANCIA']}"/>
                            <input id="versao" name="versao" type="hidden" value="${versao}"/>
                            <input id="elemento" name="elemento" type="hidden" value="${idElemento}"/>
                            <input id="iteracao" name="iteracao" type="hidden" value="${loopIteracao}"/>
                            <input id="instanciaElemento" name="instanciaElemento" type="hidden"
                                   value="${instanciaElemento}"/>
                            <input id="valuesJSON" name="valuesJSON" type="hidden" value=""/>

                            <c:set var="largerTop" value="0"/>
                            <c:if test="${not empty acoesView}">

                                <%-- TODO: deve sumir quando todos campos forem components (Remover todo o IF) --%>
                                <c:forEach items="${acoesView}" var="acaoView">

                                    <c:set var="acao" value="${acaoView.acao}"/>
                                    <c:set var="fcOrigem" value="${acaoView.fatorCharOrigem}"/>
                                    <c:set var="fcDestino" value="${acaoView.fatorCharDestino}"/>
                                    <c:set var="campo" value="${acao.campo}"/>
                                    <c:set var="itemAcao" value="${campo.tipoCampo.item}"/>

                                    <%-- posição do campo --%>
                                    <c:choose>
                                        <c:when test="${campo.fieldPosition!=null && not empty campo.fieldPosition}">
                                            <c:set var="positionTop"
                                                   value="${fn:substringBefore(campo.fieldPosition, ';')}"/>
                                            <c:set var="positionLeft"
                                                   value="${fn:substringAfter(campo.fieldPosition, ';')}"/>
                                        </c:when>
                                        <c:otherwise>
                                            <c:set var="positionTop" value="0"/>
                                            <c:set var="positionLeft" value="0"/>
                                        </c:otherwise>
                                    </c:choose>

                                    <%-- tamanho do campo: é usado no largura do componente, tem o decréscimo pq a largura que vem
                               do banco e do painel --%>
                                    <c:set var="fieldSize" value="${campo.fieldSize}"/>
                                    <c:choose>
                                        <c:when test="${fieldSize==null || empty fieldSize}">
                                            <c:set var="fieldSize" value="185"/>
                                        </c:when>
                                        <c:otherwise>
                                            <c:set var="fieldSize" value="${fieldSize-15}"/>
                                        </c:otherwise>
                                    </c:choose>

                                    <%-- tamanho da altura --%>
                                    <c:set var="fieldHeight" value="${campo.fieldHeight}"/>
                                    <%-- pega a altura do componente para calcular onde colocar os botões --%>
                                    <c:choose>
                                        <c:when test="${fieldHeight!= null && not empty fieldHeight}">
                                            <c:set var="campoFieldHeight" value="${fieldHeight}"/>
                                        </c:when>
                                        <c:otherwise>
                                            <c:set var="campoFieldHeight" value="30"/>
                                        </c:otherwise>
                                    </c:choose>

                                    <%-- aqui diminuimos pois a altura é do painel --%>
                                    <c:if test="${fieldHeight!= null && not empty fieldHeight}">
                                        <c:set var="fieldHeight" value="${fieldHeight-25}"/>
                                    </c:if>

                                    <c:set var="sum" value="${positionTop+campoFieldHeight}"/>
                                    <c:if test="${sum>largerTop}">
                                        <c:set var="largerTop" value="${sum}"/>
                                    </c:if>

                                    <div style="position: absolute;top: ${positionTop}px; left: ${positionLeft}px;">
                                        <c:choose>
                                            <c:when test="${itemAcao == edit}">
                                                <%@include file="edit.jspf" %>
                                            </c:when>
                                            <c:when test="${itemAcao == fixedLabel}">
                                                <%@include file="label.jspf" %>
                                            </c:when>
                                            <c:when test="${itemAcao == memo}">
                                                <%@include file="memo.jspf" %>
                                            </c:when>
                                            <c:when test="${itemAcao == combo}">
                                                <%@include file="combo.jspf" %>
                                            </c:when>
                                            <c:when test="${itemAcao == comboMultiSelecao}">
                                                <%@include file="combo-multi-selecao.jspf" %>
                                            </c:when>
                                            <c:when test="${itemAcao == checkbox}">
                                                <%@include file="checkbox.jspf" %>
                                            </c:when>
                                            <c:when test="${itemAcao == radioGroup}">
                                                <%@include file="radio.jspf" %>
                                            </c:when>
                                            <c:when test="${itemAcao == anexo}">
                                                <%@include file="anexo/anexo.jspf" %>
                                            </c:when>
                                            <c:when test="${itemAcao == autoComplete}">
                                                <%@include file="autocomplete.jspf" %>
                                            </c:when>
                                        </c:choose>
                                    </div>
                                </c:forEach>
                            </c:if>

                            <%-- TODO: aos esta sendo migrado para componentes! --%>
                            <%@include file="constructComponents.jspf" %>

                        </form>
                    </div>

                    <div class="div-step-buttons" style="top: ${largerTop+15}px;">
                        <input id="button-prox-step" type="button" value="<fmt:message key="button.prosseguir"/>"/>
                        <c:if test="${hasRemoveInstancia}">
                            <input id="button-remove-processo" type="button"
                                   value="<fmt:message key="button.cancelar"/>"/>
                        </c:if>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="carregando"></div>

<div id="dialog-error" class="hide" title="<fmt:message key="title.detalhes.erro"/>"></div>

<c:url var="removeInstancia" value="/portal/processo/removeinstancia.action">
    <%--<c:param name="instancia" value="${processo['ID_INSTANCIA']}"/>
    <c:param name="elemento" value="${idElemento}"/>--%>
</c:url>
<div id="dialog-confirma-exclusao-instancia" title="<fmt:message key="title.exluir.instancia"/>" class="hide"
     url="${removeInstancia}">
    <fmt:message key="msg.confirma.exclusao.instancia"/>
</div>
<jwr:script src="/bundles/processo.js"/>


