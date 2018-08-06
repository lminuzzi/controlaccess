function Processos()
{
}

/**
 * Indica se a sessão está expirada.
 * Não estamos mais avaliando esse parâmetro devido ao problema do cara logar com diferentes usuário no mesmo navagedor.
 */
var sessionExpired = false;

/**
 * Variável que controla a cache do auto complete.
 */
var cacheAutoComplete = new Array();

/**
 * Variável que controla se estamos em processamento.
 * Necessária para controlar novas chamadas ajax feitas pelo usuário.
 */

Processos.updateStepBlock = function( disabled )
{
    $( '#button-prox-step, #button-save-step' ).attr( 'disabled', disabled );
};


Processos.putValuesJSON = function( valuesJSON, type )
{
    $( '.form ' + type ).each( function()
    {
        var $this = $( this );
        if( $this.attr( 'tipo' ) == Utils.getText( "typeAutoComplete" ) ) {
            var acao = $this.attr( 'acao' );
            var $inputHiddenRetorno = $( '#autocompleteHidden' + acao );
            var $inputHiddenId = $( '#autocompleteHiddenId' + acao );
            valuesJSON[valuesJSON.length] = {
                variavel: $this.attr( 'variavel' ),
                dado: [ $inputHiddenRetorno.val() ],
                idRetorno: $inputHiddenId.val(),
                tipoDado: $this.attr( 'tipoDado' )
            };
        } else {
            valuesJSON[valuesJSON.length] = {
                variavel: $this.attr( 'variavel' ),
                dado: [ $this.val() ],
                tipoDado: $this.attr( 'tipoDado' )
            };
        }
    } );
};

Processos.putCheckboxToValuesJSON = function( valuesJSON )
{
    $( '.form input:checkbox' ).each( function()
    {
        var $this = $( this );
        valuesJSON[valuesJSON.length] = {
            variavel: $this.attr( 'variavel' ),
            dado: [ $this.is( ':checked' ) ? $this.attr( 'valorchecked' ) : $this.attr( 'valorunchecked' ) ],
            tipoDado: $this.attr( 'tipoDado' )
        };
    } );
};

Processos.putRadioToValuesJSON = function( valuesJSON )
{
    // pegar apenas os radio que NAO sao da grid
    var $radios = $( '.form input[type="radio"]' ).not( '.grid input[type="radio"]' );
    if( $radios.exists() ) {
        var $marcados = $radios.filter( ':checked' );
        if( $marcados && $marcados.exists() ) {
            $marcados.each( function()
            {
                var $radio = $( this );
                valuesJSON[valuesJSON.length] = {
                    variavel: $radio.attr( 'variavel' ),
                    dado: [ $radio.val() ],
                    tipoDado: $radio.attr( 'tipoDado' )
                };
            } );
        }
    }
};

Processos.prepararVetorAnexos = function( anexos )
{
    return anexos.split( '|||' );
};

Processos.putValuesAnexoJSON = function( valuesJSON, type )
{
    $( '.form ' + type ).each( function()
    {
        var $this = $( this );
        var value;
        if( Utils.stringToBoolean( $this.attr( 'isvetor' ) ) ) {
            value = Processos.prepararVetorAnexos( $this.val() );
        } else {
            value = $this.val();
        }
        valuesJSON[valuesJSON.length] = {
            variavel: $this.attr( 'variavel' ),
            dado: [value],
            tipoDado: $this.attr( 'tipoDado' ),
            possuiAnexo: $this.attr( 'possuiAnexo' ),
            readyOnly: $this.attr( 'readyonly' ),
            idInstanciaVar: $this.attr( 'idInstanciaVar' )
        };
        value = $this.val( '' );
    } );
};

