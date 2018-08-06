$( function()
{
    initComponents();
    addEventoShowHide();
    addEventsButtons();
    showHideTipoMilitar();
});

function getDadosHistorico()
{
    var data = [], maxQtde = 20;
    for( var index = 0; index < maxQtde; index++ ) {
        var diaRandom = aleatorio( 1, 31 );
        var horaRandom = preencheZeros( aleatorio( 1, 25 ), 2 )+":"+preencheZeros( aleatorio( 0, 60 ), 2 );
        var tipoEntrada = "Entrada";
        if( ( index % 2 ) != 0 ) {
            tipoEntrada = "Saida";
        }
        data.push({
            Id: data.length + 1,
            FirstName: "Cesar Augusto",
            LastName: "Moura",
            City: "Santa Maria",
            Cargo: "Capitao",
            BirthDate: "10/07/1953",
            Age: 50,
            DataRegistro: preencheZeros( diaRandom, 2 )+"/07/2013",
            HoraRegistro: horaRandom,
            TipoEntrada: tipoEntrada
        });
    }
    return data;
}

function addEventsButtons()
{
    $( '#alterar' ).click( function() {
        Utils.showMsg( 'Aviso', 'Altera&ccedil;&atilde;o realizada!' );
    });
    $( '#vincularId' ).click( function() {
        var valorAntigo = $( '#valorIdentificacao' ).val();
        if( valorAntigo == undefined  ) {
            valorAntigo = $( '#numIdentificacao' ).html().trim();
        }
        var input = "<input type='text' class='k-textbox' value='" + valorAntigo + "' id='valorIdentificacao' name='valorIdentificacao'/>";
        $( '#numIdentificacao' ).html( input );
        $( '#identificacao' ).show();
    });
    $( '#vincularVeiculo' ).click( function() {
        var valorAntigo = $( '#valorVeiculo' ).val();
        if( valorAntigo == undefined  ) {
            valorAntigo = $( '#numPlaca' ).html().trim();
        }
        var input = "<input type='text' class='k-textbox' value='" + valorAntigo + "' id='valorVeiculo' name='valorVeiculo'/>";
        $( '#numPlaca' ).html( input );
        $( '#veiculo' ).show();
    });
    $( '#historico' ).click( function() {
        $( "#window" ).dialog( "open" );
    });
    $( '#localizar' ).click( function() {

    });
    $( '#salvar' ).click( function() {
        //Utils.showMsg( 'Sucesso', 'Pessoa inserida com sucesso!' );
        location.href = 'cadastro_pessoas_preenchido.html';
    });
}

function showHideTipoMilitar()
{
    var tipoPes = $( '#tipo_pessoa' ).val();
    if( tipoPes == 'militar' ) {
        $( '.tipoMilitarSelecionado' ).show();
    } else {
        $( '.tipoMilitarSelecionado' ).hide();
    }
}
function addEventoShowHide()
{
    $( '#tipo_pessoa' ).change( function() {
        showHideTipoMilitar();
    });
    var numIdentificacao = $( '#numIdentificacao' ).html().trim();
    if( numIdentificacao == '' ) {
        //não há número de identificação, ocultar
        $( '#identificacao' ).hide();
    }
    var numPlaca = $( '#numPlaca' ).html().trim();
    if( numIdentificacao == '' ) {
        //não há número de placa, ocultar
        $( '#veiculo' ).hide();
    }
}

function initComponents()
{
    //criação e eventos do menu
    initCheckbox();
    //dialog
    initDialog();
    //componentes kendoui
    initKendouiComponents();
    //formats de inputs
    addInputFormat();
}

function initDialog()
{
    $( "#window" ).dialog({
        title: "Controle de Acessos",
        width: 800,
        height: 400,
        autoOpen: false,
        show: {
            effect: "clip",
            duration: 400
        },
        hide: {
            effect: "fade",
            duration: 1000
        }
    });
}

function addInputFormat()
{
    $( '.mask-rg' ).mask( '99.999.999-9' );
    $( '.mask-cpf' ).mask( '999.999.999-99' );
}

function initKendouiComponents()
{
    //combobox kendoui
    $( 'select' ).kendoComboBox();
    //datepicker kendoui
    $( '#dtNascimento' ).kendoDatePicker({
        format: "dd/MM/yyyy"
    });
    initGrid();
}

function initCheckbox()
{
    $( 'input' ).iCheck({
        checkboxClass   : 'icheckbox_square',
        radioClass      : 'iradio_square',
        increaseArea    : '20%' // optional
    });
}

function initGrid()
{
    $( '#containerGridDadosAcessos' ).kendoGrid({
        dataSource: {
            data: getDadosHistorico(),
            schema:{
                model: {
                    fields: {
                        Id: { type: "number" },
                        FirstName: { type: "string" },
                        LastName: { type: "string" },
                        Cargo: { type: "string" },
                        DataRegistro: { type: "string" },
                        HoraRegistro: { type: "string" },
                        TipoEntrada: { type: "string" }
                    }
                }
            },
            pageSize: 15,
            group: {
                field: "DataRegistro", aggregates: [
                    { field: "DataRegistro", aggregate: "count" }
                ]
            },

            aggregate: [ { field: "FirstName", aggregate: "count" } ]
        },
        height: 360,
        sortable: true,
        scrollable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "FirstName", title: "Nome"/*, footerTemplate: "Total Final: #=count#", groupFooterTemplate: "Total: #=count#"*/ },
            { field: "LastName", title: "Sobrenome" },
            { field: "HoraRegistro", title: "Hora do Registro" },
            { field: "TipoEntrada", title: "Tipo de Entrada" }
        ]
    });
}