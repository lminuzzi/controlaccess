function Menu()
{
}

Menu.start = function()
{
    var $itemMenu = $( '.menu .item' );
    $itemMenu.mouseenter( function()
    {
        Menu.showInfoIcon( $( this ) );
    } );
    $itemMenu.mouseleave( function()
    {
        Menu.hideInfoIcon(  );
    } );

    $( '.menu .content' ).click( Menu.redirect );

    /**
     * Tratamento para quando o usuário fazer o hover na imagem do info, o hover do menu permanecer ativo.
     */
    var $info = $( '.menu .item .info' ).mouseover( function()
    {
        $( this ).parent().parent().find( '.content > img' ).css( 'opacity', '1' );
    } );
    $info.mouseout( function()
    {
        $( this ).parent().parent().find( '.content > img' ).css( 'opacity', '' );
    } );
    $info.click( Menu.showDetails );
};

Menu.showInfoIcon = function( $elem )
{
    Menu.showInfo( $elem );
};

Menu.hideInfoIcon = function( $elem )
{
    Menu.hideInfo( $elem );
};

Menu.hideInfo = function(  )
{
    $( '.details' ).hide();
};

Menu.showInfo = function( $elem )
{
    var $elementToHide = $elem.find( '.details' );
    $elementToHide.show('fast');
};

Menu.showDetails = function()
{
    var $parent = $( this ).parent().parent();
    var title = $parent.find( '.content div' ).text();
    var tooltip = $parent.find( '.content span' ).text();
    $( '#div-details' ).html( '<div class="title">' + title + '</div><div class="tooltip">' + tooltip + '</div>' );
};

Menu.redirect = function()
{
    window.location = $( this ).attr( 'url' );
};