Processos.putValuesGridJSON = function( valuesJSON )
{
    $( '.grid' ).each( function()
    {
        var $grid = $( this );
        if( $grid.attr( 'type' ) != Utils.getText( 'gridTypeSimples' ) ) {
            if( $grid.attr( 'type' ) == Utils.getText( 'gridTypeCheckbox' ) ) {
                //Se for do tipo checkbox, então os valores sao uma array!
                var value = new Array();
                $grid.find( 'div.div-checkbox[input="checkbox"]' ).each( function()
                {
                    if( $( this ).hasClass( 'div-checked' ) ) {
                        value.push( $( this ).attr( 'value' ) );
                    }
                } );

                if( value.length == 0 ) {
                    value = null;
                }
            } else {
                //Se for do tipo radio, é um unico valor!
                var value = $grid.find( 'input[type="radio"]:checked' ).val();
            }
            valuesJSON[valuesJSON.length] = {
                variavel: $grid.attr( 'variavel' ),
                dado: [value],
                tipoDado: $grid.attr( 'type' ),
                readonly: $grid.attr( 'readonly' )
            };
        }
    } );
};

Processos.putValuesAnexoToRemoveJSON = function( type )
{
    var $this = $( '.form ' + type );
    return {
        variavel: $this.attr( 'variavel' ),
        dado: null,
        tipoDado: $this.attr( 'tipoDado' ),
        possuiAnexo: $this.attr( 'possuiAnexo' ),
        readyOnly: $this.attr( 'readyonly' ),
        idInstanciaVar: $this.attr( 'idInstanciaVar' )
    };
};

Processos.saveStep = function( saveOnly )
{
    Processos.updateStepBlock( true );

    var valuesJSON = [];

    var validation = new Validation();
    var hasRequiredNotFilledOrDateError = Validation.validateAll( saveOnly );
    if( !hasRequiredNotFilledOrDateError ) {
        // nao vai pegar o valor que esta dentro do anexo
        Processos.putValuesJSON( valuesJSON, 'input:text:not([notRead="true"])' );
        Processos.putValuesJSON( valuesJSON, 'textarea' );
        Processos.putValuesJSON( valuesJSON, 'select' );
        Processos.putCheckboxToValuesJSON( valuesJSON );
        Processos.putRadioToValuesJSON( valuesJSON );
        Processos.putValuesAnexoJSON( valuesJSON, 'input[name="arrayOfFilesToSend"][type="hidden"]' );
        Processos.putValuesGridJSON( valuesJSON );

        $( '#valuesJSON' ).val( JSON.stringify( valuesJSON ) );

        $( '.form form' ).submit();

    } else {
        Processos.updateStepBlock( false );
        Utils.showError( ProcessosConstants.MSG_NOTIFY_TITLE_AVISO, Utils.getMessage( 'msg.notify.validate.error' ) );
    }
};

Processos.verificarAutoCompleteOk = function( $elemento )
{
    var acao = $elemento.attr( 'acao' );
    if( $( '#autocompleteHidden' + acao ).isNotBlank() && $( '#autocompleteHiddenId' + acao ).isNotBlank() ) {
        $elemento.addClass( "image-ok-auto-complete" );
    }
};

Processos.clearHiddensAutoComplete = function( $elemento )
{
    $elemento.keyup( function( e )
    {
        // limpa os hidden caso o usuário modifique o conteúdo
        if( Processos.checkTypeKeyPress( e ) ) {
            $elemento.removeClass( "image-ok-auto-complete" );

            var $hiden = $( "#autocompleteHidden" + $elemento.attr( 'acao' ) );
            var $idHiden = $( "#autocompleteHiddenId" + $elemento.attr( 'acao' ) );

            $hiden.val( "" );
            $idHiden.val( "" );
        }
    } );
};

Processos.autoComplete = function( $elemento )
{
    var acao = $elemento.attr( 'acao' );

    $( "#autoComplete" + acao ).autocomplete( {
        minLength: 2,
        source: function( request, response )
        {
            var term = request.term;
            if( term in cacheAutoComplete ) {
                response( $.map( cacheAutoComplete[term][0], function( item )
                {
                    return {
                        label: item.LABEL,
                        value: item.VALUE,
                        id: item.IDVALUE
                    }
                } ) );
            } else {
                Processos.ajaxGET( {
                    url: ProcessosConstants.URL_AUTO_COMPLETE,
                    data: {
                        acao: acao,
                        value: $elemento.val()
                    },
                    success: function( data )
                    {
                        Utils.hideCarregando();
                        response( $.map( data, function( item )
                        {
                            cacheAutoComplete[term] = new Array( data );
                            return {
                                label: item.LABEL,
                                value: item.VALUE,
                                id: item.IDVALUE
                            }
                        } ) );
                    }
                } );
            }
        },
        focus: function( event, ui )
        {
            $elemento.val( ui.item.label );
            return false;
        },
        select: function( event, ui )
        {
            $elemento.val( ui.item.label );
            $elemento.addClass( "image-ok-auto-complete" );
            $( '#autocompleteHidden' + acao ).val( ui.item.value );
            $( '#autocompleteHiddenId' + acao ).val( ui.item.id );
            return false;
        }
    } );
};

