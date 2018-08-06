var cacheAutoComplete = new Array();

$( function()
{
    $( '#q' ).blur( function()
    {
        $( this ).val( 'Acesso R\u00e1pido...' );
    } );

    $( '#q' ).focus( function()
    {
        $( this ).val( '' );
    } );
    Template.buildSearch( $( '#search input' ) );
} );