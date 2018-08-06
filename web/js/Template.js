function Template()
{
}

Template.URL = '/ajax/serach/autocomplete.action';

Template.buildSearch = function( $input )
{
    Template.customAutoComplete();
    Template.buildCatComplete( $input );
    Template.createSearch( $input );
};

Template.buildCatComplete = function( $input )
{
    $input.catcomplete( {
        minLength: 2,
        source: function( request, response )
        {
            var term = request.term;
            if( term in cacheAutoComplete ) {
                response( $.map( cacheAutoComplete[term][0], function( item )
                {
                    return Template.buildReturn( item );
                } ) );
            } else {
                $.ajax( {
                    opts: 'GET',
                    url: $input.attr( 'urlsearch' ),
                    data: {
                        term: term
                    },
                    cache: false,
                    async: false,
                    success: function( data )
                    {
                        response( $.map( data, function( item )
                        {
                            cacheAutoComplete[term] = new Array( data );
                            return Template.buildReturn( item )
                        } ) );
                    }
                } );
            }
        },
        open: function( event, ui )
        {
            $( 'ul.ui-autocomplete' ).css( 'left', 'auto' ).css( 'right', '40px' ).css( 'top', '75px' );
        },
        focus: function( event, ui )
        {
            Template.seachChange( $input, ui.item );
            return false;
        },
        select: function( event, ui )
        {
            Template.seachChange( $input, ui.item );
            return false;
        }
    } );
};

Template.createSearch = function( $input )
{
    $input.focus();
    $input.keypress( function( e )
    {
        if( Utils.isEnter( e ) ) {
            var versao = $input.attr( "versao" );
            if( versao != undefined && versao != '' ) {
                window.location = $input.attr( 'urlredirect' ) + versao;
            }
        }
    } );
};

Template.seachChange = function( $input, item )
{
    $input.val( item.label );
    $input.attr( 'versao', item.versao );
};

Template.buildReturn = function( item )
{
    if( item.TREE == undefined ) {
        item.TREE = 'principal'
    }

    return {
        versao: item.ID_VERSAO,
        label: item.TITLE,
        category: item.TREE
    }
};

Template.customAutoComplete = function()
{
    $.widget( "custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function( ul, items )
        {
            var that = this, currentCategory = "", first = true;
            ul.addClass( 'autocompleteSearch' );
            $.each( items, function( index, item )
            {
                if( item.category != currentCategory ) {
                    if( first ) {
                        first = false
                    } else {
                        ul.append( "<div class='divisorCategory'>" )
                    }
                    ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                    currentCategory = item.category;
                }
                that._renderItemData( ul, item );
            } );
        }
    } );
};