Processos.checkTypeKeyPress = function( e )
{
    return Utils.isBackspace( e ) || Utils.isLetter( e ) || Utils.isNumber( e ) || Utils.isOperator( e ) || Processos.anotherKeys( e );
};

Processos.anotherKeys = function( evt )
{
    var key_code = evt.keyCode ? evt.keyCode : evt.charCode ? evt.charCode : evt.which ? evt.which : void 0;
    //     outros             espaço           delete
    return key_code >= 187 || key_code == 32 || key_code == 46;
};

Processos.ajaxGET = function( opts )
{
    opts.type = 'GET';
    Processos.ajaxCall( opts );
};

Processos.ajaxPOST = function( opts )
{
    opts.type = 'POST';
    Processos.ajaxCall( opts );
};

Processos.ajaxCall = function( opts )
{
    if( opts.hideCarregando != true ) {
        Utils.showCarregando();
    }

    $.ajax( {
        url: ProcessosConstants.URL_HAS_CONNECTION_PROCESSOS, // deve ser em /processsos para não ficar um loop de erros 403
        cache: false,
        async: false,
        success: function()
        {
            if( !opts.error && opts.error == undefined ) {
                opts.error = Processos.handleAjaxResponse;
            }
            opts.accepts = {
                script: "text/html, application/json"
            };
            $.ajax( opts );
        },
        error: function( response )
        {
            if( response.status == 403 ) {
                Processos.handleAjaxForbidden();
            } else {
                Processos.handleGeneralError();
            }
            // outro caso é erro, nao vamos colocar nda até porque pode haver uma pilha de chamadas
            // mas como poderia ocorrer isso ?? lembrando que não temos banco nesse caso !!!
        }
    } );
};

/**
 * Função chamada para gerenciamento de sessão expirada.
 */
Processos.handleAjaxForbidden = function()
{
    sessionExpired = true;
    var msg = Processos.getNoConnectionMsg();
    var $carregando = $( '.carregando' );
    if( !$carregando.is( ':visible' ) ) {
        Utils.showCarregando( msg );
    } else {
        var html = $carregando.html();
        if( html.indexOf( 'Expirada' ) > 0 ) {
            // a msg já estava aparecendo e o usuário clicou
            Processos.forbidden();
        } else {
            $( '.carregando' ).html( msg );
        }
    }
};

Processos.forbidden = function()
{
    // desativa o aviso de reaload de página
    // como o usuário teve a sessão expirada pelo sistema,
    // vai ficar estranho se exibirmos uma mensagem perguntando se ele pretende sai da página
    // por isso, desabilitamos o controle de saída
    Processos.disableBeforeUnload();
    Processos.logout();
};

Processos.disableBeforeUnload = function()
{
    $( window ).off( 'beforeunload' );
};

Processos.logout = function()
{
    window.location = '';
};

Processos.handleGeneralError = function()
{
    var msg = Processos.getNoConnectionMsg();

    var $carregando = $( '.carregando' );
    if( !$carregando.is( ':visible' ) ) {
        Utils.showCarregando( msg );
    } else {
        $( '.carregando' ).html( msg );
    }
};

Processos.handleAjaxResponse = function( response, textStatus, XMLHttpRequest )
{
    if( XMLHttpRequest.status == 403 ) {
        Processos.handleAjaxForbidden();
    }
    // vamos ocultar o loading sempre, mesmo que ele alguém já feito isso
    Utils.hideCarregando();
};

