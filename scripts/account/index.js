define(function (require, exports, module) {

    var $ = require('$');
    var Dialog = require('arale/dialog/1.2.5/dialog');
    require('arale/dialog/1.2.5/dialog.css');

    // new Dialog({
    //     trigger: '.J_dialog_login',
    //     effect: 'fade',
    //     width: '357px',
    //     content: ''
    // }).before('show',function() {
    //      this.set('content', this.activeTrigger.attr('src'));
    // });

    new Dialog({
        trigger: '.J_dialog_url'
    }).before('show',function() {
         this.set('content', this.activeTrigger.attr('href'));
    });

    


});
