define(function (require, exports, module) {

    require('seajs/seajs-style/1.0.2/seajs-style');
   // var Popup = require('arale/popup/1.1.6/popup');
    var Tip = require('arale/tip/1.2.1/tip');
    /////var ui = require('sht/ui/1.0.0/ui');
    require('sht/ui/1.0.0/fn');

    //搜索
    if ($('#J_Keyword').length) {
        var Search = require('sht/search/1.0.0/search');
        //头部search  功能
        // 如无 'dataSource' 参数， 仅简单输入跳转功能；
        (function () {
            var isGoodsPage = /yb.shenghuo.com\/goods/.test(location.href);
            var searchDataUrl = isGoodsPage ? 'http://yb.shenghuo.com/goods/search' : 'http://yb.shenghuo.com/shop/search',
                searchUrl = isGoodsPage ? 'http://yb.shenghuo.com/goods/index' : 'http://yb.shenghuo.com/shop/index';

            var searcher = new Search({
                searchInput: '.header .search-key',
                searchBtn: '.header .search-btn',
                url: searchUrl,
                filter: 'stringMatch',
                locator: 'data',
                className: 'ui-searchac',
                width: 500,
                dataSource: function (value) {
                    var _this = this;
                    $.getJSON(searchDataUrl + '?keyword=' + encodeURI(value), function (data) {
                        _this.trigger('data', data);
                    })
                }
            });
            exports.searcher = searcher;

        }());
    }


    var Placeholder = require('sht/placeholder/1.0.0/placeholder');
    Placeholder.init();

    //浏览器识别 jquery静态属性扩展 以杜绝部分jquery插件 在jquery1.8以上版本因为无$.browser对象报错；
    (function () {
        if (!$.browser) {
            var ua = navigator.userAgent.toLowerCase();
            $.browser = {};
            $.browser.mozilla = /firefox/.test(ua);
            $.browser.webkit = /webkit/.test(ua);
            $.browser.opera = /opera/.test(ua);
            $.browser.msie = /msie/.test(ua);
        }

        $.isIE6 = window.XMLHttpRequest ? false : true;
        $.isIE = document.all ? true : false;

    }());

    var shtAPR = ({
        _initialize: function () {
            this.formInit();
            this.myTit();
            //this.setDefaultImg();
            // this.myCommonPopUp();
            this.setConMinHeight();
            this.disableSelection();
            this.backTop();

            return this;
        },

        //禁止选中
        disableSelection: function () {
            if ($.browser.msie) {
                $(document).delegate('.ui-btn,.ui-noselect', 'selectstart', function () {
                    return false;
                });
            }
        },

        //回到顶部
        backTop: function () {
            if ($(document.body).data('scrollTopInit')) return;
            if ($(document.body).height() < 1.5 * $(window).height()) return;
            var bd = $(document.body),
                ht = $(document.documentElement),
                template = '<div id="J_toTop" class="ui-backtop" title="返回顶部"><i class="iconfont">&#x3459;</i></div>' ,
                time = null,
                bkbtn;

            bd.data('scrollTopInit', true);
            bd.append(template);
            bkbtn = $('#J_toTop').hide();

            bkbtn.on('click', function () {
                if (bd.scrollTop()) {
                    bd.animate({'scrollTop': 0}, 'fast')
                }
                if (ht.scrollTop()) {
                    ht.animate({'scrollTop': 0}, 'fast')
                }
            });

            $(window).on('scroll', function () {
                if (time) return;
                time = setTimeout(function () {
                    if (bd.scrollTop() > 200 || ht.scrollTop() > 200) {
                        bkbtn.fadeIn('fast');
                    } else {
                        bkbtn.fadeOut('fast');
                    }
                    clearTimeout(time);
                    time = null;
                }, 50);
            })
        },
        //textarea 自动高度  select模拟
        formInit: function () {
            $('textarea').textareaAutoHeight();
            $('select:not(.nosim)').mySelect();
            // $('[type = checkbox]:not(.nosim)').myCheckbox();
        },

        //自定义tip
        myTit: function () {

            $('[sht-title]').each((function () {
                new Tip({
                    trigger: this,
                    content: $(this).attr('sht-title'),
                    arrowPosition: 7,
                    theme: 'white',
                    inViewport: true
                }).hide();
                // $(this).attr('title', '');
            }));
        },

        //导航切换城市  app下载 popup
        myCommonPopUp: function () {

            ui.myPopUp('#J_topMenuApp_trigger', '#J_topMenuApp_popup');
            ui.myPopUp('.change-city', '#change-city-popup');

        },
        //页面最小高度
        setConMinHeight: function () {
            var con = $('body>.container'),
                tp = $('body>.header'),
                bt = $('body>.bottom'),
                h = tp.outerHeight(true) + bt.outerHeight(true) + parseFloat(con.css('marginTop')) + parseFloat(con.css('marginBottom')) + parseFloat(con.css('paddingTop')) + parseFloat(con.css('paddingBottom')) + parseFloat(con.css('borderTopWidth')) + parseFloat(con.css('borderBottomWidth'));

            con.css({
                'minHeight': document.documentElement.clientHeight - h + 'px'
            });

            if ($.isIE6) {
                con.css({
                    'height': document.documentElement.clientHeight - h + 'px'
                });
            }

            $(window).bind('resize.shtapr', function () {

                if (time) return;
                var time = setTimeout(function () {
                    con.css({
                        'minHeight': document.documentElement.clientHeight - h + 'px'
                    });
                    if ($.isIE6) {
                        con.css({
                            'height': document.documentElement.clientHeight - h + 'px'
                        });
                    }
                    clearTimeout(time);
                    time = null;
                }, 10);

            });
        }
    })._initialize();

    exports.shtAPR = shtAPR;

});