Processos.handleAjaxErrorDetails = function( error )
{
    // vamos colocar no dialog o erro para exibição posterior
    $( '#dialog-error' ).html( '<div style="padding: 10px;">' + error + '</div>' );

    var content = ProcessosConstants.MSG_500;
    content += ' <a onclick="Processos.dialogError();" class="sublinhado pointer">Detalhes</a>';

    Utils.showError( ProcessosConstants.TITLE_500, content );

    // acho que nao deveríamos ir pra caixa e se a caixa estiver com erro, fica em loop !!!
    // não temos o que fazer, vamos para a caixa
    // Processos.showCaixaSelecionada(true);
};

Processos.dialogErrors = function( $dialog, $idInstancia )
{

    Utils.showCarregando();

    Processos.ajaxGET( { url: ProcessosConstants.URL_INSTANCIA_ERRORS + $idInstancia,
        success: function( response )
        {
            $dialog.html( response );

            Utils.hideCarregando();

            $dialog.dialog( { modal: true, width: 700, height: 500,
                buttons: {
                    'Ok': function()
                    {
                        $( this ).dialog( 'close' );
                    }
                }
            } );
        }
    } );
};

Processos.getNoConnectionMsg = function()
{
    return 'N&atilde;o h&aacute; conex&atilde;o. <a href="" class="sublinhado">Atualizar</a>';
};

Processos.dialogError = function()
{
    $( '#dialog-error' ).dialog( { modal: true, width: 600, height: 400 } );
};

Processos.forceClickInAuxiliarCampoAnexo = function()
{
    var acaoId = $( this ).attr( 'acaoId' );
    //Aqui, o click é forcado no input de anexo
    var $anexo = $( "#anexo-campo-upload-" + acaoId );
    $anexo.html( $anexo.val( null ).html() );
    $anexo.trigger( 'click' );
};

Processos.changeCampoAnexo = function()
{
    if( Processos.hasConnection() ) {
        var $inputAnexo = $( this );
        var acaoId = $inputAnexo.attr( 'acaoId' );
        //Coloca o nome do arquivo selecionado no campo de texto
        $( '#anexo-send-single-' + acaoId ).val( $inputAnexo.val() );
        if( !Processos.maxSizeAnexo( $inputAnexo, acaoId ) ) {
            Processos.limparResultadosAnexo( acaoId );

            var $trQueApresentaLoad = Processos.getTdQueApresentaLoadAnexo( acaoId );
            $trQueApresentaLoad.html( ProcessosConstants.IMG_LOAD );

            var $form = $( '#form-anexo-' + acaoId );
            $form.submit();
            $( '#name-file-temp-' + acaoId ).attr( 'possuiAnexo', true );
        }
    }
};

Processos.removerAnexo = function()
{
    var $fileToRemove = $( this );
    var $tr = $fileToRemove.parent().parent();
    var acaoId = $tr.attr( 'acaoId' );
    if( $tr.attr( 'situacaoAnexo' ) == Utils.getMessage( 'anexoNovo' ) ) {
        var $valToVerify = $( '#name-file-temp-' + acaoId ).val();
        var verificarSeNomeDiscoPossuiPipe = "|||" + $tr.attr( 'nameFileInDisk' );
        var itemInValue1 = $valToVerify.indexOf( verificarSeNomeDiscoPossuiPipe );
        if( itemInValue1 > -1 ) {
            $valToVerify = $valToVerify.replace( verificarSeNomeDiscoPossuiPipe, '' );
        }

        var nomeDoFileEmDisco = $tr.attr( 'nameFileInDisk' );
        var itemInValue2 = $valToVerify.indexOf( nomeDoFileEmDisco );
        if( itemInValue2 > -1 ) {
            $valToVerify = $valToVerify.replace( nomeDoFileEmDisco, '' );
        }
        $tr.remove();
        $( '#name-file-temp-' + acaoId ).val( $valToVerify );
        if( $( '#anexos-linhas-arquivos-' + acaoId + " tbody" ).children().length == 0 ) {
            $( '#name-file-temp-' + acaoId ).removeAttr( 'possuiAnexo' );
        }
    } else {
        Processos.removerAnexoOfDB( $tr.attr( 'idInstanciaVar' ), $tr, acaoId );
    }
};

