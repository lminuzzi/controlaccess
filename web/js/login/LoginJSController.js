$( function()
{
    //Login.showStatus( );

    $( 'input:button' ).button();

    var $login = $( '#login' );
    $login.focus();
    $login.keypress( function( e )
    {
        if( Utils.isEnter( e ) ) {
            submitLogin();
        }
    } );

    $( '#senha' ).keypress( function( e )
    {
        if( Utils.isEnter( e ) ) {
            submitLogin();
        }
    } );

    //$( '#button-submit' ).click( Login.submit );
    $( '#button-submit' ).click( function() {
        submitLogin();
    });
});

function submitLogin()
{
    //alert("submit");
    $( '#formLogin' ).submit();
}