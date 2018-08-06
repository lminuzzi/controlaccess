function Login()
{
}

var TITLE_NOTIFY_LOGIN_FAIL = Utils.getMessage( 'title.notify.login.fail' );
var TITLE_NOTIFY_VALIDACAO = Utils.getMessage( 'title.notify.validacao' );

var MSG_NOTIFY_LOGIN_FAIL = Utils.getMessage( 'msg.notify.login.fail' );
var MSG_NOTIFY_USUARIO_INATIVO = Utils.getMessage( 'msg.notify.usuario.inativo' );
var MSG_NOTIFY_USUARIO_LOCKED = Utils.getMessage( 'msg.notify.usuario.locked' );

var userNotFound = function()
{
    Utils.showError( TITLE_NOTIFY_LOGIN_FAIL, MSG_NOTIFY_LOGIN_FAIL );
};

var userInactive = function()
{
    Utils.showError( TITLE_NOTIFY_VALIDACAO, MSG_NOTIFY_USUARIO_INATIVO );
};

var userLocked = function()
{
    Utils.showError( TITLE_NOTIFY_VALIDACAO, MSG_NOTIFY_USUARIO_LOCKED );
};

Login.isValidSubmit = function()
{
    return $( '#login' ).isNotBlank() && $( '#senha' ).isNotBlank();
};

Login.submit = function()
{
    if( Login.isValidSubmit() ) {
        $( '#form-login' ).submit();
    }
};

Login.showStatus = function()
{
    var status = Utils.getText( 'status' );
    if( status != '' ) {
        if( status == 'UserNotFound' ) {
            userNotFound();
        } else if( status == 'UserInactive' ) {
            userInactive();
        } else if( status == 'UserLocked' ) {
            userLocked();
        }
    }
};