Processos.maxSizeAnexo = function( $inputAnexo, acaoId )
{
    var max = ProcessosConstants.MAX_UPLOAD_FILES * 1024 * 1024;
    var $trMensagemAnexo = Processos.getTrMensagemAnexo( acaoId );
    var $load = Processos.getTdQueApresentaLoadAnexo( acaoId );
    $load.html( '' );
    if( $inputAnexo[0].files && $inputAnexo[0].files[0].size > max ) {
        $trMensagemAnexo.css( 'display', 'block' );
        $trMensagemAnexo.find( 'td' ).html( Utils.getMessage( 'msg.tamanho.excedido' ) );
        return true;
    } else if( $inputAnexo[0].files && $inputAnexo[0].files[0].size == 0 ) {
        $trMensagemAnexo.css( 'display', 'block' );
        $trMensagemAnexo.find( 'td' ).html( Utils.getMessage( 'msg.arquivo.vazio' ) );
        return true;
    } else {
        $trMensagemAnexo.css( 'display', 'none' );
        return false;
    }
};

Processos.limparResultadosAnexo = function( acaoId )
{
    var $trQueApresentaResultados = Processos.getTrMensagemAnexo( acaoId );
    $trQueApresentaResultados.find( 'td' ).html( '' );
};

Processos.getTdQueApresentaLoadAnexo = function( acaoId )
{
    return $( '#load-file-anexo-' + acaoId );
};

Processos.hasConnection = function()
{
    var conectado = true;
    $.ajax( {
        url: ProcessosConstants.URL_HAS_CONNECTION_PROCESSOS,
        cache: false,
        async: false,
        error: function()
        {
            var msg = Processos.getNoConnectionMsg();

            var $carregando = $( '.carregando' );
            if( !$carregando.is( ':visible' ) ) {
                Utils.showCarregando( msg );
            } else {
                $( '.carregando' ).html( msg );
            }
            conectado = false;
        }
    } );
    return conectado;
};

Processos.removerAnexoOfDB = function( idinstanciavar, $trToRemover, acaoId )
{
    Utils.showCarregando();

    var objData = new Object();
    objData.instancia = $( '#instancia' ).val();
    objData.elemento = $( '#elemento' ).val();
    objData.instanciaVar = idinstanciavar;

    Processos.ajaxPOST( {
        'url': ProcessosConstants.URL_REMOVER_ANEXO,
        'data': objData,
        'success': function( response )
        {
            if( response ) {
                Utils.hideCarregando();
                Utils.showMsg( ProcessosConstants.MSG_NOTIFY_TITLE_AVISO, ProcessosConstants.MSG_NOTIFY_SOLICITACAO_SUCESSO );
                $( 'a[idInstanciaVar="' + idinstanciavar + '"]' ).remove();
                var $inputs = $( 'input[idInstanciaVar="' + idinstanciavar + '"]' );
                $inputs.removeAttr( 'possuiAnexo' );
                $inputs.val( '' );
                Processos.nenhumArquivoAnexoReadOnly( idinstanciavar );
                $trToRemover.remove();
                if( $( '#anexos-linhas-arquivos-' + acaoId + " tbody" ).children().length == 0 ) {
                    $( '#name-file-temp-' + acaoId ).removeAttr( 'possuiAnexo' );
                }
            }
        }
    } );
};

Processos.getTrMensagemAnexo = function( acaoId )
{
    return $( '#anexo-mensagem-' + acaoId );
};

Processos.nenhumArquivoAnexoReadOnly = function( idInstanciaVar )
{
    var $tdDescricao = $( '<td>' ).html( Utils.getMessage( 'msg.nenhum.arquivo.anexado' ) );
    var $tr = $( 'tr[instanciaVar="' + idInstanciaVar + '"][class="infoAnexoReadOnly"]' );
    $tr.empty();
    $tr.append( $tdDescricao );
};

