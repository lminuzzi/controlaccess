$( function()
{
    initComponents();
    addEventoSubmit();
});

function addEventoSubmit()
{
    $( '#button-save').click( function() {
        validaSenhas();
    });
}

function validaSenhas()
{
    var senha = $( '#senha' ).val();
    var confirmarSenha = $( '#confirmar_senha' ).val();
    if( senha != confirmarSenha ) {
        Utils.showError( 'Aviso', 'Senhas diferentes!' );
    } else {
        Utils.showMsg( 'Sucesso', 'Usu&aacute;rio cadastrado!' );
    }
}

function initComponents()
{
    initKenduiComponents();
}

function initKenduiComponents()
{
    $( 'select' ).kendoComboBox();
}