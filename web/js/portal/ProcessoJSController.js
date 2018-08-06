$( function()
{
    $( 'input:button' ).button();

    $( '.date' ).datepicker( { changeMonth: true, changeYear: true } );
    $( '.numeric' ).numeric();

    $( '#button-prox-step' ).click( function()
    {
        Processos.saveStep( false );
    });

    $( '#button-remove-processo' ).click( function()
    {
        Processos.dialogConfirmaExclusaoInstancia()
    });

    $( "textarea[maxlength]" ).keypress( function( event )
    {
        var key = event.which;
        //todas as teclas incluindo enter
        if( key >= 33 || key == 13 ) {
            var maxLength = $( this ).attr( "maxlength" );
            var length = this.value.length;
            if( length >= maxLength ) {
                event.preventDefault();
            }
        }
    });

    $( '.mask' ).each( function()
    {
        var fieldMask = $( this ).attr( 'fieldMask' );
        if( fieldMask != null && fieldMask != '' ) {
            $( "#" + $( this ).attr( 'id' ) ).mask( fieldMask );
        }
    });

    $( '.autocomplete' ).each( function()
    {
        var $elemento = $( this );
        Processos.verificarAutoCompleteOk( $elemento );
        Processos.clearHiddensAutoComplete( $elemento );
        Processos.autoComplete( $elemento );
    });


    $( '.date' ).change( function()
    {
        Validation.validateDate( $( this ) );
    });

    $( '.obrigatorio' ).blur( function()
    {
        if( !$( this ).hasClass( 'date' ) ) {
            Validation.validateObrigatorio( $( this ) );
        }
    });

    $( '.div-radio' ).change( function()
    {
        if( $( this ).attr( 'obrigatorio' ) == 'true' ) {
            Validation.validateRadio( $( this ) );
        }
    });

    $( '.auxiliar-campo-anexo' ).blur( function()
    {
        Validation.validateObrigatorio( $( this ) );
    });

    $( '.grid div[input="checkbox"]' ).click( function()
    {
        if( $( this ).attr( 'disabled' ) == undefined ) {
            Processos.clickDivCheckbox( $( this ) );
            Processos.selectLinhaGridCheckbox( $( this ) );
        }
    });

    $( '.grid input[type="radio"]' ).change( function()
    {
        Processos.selectLinhaGridRadio( $( this ) );
    });

    $( '.grid div[input="checkbox"][checked="true"]' ).each( function()
    {
        Processos.selectLinhaGridCheckbox( $( this ) );
    });

    $( '.grid input[type="radio"]:checked' ).each( function()
    {
        Processos.selectLinhaGridRadio( $( this ) );
    } );

    $( '#div-show-hide' ).click( function()
    {
        var $container = $( '#container-grid' );
        if( $container.is( ':visible' ) ) {
            $container.hide();
            $( '#container-header' ).css( 'right', '20px' );
            $( '#container-content' ).css( 'right', '20px' );
        } else {
            $( '#container-header' ).css( 'right', '425px' );
            $( '#container-content' ).css( 'right', '425px' );
            $container.show();
        }
    });

    //Neste caso, como nao pode ter form dentro de form, para os anexos trataremos de maneira diferente, primeiro construimos os campos
    //e depois que a pagina foi construidas, para cada anexo devemos criar um form para enviar o arquivo atraves de um POST normal
    var $divContainerForms = $( '<div>', {
        'style': 'width: 0px; height: 0px; position: absolute; overflow: hidden'
    }).appendTo( 'body' );
    var $divCamposAnexosTypeFiles = $( 'div[identificador^="form-anexo-"]' );
    $divCamposAnexosTypeFiles.each( function()
    {
        var $form = $( '<form>', {
            'method': $( this ).attr( 'method' ),
            'target': $( this ).attr( 'target' ),
            'action': $( this ).attr( 'action' ),
            'enctype': $( this ).attr( 'enctype' ),
            'id': $( this ).attr( 'identificador' )
        }).append( $( this ).html() );
        $divContainerForms.append( $form );
    });
    $divCamposAnexosTypeFiles.remove(); //Removemos todos os campos temporarios

    $( '.auxiliar-campo-anexo' ).click( Processos.forceClickInAuxiliarCampoAnexo );
    $( '.campo-anexo' ).change( Processos.changeCampoAnexo );
    $( '.removerAnexo' ).click( Processos.removerAnexo );

    $( '.grid div[input="checkbox"]' ).click( function()
    {
        if( $( this ).attr( 'disabled' ) == undefined ) {
            Processos.clickDivCheckbox( $( this ) );
            Processos.selectLinhaGridCheckbox( $( this ) );
        }
    });

    $( '.grid input[type="radio"]' ).change( function()
    {
        Processos.selectLinhaGridRadio( $( this ) );
    });

    $( '.grid div[input="checkbox"][checked="true"]' ).each( function()
    {
        Processos.selectLinhaGridCheckbox( $( this ) );
    });

    $( '.grid input[type="radio"]:checked' ).each( function()
    {
        Processos.selectLinhaGridRadio( $( this ) );
    });

    $( '#container-grid table tbody tr' ).each( function()
    {
        $( this ).click( function()
        {
            Processos.showFormByContainerGrid( $( this ) );
        });
    });
});