Processos.respostaAnexo = function( acaoId, fileName, fileNameInDisk, mensagem )
{
    var tamanhoComponente = parseInt( $( 'div[idacao="' + acaoId + '"]' ).children( 'table' ).css( 'width' ).replace( 'px', '' ), 10 );
    var $mensagemServidor = Processos.getTrMensagemAnexo( acaoId );
    if( mensagem == undefined || mensagem == null ) {
        var $inputFiles = $( '#name-file-temp-' + acaoId );
        var isVetor = Utils.stringToBoolean( $inputFiles.attr( 'isvetor' ) );
        if( $inputFiles.val() == '' || !isVetor ) {
            $inputFiles.val( fileNameInDisk );
        } else {
            $inputFiles.val( $inputFiles.val() + "|||" + fileNameInDisk );
        }

        $mensagemServidor.css( 'display', 'none' );
        var $tableToAddNewFile = $( 'div.anexo-listagem[acaoId="' + acaoId + '"] table' );
        if( !isVetor ) {
            $tableToAddNewFile.empty();
        }

        var $imgConfirmacao = $( '<img>', {
            'src': ProcessosConstants.URL_IMG_CONFIRMACAO,
            'title': Utils.getMessage( 'title.arquivo.anexado.mas.nao.salvo' )
        } );

        var $imgExcluir = $( '<img>', {
            'src': ProcessosConstants.URL_IMG_REMOVER_ANEXO,
            'title': Utils.getMessage( 'title.remover.anexo' ),
            'style': 'cursor:pointer',
            'class': 'anexo-remover-arquivo'
        } ).click( Processos.removerAnexo );

        var $trNewFile = $( '<tr>', {
            'situacaoAnexo': Utils.getMessage( 'anexoNovo' ),
            'nameFileInDisk': fileNameInDisk,
            'acaoId': acaoId
        } );

        var width = tamanhoComponente - 67;
        var $tdNomeFile = $( '<td>' ).append( $( '<div>', { 'style': 'width:' + width + 'px;' } ).append( $( '<p>', {
            'text': fileName,
            'class': 'truncate',
            'style': 'padding: 0; margin: 0;',
            'title': fileName
        } ) ) );

        var $tdConfirmacao = $( '<td>', {
            'style': 'width: 16px; text-align: center;',
            'html': $imgConfirmacao
        } );

        var $tdExcluir = $( '<td>', {
            'style': 'width: 16px; text-align: center;',
            'html': $imgExcluir
        } );

        $trNewFile.append( $tdNomeFile, $tdConfirmacao, $tdExcluir );
        $tableToAddNewFile.append( $trNewFile );
    } else {
        $mensagemServidor.css( 'display', 'block' );
        $mensagemServidor.html( mensagem );
    }
};

Processos.selectLinhaGridRadio = function( $this )
{

    var classLinhaSelecionada = 'linhaSelecionada';
    var $table = $this.parent().parent().parent();
    var $radios = $table.find( 'input[type="radio"]:not(:checked)' );

    $radios.each( function()
    {
        var $tr = $( this ).parent().parent();
        $tr.removeClass( classLinhaSelecionada );
    } );

    $this.parent().parent().addClass( classLinhaSelecionada );
};

Processos.selectLinhaGridCheckbox = function( $this )
{
    var $tr = $this.parent().parent();
    var classLinhaSelecionada = 'linhaSelecionada';
    if( $this.hasClass( 'div-checked' ) ) {
        $tr.addClass( classLinhaSelecionada );
    } else {
        $tr.removeClass( classLinhaSelecionada );
    }
};

Processos.clickDivCheckbox = function( $div )
{
    if( $div.hasClass( 'div-checked' ) ) {
        $div.removeClass( 'div-checked' );
    } else {
        $div.addClass( 'div-checked' );
    }
};

Processos.dialogConfirmaExclusaoInstancia = function()
{
    var $dialog = $( '#dialog-confirma-exclusao-instancia' );
    $dialog.dialog( { modal: true, width: 250, height: 170,
        buttons: {
            'Sim': function()
            {
                Processos.removeProcesso();
                $( this ).dialog( 'close' );
            },
            'Cancelar': function()
            {
                $( this ).dialog( 'close' );
            }
        }
    } );
};

Processos.removeProcesso = function()
{
    var $dialog = $( '#dialog-confirma-exclusao-instancia' );
    var url = $dialog.attr( 'url' );

    var form = $( '<form action="' + url + '" method="post">' + '<input type="text" name="instancia" value="' + $( '#instancia' ).val() + '" />' + '<input type="text" name="elemento" value="' + $( '#elemento' ).val() + '" />' + '</form>' );
    $( 'body' ).append( form );
    $( form ).submit();
};

Processos.showFormByContainerGrid = function( tr )
{
    window.location = tr.attr( 'url' );
};