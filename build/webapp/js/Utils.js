function Utils() {
}

jQuery.fn.loading = function () {
    return jQuery(this).html(ProcessosConstants.IMG_LOAD);
};

jQuery.fn.isValidDate = function () {
    var expReg = /^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/(19|20)?\d{2}$/;
    var data = jQuery(this).val();
    if (data && (data.match(expReg)) && (data != '')) {
        var dia = data.substring(0, 2);
        var mes = data.substring(3, 5);
        var ano = data.substring(6, 10);

        if ((mes == 4 || mes == 6 || mes == 9 || mes == 11 ) && dia > 30) {
            return false;
        }

        if ((ano % 4) != 0 && mes == 2 && dia > 28) {
            return false;
        }

        if ((ano % 4) == 0 && mes == 2 && dia > 29) {
            return false;
        }

    } else {
        return false;
    }
    return true;
};

jQuery.fn.loading333 = function () {
    return jQuery(this).html('<div style="padding: 10px;">' + ProcessosConstants.IMG_LOAD_333 + '</div>');
};

jQuery.fn.exists = function () {
    return jQuery(this).val() != null && jQuery(this).length > 0;
};

jQuery.fn.isBlank = function () {
    return $.trim(jQuery(this).val()) == '';
};

jQuery.fn.isNotBlank = function () {
    return !jQuery(this).isBlank();
};

jQuery.fn.disableSelectionCaixa = function () {
    this.each(function () {
        this.onselectstart = function () {
            return false;
        };
        this.unselectable = "on";
        jQuery(this).css('-moz-user-select', 'none');
    });
};

jQuery.fn.changeClass = function( oldClass, newClass )
{
    jQuery( this).removeClass( oldClass).addClass( newClass );
};

Utils.replaceAll = function (string, token, newtoken) {
    while (string.indexOf(token) != -1) {
        string = string.replace(token, newtoken);
    }
    return string;
};

/**
 * Dependência: plugin pnotify.
 */
Utils.showMsg = function (title, text) {
    $.pnotify({
        pnotify_title:title,
        pnotify_text:text,
        pnotify_delay:3000,
        pnotify_history:false
    });
};

/**
 * Dependência: plugin pnotify.
 */
Utils.showMsgNoTime = function (title, text) {
    $.pnotify({
        pnotify_title:title,
        pnotify_text:text,
        pnotify_history:false,
        pnotify_hide:false
    });
};

/**
 * Dependência: plugin pnotify.
 */
Utils.showError = function (title, text) {
    $.pnotify({
        pnotify_title:title,
        pnotify_text:text,
        pnotify_delay:3000,
        pnotify_history:false,
        pnotify_type:'error'
    });
};

/**
 * Dependência: plugin pnotify.
 */
Utils.tooltip = function (title, text) {
    return $.pnotify({
        pnotify_title:title,
        pnotify_text:text,
        pnotify_hide:false,
        pnotify_closer:false,
        pnotify_sticker:false,
        pnotify_history:false,
        pnotify_animate_speed:100,
        pnotify_opacity:.9,
        pnotify_notice_icon:"ui-icon ui-icon-comment",
        // Setting stack to false causes Pines Notify to ignore this notice when positioning.
        pnotify_stack:false,
        pnotify_after_init:function (pnotify) {
            // Remove the notice if the user mouses over it.
            pnotify.mouseout(function () {
                pnotify.pnotify_remove();
            });
        },
        pnotify_before_open:function (pnotify) {
            // This prevents the notice from displaying when it's created.
            pnotify.pnotify({
                pnotify_before_open:null
            });
            return false;
        }
    });
};

Utils.isEnter = function (evt) {
    var key_code = evt.keyCode ? evt.keyCode : evt.charCode ? evt.charCode : evt.which ? evt.which : void 0;
    return key_code == 13;
};

Utils.isBackspace = function (evt) {
    var key_code = evt.keyCode ? evt.keyCode : evt.charCode ? evt.charCode : evt.which ? evt.which : void 0;
    return key_code == 8;
};

Utils.isNumber = function (evt) {
    var key_code = evt.keyCode ? evt.keyCode : evt.charCode ? evt.charCode : evt.which ? evt.which : void 0;
    return (key_code >= 48 && key_code <= 57) || (key_code >= 96 && key_code <= 105);
};

Utils.isLetter = function (evt) {
    var key_code = evt.keyCode ? evt.keyCode : evt.charCode ? evt.charCode : evt.which ? evt.which : void 0;
    return (key_code >= 65 && key_code <= 90);
};

Utils.isOperator = function (evt) {
    var key_code = evt.keyCode ? evt.keyCode : evt.charCode ? evt.charCode : evt.which ? evt.which : void 0;
    return (key_code >= 106 && key_code <= 111);
};

/**
 * Dependência: plugin jquery.block.
 */
Utils.block = function () {
    var $body = $('body');
    $body.block({
        message:'<div class="block"><span>Por favor, aguarde...<span></div>',
        timeout:7000,
        css:{
            border:'none',
            opacity:.9,
            width:'175px',
            '-moz-border-radius-bottomleft':'5px',
            '-moz-border-radius-bottomright':'5px',
            'border-bottom-left-radius':'5px',
            'border-bottom-right-radius':'5px'
        },
        overlayCSS:{
            backgroundColor:'#4F4F4F',
            opacity:0.8,
            '-moz-border-radius':'5px',
            '-webkit-border-radius':'5px',
            'border-radius':'5px'
        }});

    // tivemos que fazer assim para alinhar no topo
    var $elem = $('.blockElement');
    if ($elem && $elem.exists()) {
        $elem.css('top', '0');
    }
};

/**
 * Dependência: plugin jquery.block.
 */
Utils.unblock = function () {
    $('body').unblock();
};

Utils.getAuxJs = function (findName) {
    findName = Utils.replaceAll(findName, '.', '');
    return $('auxJS').find(findName);
};

Utils.getMessage = function (key) {
    return $.trim(Utils.getAuxJs(key).html());
};

Utils.getText = function (name) {
    return $.trim(Utils.getAuxJs(name).text());
};

Utils.getInteger = function( name )
{
    // base 10
    return parseInt( Utils.getText( name ), 10 );
};

Utils.getBoolean = function (name) {
    return Utils.getText(name).toLowerCase() == 'true';
};

Utils.showCarregando = function (msg) {
    var $carregando = $('.carregando');
    if (!$carregando.is(':visible')) {
        $carregando.html(msg != undefined ? msg : 'Carregando...');
        $carregando.show();
    }
};

Utils.hideCarregando = function () {
    var $carregando = $('.carregando');
    if ($carregando.is(':visible')) {
        $('.carregando').hide()
    }
};

Utils.stringToBoolean = function (string) {
    return !(string == undefined || string == null || $.trim(string) == '' || string.toLowerCase() != 'true');
};


Utils.rgb2hex = function (rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2);
};

Utils.getFileExtension = function( image )
{
    return /[^.]+$/.exec(image)[0];
};

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};