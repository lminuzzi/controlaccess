$( function()
{
    Login.showStatus( );

    $( 'input:button' ).button();

    var $login = $( '#login' );
    $login.focus();
    $login.keypress( function( e )
    {
        if( Utils.isEnter( e ) ) {
            Login.submit();
        }
    } );

    $( '#senha' ).keypress( function( e )
    {
        if( Utils.isEnter( e ) ) {
            Login.submit();
        }
    } );

    $( '#button-submit' ).click( Login.submit );
} );