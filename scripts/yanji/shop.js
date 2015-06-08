define(function (require, exports, module) {

    var $ = require('$');
    var Tab = require('sht/tab/1.0.0/tab');
    var Slider = require('sht/slider/1.0.0/slider');
    var Dialog = require('arale/dialog/1.2.5/dialog');
    var sticky = require('arale/sticky/1.3.0/sticky');
    var Carousel = require('arale/switchable/1.0.2/carousel');
    //var fixele = require('sht/fixele/1.0.0/fixele');
    var ui = require('sht/ui/1.0.0/ui');
    require('arale/dialog/1.2.5/dialog.css');


    new Tab('.product-detail .ui-tab-h .con a ', '.product-detail  .tab-con li', 'click');
    new Tab('.shop-rec .ui-tab-h .con a ', '.shop-rec  .tab-con ul', 'click');
    new Tab('.shop-info dt a', '.shop-info dd');

    var oSlider = new Slider('#J_ad-slider .ui-switchable-prev-btn ', '#J_ad-slider  .ui-switchable-next-btn', '#J_ad-slider  .scroller', ' li');

    //Carousel       
    (function () {
        var wp = $('#J_carousel');
        if (wp.length) {
            var carsl = new Carousel({
                element: '#J_carousel',
                effect: 'scrollx',
                autoplay: true
            }).render();

            if (wp.find('.tips').size()) {
                var tips = wp.find('.tips');
                var imgs = wp.find('.ui-switchable-panel img');
                tips.html(imgs.eq(0).attr('alt'));
                carsl.on('switched', function (toindex) {
                    tips.html(imgs.eq(toindex).attr('alt'));
                });
            }
        }
    }());

    //default img
    (function () {
        $(document).on('ajaxComplete', function (e) {
            ui.setDefaultImg(e.target);
        });

        ui.setDefaultImg();

        //商户菜品、环境展示
        if ($('.img-con a').length) {
            require('http://s.shtimage.com/scripts/common/fancybox/source/jquery.fancybox.pack.js');
            require('http://s.shtimage.com/scripts/common/fancybox/source/jquery.fancybox.css');
            $('.img-con a').fancybox();
        }

    }());

    var appDialog = new Dialog({
        trigger: '#J_getapp-trigger',
        content: '#J_dialog-getapp'
    }).before('show', function () {
            $(this.get('content')).show();
        });

    exports.appDialog = appDialog;

    //商家地图
    if ($('.J_business_list').length) {
        $('.J_business_list dl').hover(function () {
            $('.J_business_list dl dd').hide();
            $(this).find('dd').show();
        });
    }

    $(function () {

        var pdStick = $('#J_pd_sticky'), target, h;
        sticky(pdStick, 0, function (status) {
            if (status) {
                $(this.elem).addClass('acitve-sh');
            } else {
                $(this.elem).removeClass('acitve-sh');
            }
        });
        pdStick.delegate('a', 'click', function () {
            target = $($(this).attr('href'));
            h = target.offset().top;

            $(this).addClass('curr').siblings().removeClass('curr');

            if ($.browser.webkit) {
                $(document.body).animate({'scrollTop': (h - 100) + 'px'}, 'fast');
            } else {
                $(document.documentElement).animate({'scrollTop': (h - 100) + 'px'}, 'fast');
            }
        });

        //本周推荐sticky
        if ($('.J_week_sticky').length) {
            require('http://s.shtimage.com/scripts/common/jquery.sticky-kit.min.js');
            $('.J_week_sticky').stick_in_parent();
        }


    }());

    //filter view
    $('.filter').delegate('li dd a:not(:first)', 'click.shop',function () {

        var vc = $(this).parents('li').find('.v-c');
        var aA;
        $(this).addClass('active').siblings('a').removeClass('active');

        if (vc.size()) {
            vc.find('li a').removeClass('active');
            aA = vc.find('li').eq($(this).parent('dd').find('a').not(':first').index(this));
            if (aA.length && aA.find('a').length > 1) {
                vc.show().find('li').hide();
                aA.show();
                aA.find('a').first().addClass('active');
            } else {
                vc.hide();
            }
        }

        return false;
    }).delegate('li dd a:first', 'click.shop',function () {

            var vc = $(this).parents('li').find('.v-c');
            $(this).addClass('active').siblings('a').removeClass('active');

            if (vc.size()) {
                vc.find('li a').removeClass('active');
                vc.hide().find('li').hide();
            }

        }).delegate('.v-c li a:not(:first)', 'click.shop',function () {
            $(this).addClass('active').siblings('a').removeClass('active');
            var index = $(this).parents('.v-c').find('li').index($(this).parent('li'));
            $(this).parents('.v-c').prev('dl').find('dd a').removeClass('active').not(':first').eq(index).addClass('active');

            $(this).parents('.v-c').show();
            $(this).parent('li').show();

        }).delegate('.v-c li a:first-Child', 'click.shop', function () {
            var index = $(this).parents('.v-c').find('li').index($(this).parent('li'));
            // $('.filter').find('li dd a:not(:first)').eq(index).trigger('click');
            return false;
        });

});