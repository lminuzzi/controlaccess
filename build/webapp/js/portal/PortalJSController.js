$( function()
{
    Menu.start();

    var finalizado = Utils.getText( 'finalizado' );
    var instanciaAberta = Utils.getText( 'instanciaAberta' );
    var title;
    var msg;
    if( finalizado == 'true' ) {
        if( instanciaAberta == 'true' ) {
            title = Utils.getMessage( 'titleconfirmacao' );
            msg = Utils.getMessage( 'msgenvioanalise' );
            Utils.showMsg( title, msg );
        } else {
            title = Utils.getMessage('titleconfirmacao');
            msg = Utils.getMessage('msgenviosucesso');
            Utils.showMsg( title, msg );
        }
    }


    $( '.shortcut a' ).tipsy( {gravity: "w"} );

    $( '#div-show-hide' ).click( function()
    {
        var $container = $( '#container-grid' );
        if( $container.is( ':visible' ) ) {
            $container.hide();
            $( '#container-header' ).css( 'right', '20px' );
            $( '#container-content' ).css( 'right', '20px' );
            $( '#div-details' ).css( 'right', '20px' );
        } else {
            $( '#container-header' ).css( 'right', '425px' );
            $( '#container-content' ).css( 'right', '425px' );
            $( '#div-details' ).css( 'right', '425px' );
            $container.show();
        }
    } );

    $( '#container-grid table tbody tr' ).each( function()
    {
        $( this ).click( function()
        {
            Processos.showFormByContainerGrid( $( this ) );
        } );
    } );

} );