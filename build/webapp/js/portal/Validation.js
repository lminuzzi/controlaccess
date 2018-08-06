function Validation()
{
}

Validation.validateAll = function( saveOnly )
{
    var hasError = false;

    Validation.romoveAllClassObrigatorio();

    $( '.date' ).each( function()
    {
        if( (saveOnly && $( this ).isNotBlank()) || !saveOnly ) {
            if( hasError ) {
                Validation.validateDate( $( this ) );
            } else {
                hasError = Validation.validateDate( $( this ) );
            }
        }
    } );

    $( '.obrigatorio' ).each( function()
    {
        if( (saveOnly && $( this ).isNotBlank()) || !saveOnly ) {
            if( !$( this ).hasClass( 'date' ) ) {
                if( hasError ) {
                    Validation.validateObrigatorio( $( this ) );
                } else {
                    hasError = Validation.validateObrigatorio( $( this ) );
                }
            }
        }
    } );

    $( '.div-radio' ).each( function()
    {
        if( (saveOnly && $( this ).isNotBlank()) || !saveOnly ) {
            if( $( this ).attr( 'obrigatorio' ) == 'true' ) {
                if( hasError ) {
                    Validation.validateRadio( $( this ) );
                } else {
                    hasError = Validation.validateRadio( $( this ) );
                }
            }
        }
    } );

    // Validação das grid!
    $( 'div.grid' ).each( function()
    {
        if( (saveOnly && $( this ).isNotBlank()) || !saveOnly ) {
            if( $( this ).attr( 'obrigatorio' ) == 'true' ) {
                if( hasError ) {
                    Validation.validateGrid( $( this ) );
                } else {
                    hasError = Validation.validateGrid( $( this ) );
                }
            }
        }
    } );

    return hasError;
};

Validation.validateObrigatorio = function( $elemento )
{
    // verifica se é somente leitura
    /*
    if( $elemento.attr( 'readonly' ) == 'readonly' ) {
        return false;
    }
    */
    var hasError;
    var obrigatorio = $elemento.attr( 'obrigatorio' );
    if( $elemento.attr( 'tipo' ) == Utils.getText( "typeAutoComplete" ) ) {
        var acao = $elemento.attr( 'acao' );
        var $inputHidden = $( '#autocompleteHidden' + acao );
        if( obrigatorio == 'true' && $.trim( $inputHidden.val() ) == '' ) {
            hasError = Validation.foundError( $elemento );
            // como deu erro no auto-complete, vamos apagar o que o usuário escreveu
            $elemento.val( "" );
        } else {
            hasError = Validation.notFoundError( $elemento );
        }
    } else {
        if( obrigatorio == 'true' && $.trim( $elemento.val() ) == '' && $elemento.attr( 'possuiAnexo' ) == undefined ) {
            hasError = Validation.foundError( $elemento );
        } else {
            hasError = Validation.notFoundError( $elemento );
        }
    }
    return hasError
};

Validation.validateDate = function( $date )
{
    var hasError;
    if( $date.attr( 'obrigatorio' ) == 'true' || $date.isNotBlank() ) {
        if( $date.isValidDate() ) {
            hasError = Validation.notFoundError( $date );
        } else {
            hasError = Validation.foundError( $date );
        }
    }
    return hasError
};

Validation.validateRadio = function( $divRadio )
{
    var name = $divRadio.attr( 'name' );
    var $radios = $( 'input[name=' + name + ']' );

    var checked = false;
    $radios.each( function()
    {
        if( $( this ).is( ':checked' ) ) {
            checked = true;
        }
    } );

    return checked ? Validation.notFoundError( $divRadio ) : Validation.foundError( $divRadio );
};

Validation.validateGrid = function( $divGrid )
{
    var checado = false;
    if( $divGrid.attr( 'type' ) == Utils.getText( 'gridTypeCheckbox' ) ) {
        checado = $divGrid.find( '.div-checkbox.div-checked' ).length;
    } else {
        checado = $divGrid.find( 'input[type="radio"]:checked' ).length == 1;
    }
    return checado ? Validation.notFoundError( $divGrid ) : Validation.foundError( $divGrid );
};

Validation.removeClassCampoObrigatorio = function( $elemento )
{
    var acao = $elemento.attr( "acaoid" );
    if( acao != undefined ) {
        $( "#auxiliar-campo-anexo-" + acao ).removeClass( "campo-obrigatorio" );
    } else {
        $elemento.removeClass( "campo-obrigatorio" );
    }
};

Validation.addClassCampoObrigatorio = function( $elemento )
{
    var acao = $elemento.attr( "acaoid" );
    if( acao != undefined ) {
        $( "#auxiliar-campo-anexo-" + acao ).addClass( "campo-obrigatorio" );
    } else {
        $elemento.addClass( "campo-obrigatorio" );
    }
};

Validation.foundError = function( $elemento )
{
    Validation.addClassCampoObrigatorio( $elemento );
    return true;
};

Validation.notFoundError = function( $elemento )
{
    Validation.removeClassCampoObrigatorio( $elemento );
    return false;
};

Validation.romoveAllClassObrigatorio = function()
{
    $( '.campo-obrigatorio' ).each( function()
    {
        $( this ).removeClass( 'campo-obrigatorio' );
    } );
};