define(function (require, exports, module) {

    var $ = require('$');
    //////////
    module.exports = Slider;

    function Slider(oL, oR, slideDiv) {

        this.oS = $(slideDiv);
        this.u = this.oS.find('ul').eq(0);
        this.list = this.oS.find('li');
        this.l = $(oL);
        this.r = $(oR);
        this.w = this.list.first().outerWidth(true);
        this.size = Math.ceil(this.oS.width() / this.w);
        this.index = 0;
        this._init();
    }

    Slider.prototype = {

        _init: function () {

            var _this = this;
            var initedW;
            var childSize = this.list.size();

            if (childSize <= this.size) {
                this.l.hide();
                this.r.hide();
                return this;
            }

            this.l.bind('click', function () {
                _this.toRight(_this.w);
                return false;
            });
            this.r.bind('click', function () {
                _this.toLeft(_this.w);
                return false;
            });
        },

        toLeft: function (w) {
            var _this = this;
            if (this.oS.is(':animated')) return;
            this.oS.stop(true, true).animate({
                'scrollLeft': w + 'px'
            }, 'fast', function () {
                _this.oS.find('li').eq(0).appendTo(_this.u);
                _this.oS.scrollLeft(0);
            });
        },

        toRight: function (w) {
            var _this = this;
            if (this.oS.is(':animated')) return;
            this.oS.scrollLeft(w);
            _this.oS.find('li').last().prependTo(_this.u);
            this.oS.stop(true, true).animate({
                'scrollLeft': 0
            }, 'fast');
        }

    }
});

