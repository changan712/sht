define(function (require, exports, module) {

    var Timer = require('sht/timer/1.0.0/timer');
    var Popup = require('arale/popup/1.1.6/popup');

    var ui = {
        /**
         * @description countDown 简单数字倒数
         * @param dom
         * @param time 倒计时长
         * @param callback 倒计时完毕后回调
         */

        countDown: function (dom, time, callback) {
            var cdTime = time / 1000,
                $dom = $(dom).eq(0);
            if (!$dom.size()) return false;

            var t = new Timer(1000, function () {
                if (cdTime) {
                    cdTime--;
                    $dom.text(cdTime);
                } else if (callback) {
                    t.stop();
                    callback();
                }
            });
            return t;
        },

        /**
         *popup简单封装；
         * @param trigger
         * @param content
         * @param opt
         * @returns {*} PopUpObject
         */

        myPopUp: function (trigger, content, opt) {

            if (!$(trigger).size() || !$(content).size()) return false;
            if ($(trigger).data('popUpRended')) return false;

            $(trigger).data('popUpRended', true).addClass('haspopup');

            var o = $.extend({
                trigger: trigger,
                element: content
            }, opt);

            var tg, arrow;
            var oP = new Popup(o);

            tg = oP.activeTrigger;
            arrow = tg.find('i').filter(function () {
                return /ui-arrow/.test(this.className);
            });

            oP.after('show', function () {
                tg.addClass('active');
                arrow.addClass('reverse');
            });
            oP.after('hide', function () {
                tg.removeClass('active');
                arrow.removeClass('reverse');
            });

            return oP;

        },
        /**
         * 设置网站图片错误后显示图片
         * @param sel {object}
         */
        setDefaultImg: function (sel) {

            var imgs = sel ? $(sel).find('img') : $('img');

            imgs.each(function(){
               this.onerror = function () {
                    this.setAttribute('src', 'http://s.shtimage.com/images/common/d1.jpg');
                };
                this.src = this.src;
            });
        }


    };

    module.exports = ui;
});