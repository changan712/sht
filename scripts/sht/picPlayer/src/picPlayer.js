define(function (require, exports, module) {

    var $ = require('$');

    module.exports = PicPlayer;

    function PicPlayer(w, time, method, id, json) {
        this.method = method;
        this.addId = id;
        this._oW = $(w);
        this.img_size = this._oW.find('img').size();
        this._sev = time;
        this.aImg = this._oW.find('img');
        //this.imgHeight = 279; //this.aImg[0].offsetHeight||
        this.iIndex = 0;
        this.init();
        this.btnControl();
    }
    PicPlayer.prototype = {

        init: function () {

            this._oW.css({
                position: 'relative'

            });
            this.crearBtn(this.img_size);
            if (this.method == 'fade') {
                this.aImg.css({
                    position: 'absolute'
                });
                this.aImg.eq(0).show().parent('a').siblings('a').find('img').hide();

            } else if (this.method == 'slide') {
                this._oW.children('a').wrapAll('<div class="w_window"><div class="scrollBox"></div></div>');
                $('.w_window').css({
                    height: '100%',
                    overflow: 'hidden'
                }).scrollTop('0');

            } else {

                alert('暂无此方法');
            }
            this.start(); //开始自动轮播
        },

        extend: function (destination, source) {
            for (var property in source) {
                destination[property] = source[property];

            }
        },

        getIndex: function () {
            return this.aImg.index(this.aImg.filter(':visible'))
        },

        options: {
            btnColor: 'red',
            ne: '#fdffff'
        },

        crearBtn: function (n) {
            var obtns = $("<div class='icBtns'></div>");
            if (!this.addId) {
                for (var i = 0; i < n; i++) {
                    obtns.append('<a href="javascript:void(0)">' + (i + 1) + '</a>');
                }
            } else {
                for (var i = 0; i < n; i++) {
                    obtns.append('<a  id=' + this.addId + (i + 1) + '>' + (i + 1) + '</a>');
                }
            }
            this._oW.append(obtns);
            this._oW.append('<div class="ic_bg"></div>');
            this.aBtn = obtns.find('a');
            obtns.css({
                position: 'absolute',
                'z-index': '100'
            });

            this.aBtn.eq(0).addClass('curr');
        },

        start: function () {
            var o = this;
            if (this.method == 'fade') {
                this.timeIn = setInterval(function () {
                    o.changeFade(o)
                }, this._sev);
            } else if (this.method == 'slide') {
                this.timeIn = setInterval(function () {
                    o.changeSlide(o)
                }, this._sev);
            }
        },

        toSliContinued: function () {
            this.slideContinued = true;
        },

        changeSlide: function (o) {
            //document.title=$('.w_window').scrollTop()
            if ($('.w_window').scrollTop() < (this.imgHeight * (this.img_size - 1))) {

                $('.w_window').animate({
                    'scrollTop': '+=' + this.imgHeight
                }, 'slow');
                this.iIndex++;
                $('.icBtns a').eq(this.iIndex).addClass('curr').siblings().removeClass('curr');

            } else {
                $('.w_window').animate({
                    'scrollTop': '0'
                }, 'slow');
                $('.icBtns a').eq(0).addClass('curr').siblings().removeClass('curr');
                this.iIndex = 0;

            }
        },

        changeFade: function (o) {
            var _this = this;
            var n;
            if (this.getIndex() < this.aImg.size() - 1) {

                this.aImg.filter(':visible').fadeOut('slow').parent('a').next().find('img').fadeIn('slow', function () {
                    n = o.getIndex();
                    _this.aBtn.eq(n).addClass('curr').siblings().removeClass('curr');
                });

            } else {

                this.aImg.filter(':visible').fadeOut('slow').end().eq(0).fadeIn('slow', function () {
                    n = o.getIndex();
                    _this.aBtn.eq(0).addClass('curr').siblings().removeClass('curr');
                });

            }
        },

        btnControl: function () {

            var o = this;
            this._oW.hover(function () {
                clearInterval(o.timeIn);


            }, function () {

                if (o.method == 'fade') {
                    clearInterval(o.timeIn);
                    o.timeIn = setInterval(function () {
                        o.changeFade(o)
                    }, o._sev);
                } else if (o.method == 'slide') {
                    o.timeIn = setInterval(function () {
                        o.changeSlide(o)
                    }, o._sev);
                }
            });
            this.aBtn.click(function () {
                var ind = o.aBtn.index(this);
                if (o.method == 'fade') {

                    o.aImg.filter(':visible').stop(true, true).fadeOut('slow');
                    o.aImg.eq(ind).stop(true, true).fadeIn('slow');

                } else if (o.method == 'slide') {
                    $('.w_window').stop(true, true).animate({
                        'scrollTop': ind * o.imgHeight
                    }, 'slow');

                }
                o.aBtn.eq(ind).addClass('curr').siblings().removeClass('curr');
                o.iIndex = ind;

            })
        }
    }

});
