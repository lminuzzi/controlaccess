$( function()
{
    $( 'input:button' ).button();

    $( '#nome' ).focus();

    $( '#button-enviar' ).click( function()
    {
        $('#command' ).submit();
    } );
} );