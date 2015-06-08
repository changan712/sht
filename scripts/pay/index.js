define(function (require, exports, module) {
	
    var $ = require('$');
    var Dialog = require('arale/dialog/1.2.5/dialog');
    require('arale/dialog/1.2.5/dialog.css');

    var ConfirmBox = require('arale/dialog/1.2.5/confirmbox');

    var Calendar = require('arale/calendar/1.0.0/calendar');
    require('arale/calendar/1.0.0/calendar.css');

    

    var Tab = require('sht/tab/1.0.0/tab');

    var Tip = require('arale/tip/1.2.1/tip');
    // var tip = new Tip({
    //     trigger: '.J_tips_desc', 
    //     arrowPosition: 1,
    //     effect: 'fade',  
    //     inViewport: true,
    //     theme: 'sht'
    // });

    exports.tip = Tip;
    //module.exports = Tip;


    var urlDialogObj = new Dialog({
        trigger: '.J_dialog_url'
    }).before('show',function() {
         this.set('content', this.activeTrigger.attr('href'));
    });

    var divDialogObj = new Dialog({
        trigger: '.J_dialog_div'      
    }).before('show',function() {
        var name = this.activeTrigger.attr('data-src');
        var width = this.activeTrigger.attr('data-width')?this.activeTrigger.attr('data-width')+'px':'';
        this.set('content', $('.'+name).show());
        this.set('width', width);
    });
    
    //exports.urlDialogObj = urlDialogObj;
    //exports.divDialogObj = divDialogObj;

    // var $J_auto_show = $(".J_auto_show");
    // if($J_auto_show.length){
    //     var dialogObj = new Dialog({
    //         content: $('.J_auto_show')
    //     });

    //     $('.J_hide').click(function(){
    //         dialogObj.hide();
    //     });

    //     exports.noTitleDialog = dialogObj;

    // }

    var $J_auto_show = $(".J_order_desc");
    if($J_auto_show.length){
        $($J_auto_show).click(function(){
            $('.J_order_desc_content').toggle();
        });
        
    }


    if($('.J_start_cal').length && $('.J_start_cal').length){

        var t1 = '2013-01-01';
        var t2 = '2099-01-01';
        var c1 = new Calendar({trigger: '.J_start_cal', range: [t1, null]})
        var c2 = new Calendar({trigger: '.J_end_cal', range: [null, t2]})

        c1.on('selectDate', function(date) {
            c2.range([date, t2]);
        });

        c2.on('selectDate', function(date) {
            c1.range([t1, date]);
        });
    }

    
    if($('.J_tab_head a').length && $('.pay-tab-con').length){
        $('.J_tab_head a').first().addClass('curr');
        $('.pay-tab-con').first().show();
        new Tab('.J_tab_head a', '.pay-tab-con','click');
    }

    //选择付款方式
    if($('.J_bank_tab a').length && $('.bank-list').length){
        $('.J_bank_tab a').first().addClass('curr');
        $('.bank-list').first().show();
        new Tab('.J_bank_tab a', '.bank-list','click');
    }

    //选择银行
    if($('.deposit-card li').length){
        $('.deposit-card li').click(function(){
            $(this).parent('ul').find('li').removeClass('curr');
            $(this).parent('ul').find('li input[type="radio"]').prop({
                checked: false
            });
            $(this).addClass('curr').find('input').prop({
                checked: true
            });;
        });
    }
    
    //关闭备注
    if($('.J_close_remark').length){
        $('.J_close_remark').click(function(){
            $('.J_remark_content').toggle(function(){
                $('.J_close_remark').text() == '关闭备注'?$('.J_close_remark').text('打开备注'):$('.J_close_remark').text('关闭备注')
            });
        });        
    }

    //是否发送手机短信
    if($('.J_show_mobile').length){
        $('.J_show_mobile').click(function(){
            if($(this).is(':checked')){               
                $('.J_mobile_content').show();
            }else{
                $('.J_mobile_content').hide();
            }
        });
    }

    if($('.J_checked_all').length && $('.J_checked_all_list').length){
        $('.J_checked_all').click(function(){
            if($(this).is(':checked')){
                $(".J_checked_all_list input[type='checkbox']").prop({
                    checked: true
                });
            }else{
                $(".J_checked_all_list input[type='checkbox']").prop({
                    checked: false
                });
            }
            
        });

        $(".J_checked_all_list input[type='checkbox']").click(function(){
            $(".J_checked_all_list input[type='checkbox']").length == $(".J_checked_all_list input[type='checkbox']:checked").length ? $('.J_checked_all').prop("checked",true) : $('.J_checked_all').prop("checked",false);
        });
    }

});

