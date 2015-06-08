define(function (require, exports, module) {    
    var $ = require('$'); 
    var cenroll;
    require('arale/dialog/1.2.5/dialog.css');
    var Dialog = require('arale/dialog/1.2.5/dialog');

    new Dialog({
        trigger: '.J_ca_dialog_url', 
        width: "700px", 
        height: "400px", 
        align:{
            selfXY:['50%','50%'],
            baseXY:['50%','50%'] 
        }
    }).before('show',function() {
         this.set('content', this.activeTrigger.attr('href'));
    });

    $(function() {
      
        var base = 'https://s.shtimage.com';
        var objectStr = $.isIE 
                ? "<object id='cenroll' codebase='"+base+"/public/ca/itruscertctl.cab#version=2,5,5,8' classid='clsid:F1F0506B-E2DC-4910-9CFC-4D7B18FEA5F9'></object>"
                : "<embed id='cenroll' type='application/iTrusPTA.iTrusPTA.Version.1' width='0' height='0'></embed>";
        cenroll = $(objectStr).appendTo(document.body)[0];
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            iTrusPTA = $(objectStr).appendTo(document.body)[0];

            try{
               var comActiveX = new ActiveXObject('iTrusPTA.iTrusPTA'); 
            }catch(e){
                $('.J_active_isinstall').removeClass('ui-btn-orange').attr('href','javascript:;');
               return false;   
            }
            $('.J_active_isinstall').addClass('ui-btn-orange').attr('href','https://my.shenghuo.com/dc/apply');


        } else {
            var length = navigator.plugins.length;
            var check_install = 0;
            for (var i = 0; i < length; i++) {
                var index = (navigator.plugins[i].name).indexOf("iTrusPTA");
                if (index > -1) {
                    check_install++;
                    break;
                }
            }
            if (check_install > 0) {
                iTrusPTA = $(objectStr).appendTo(document.body)[0];
                $('.J_active_isinstall').addClass('ui-btn-orange').attr('href','https://my.shenghuo.com/dc/apply');
            } else {
                window.location.href= base + "/public/ca/TopCaCertUtil.exe";
            }
        }
    });

}); 

