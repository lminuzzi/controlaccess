$( function()
{
    //criação e eventos do menu
    addEventoMenu();
    addEventoBusca();
});

function addEventoMenu()
{
    var original = $( "#menu" ).clone( true );
    original.find( ".k-state-active" ).removeClass( "k-state-active" );
    $(".configuration input").change( function() {
        var menu = $( "#menu" ),
                clone = original.clone( true );
        menu.data( "kendoMenu" ).close( $( "#menu .k-link" ) );
        menu.replaceWith( clone );
        initMenu();
    });
    var initMenu = function () {
        $( "#menu" ).kendoMenu({
            animation: { open: { effects: "expand:vertical slideIn:down fadeIn" } },
            hoverDelay: 100
        });
    };
    initMenu();
}

function addEventoBusca()
{
    //eventos do hint de busca
    addEventoHintBusca();
    addAutocompleteBusca();
}

function addAutocompleteBusca()
{
    /*var data = [{
        "nome" : [
            "Leandro Sacchet",
            "Luciano Minuzzi",
            "Ubirajara Petri"
        ]},{
        "id" : [
            "1258",
            "0315",
            "0035"
        ]
    }];*/
    /*TODO ver codificação (problemas com acentuação)*/
    var data = [
        "Ana Maria da Rocha",
        "Aldiocir",
        "Cesar Augusto Moura",
        "Henrique Lemos",
        "Jose Gomes",
        "Leandro Sacchet",
        "Luciano Minuzzi",
        "Ubirajara Petri",
        "1258",
        "0315",
        "0107",
        "0035",
        "1005",
        "3982",
        "2608",
        "0015"
    ];

    //$( "#q" ).kendoAutoComplete({
        /*template: '<img src=\"../../img/add-user.png\" alt=\"imagem\" />' +
                '<h3>${ data.nome }</h3>' +
                '<p>${ data.id }</p>',*/
        //minLength: 1,
        /*dataTextField: "Nome",*/
        //dataSource: data,
        //filter: "contains",
        //placeholder: "Buscar..."/*,
        //separator: ", "*/
    //});

    $( "#q" ).autocomplete({
        source: data,
        select: function( event, ui ) {
            if( ui.item.value == "Ana Maria da Rocha" || ui.item.value == "1258" ) {
                location.href = 'cadastro_pessoas_preenchido_mulher.html';
            } else {
                location.href = 'cadastro_pessoas_preenchido.html';
            }
        }
    });
}

function addEventoHintBusca()
{
    var hintBusca = "Buscar...";
    $( '#q' ).val( hintBusca );
    $( '#q').focus( function() {
        var valPesquisa = $( '#q' ).val();
        if( valPesquisa == hintBusca ) {
            $( '#q' ).val( '' );
        }
    });
    $( '#q' ).blur( function() {
        var valPesquisa = $( '#q' ).val();
        if( valPesquisa == '' ) {
            $( '#q' ).val( hintBusca );
        }
    });
}

function preencheZeros( param, tamanho )
{
    /*var tamanhoParametro = $( param ).length;
    var resultado = param;
    if( tamanhoParametro < tamanho ) {
        var contador = tamanhoParametro;
        while( contador < tamanho ) {
            resultado =  "0" + resultado;
            contador++;
        }
    }*/
    var resultado = param;
    if( param < 10 ) {
        resultado =  "0" + resultado;
    }
    return resultado;
}

function aleatorio( inferior, superior ) {
    var numPossibilidades = superior - inferior;
    var aleat = Math.random() * numPossibilidades;
    aleat = Math.floor( aleat );
    return parseInt( inferior ) + aleat
}