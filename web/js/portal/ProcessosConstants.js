function ProcessosConstants() {
}

ProcessosConstants.CONTEXT = Utils.getText('context');

ProcessosConstants.URL_AUTO_COMPLETE = ProcessosConstants.CONTEXT + 'ajax/portal/step/autocomplete.action?';
ProcessosConstants.URL_HAS_CONNECTION_PROCESSOS = ProcessosConstants.CONTEXT + 'ajax/processo/hasconnection.action';
ProcessosConstants.URL_LOGOUT = ProcessosConstants.CONTEXT + 'logout.action';
ProcessosConstants.URL_INSTANCIA_ERRORS = ProcessosConstants.CONTEXT + 'ajax/portal/errors/errors.action?instancia=';
ProcessosConstants.URL_IMG_LOAD = ProcessosConstants.CONTEXT + 'img/loading.gif';
ProcessosConstants.URL_REMOVER_ANEXO = ProcessosConstants.CONTEXT + 'ajax/portal/step/removeanexo.action';
ProcessosConstants.URL_IMG_CONFIRMACAO = ProcessosConstants.CONTEXT + 'img/confirmacao.png';
ProcessosConstants.URL_IMG_REMOVER_ANEXO = ProcessosConstants.CONTEXT + 'img/removeFile.png';

ProcessosConstants.MSG_500 = Utils.getMessage('msg.500');
ProcessosConstants.MSG_NOTIFY_TITLE_AVISO = Utils.getMessage('msg.notify.title.aviso');

ProcessosConstants.TITLE_500 = Utils.getMessage('title.500');

ProcessosConstants.IMG_LOAD = '<img src="' + ProcessosConstants.URL_IMG_LOAD + '"/>';

ProcessosConstants.MSG_NOTIFY_TITLE_AVISO = Utils.getMessage('msg.notify.title.aviso');
ProcessosConstants.MSG_NOTIFY_SOLICITACAO_SUCESSO = Utils.getMessage('msg.notify.solicitacao.sucesso');

ProcessosConstants.MAX_UPLOAD_FILES = Utils.getInteger('maxFileUpload');