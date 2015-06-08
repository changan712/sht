define("sht/ui/1.0.0/fn-debug", [ "arale/popup/1.1.6/popup-debug", "$-debug", "arale/overlay/1.1.4/overlay-debug", "arale/position/1.0.1/position-debug", "arale/iframe-shim/1.0.2/iframe-shim-debug", "arale/widget/1.1.1/widget-debug", "arale/base/1.1.1/base-debug", "arale/class/1.1.0/class-debug", "arale/events/1.1.0/events-debug", "arale/select/0.9.9/select-debug", "arale/templatable/0.9.2/templatable-debug", "gallery/handlebars/1.0.2/handlebars-debug", "gallery/handlebars/1.0.2/runtime-debug" ], function(require, exports, module) {
    /**
     * @description jquery prototype extends
     */
    var Popup = require("arale/popup/1.1.6/popup-debug");
    var Overlay = require("arale/overlay/1.1.4/overlay-debug");
    var Widget = require("arale/widget/1.1.1/widget-debug");
    var Select = require("arale/select/0.9.9/select-debug");
    var cacheWidget = {};
    module.exports = $;
    $.fn.disable = function() {
        return this.each(function() {
            console.log($.isIE, $.isIE6);
            if (!$(this).is(":visible")) return;
            if (this.bDisable) return;
            if (this.hasOwnProperty("disable")) {
                $(this).attr("disable");
            }
            var tempObj = new Overlay({
                width: $(this).outerWidth(),
                height: $(this).outerHeight(),
                zIndex: 9001,
                className: "ui-disable-mask",
                align: {
                    baseElement: "body",
                    selfXY: [ 0, 0 ],
                    baseXY: [ $(this).offset().left, $(this).offset().top ]
                },
                style: {
                    background: "#fff",
                    opacity: .1
                }
            }).show();
            $(this).addClass("disable");
            cacheWidget[tempObj.cid] = tempObj;
            this.cid_disable_Point = tempObj.cid;
            this.bDisable = true;
        });
    };
    $.fn.enable = function() {
        return this.each(function() {
            if (this.hasOwnProperty("disable")) {
                $(this).removeAttr("disable");
            }
            if (cacheWidget && cacheWidget[this.cid_disable_Point]) {
                cacheWidget[this.cid_disable_Point].element.remove();
                delete cacheWidget[this.cid_disable_Point];
            }
            $(this).removeClass("disable");
            this.bDisable && (this.bDisable = false);
        });
    };
    /**
     * @description class LoadingOverlay
     */
    var LoadingOverlay = Overlay.extend({
        attrs: {
            template: '<img class="ui-loading" src="../../images/common/loading.gif">',
            zIndex: 9009,
            width: 16,
            height: 16,
            position: "absolute",
            align: {
                selfXY: [ "50%", "50%" ],
                baseXY: [ "50%", "50%" ]
            }
        },
        _onRenderZIndex: function(val) {
            this.element.css("zIndex", val);
        },
        _onRenderPosition: function(val) {
            this.element.css("position", val);
        },
        setup: function() {
            LoadingOverlay.superclass.setup.apply(this, arguments);
            this.render();
            this.show();
        }
    });
    /**
     * @description 为选择元素添加loading 效果
     */
    $.fn.loading = function() {
        return this.each(function() {
            var _this = this;
            if (this.bLoadding) return;
            var tempObj = new LoadingOverlay({
                align: {
                    baseElement: _this
                }
            });
            $(this).disable();
            cacheWidget[tempObj.cid] = tempObj;
            this.cid_loading_Point = tempObj.cid;
            this.bLoadding = true;
        });
    };
    $.fn.removeLoading = function() {
        return this.each(function() {
            if (cacheWidget && cacheWidget[this.cid_loading_Point]) {
                cacheWidget[this.cid_loading_Point].element.remove();
                delete cacheWidget[this.cid_loading_Point];
            }
            $(this).enable();
            this.bLoadding && (this.bLoadding = false);
        });
    };
    /**
     * 上传按钮美化
     * @param template 包裹html 默认 <a class="ui-btn btn-upload ">上传</a>
     * @returns {each|*|each}
     */
    $.fn.uploader = function(template) {
        return this.each(function() {
            $(this).attr("im", true);
            var _this = this;
            var btn, inp, box;
            var h = $(this).height();
            $(this).css({
                position: "absolute",
                opacity: "0",
                height: "30px"
            }).attr("size", "1").wrap(template || '<a class="ui-btn btn-upload ">上传</a>');
            btn = $(this).parents("a").css({
                position: "relative"
            });
            box = $(this).parents(".uploader");
            box.prepend('<input type="text" class="inp_txt w200">');
            inp = box.find(".inp_txt").css({
                marginRight: "10px"
            });
            btn.bind("mousemove", function(e) {
                $(_this).css({
                    left: parseInt(e.pageX - $(this).offset().left) - $(_this).width() + 10 + "px",
                    top: parseInt(e.pageY - $(this).offset().top) - 5 + "px"
                });
            });
            $(this).bind("change", function() {
                inp.val($(this).val());
            });
        });
    };
    /**
     *popUp jquery 原型简单扩展
     * @param content popup 内容
     * @param opt  其它参数
     * @returns {*} this
     */
    $.fn.myPopUp = function(content, opt) {
        if (!$(content).size()) return false;
        if ($(this).data("popUpRended")) return false;
        $(this).data("popUpRended", true).addClass("haspopup");
        var o = $.extend({
            trigger: this,
            element: content
        }, opt);
        var tg, arrow;
        var oP = new Popup(o);
        tg = oP.activeTrigger;
        arrow = tg.find("i").filter(function() {
            return /ui-arrow/.test(this.className);
        });
        oP.after("show", function() {
            tg.addClass("active");
            arrow.addClass("reverse");
        });
        oP.after("hide", function() {
            tg.removeClass("active");
            arrow.removeClass("reverse");
        });
        $(this).data("popUp", oP);
        return this;
    };
    /**
     * checkbox 模拟
     * @returns {each|*|each}
     */
    $.fn.myCheckbox = function() {
        return this.each(function() {
            if (!$(this).is("[type= checkbox]") || $(this).data("rended")) return;
            var _this = this;
            $(this).wrap('<i class="aui-chechbox-wrap"></i>');
            this.con = $(this).parent("i");
            if ($(this).prop("checked")) {
                this.con.addClass("aui-chechbox-ckd");
            }
            $(this).on("change", function() {
                if ($(this).prop("checked")) {
                    _this.con.addClass("aui-chechbox-ckd");
                } else {
                    _this.con.removeClass("aui-chechbox-ckd");
                }
            });
            $(this).data("rended", true);
        });
    };
    /**
     * select 模拟
     * @returns {each|*|each}
     */
    $.fn.mySelect = function() {
        return this.each(function() {
            if (!$(this).is("select") || $(this).data("rended")) return;
            var _this = this;
            var tempObj = new Select({
                trigger: this,
                classPrefix: "aui-select"
            }).render();
            var trigger = $(this).next(".aui-select-trigger");
            trigger.wrap('<span class="aui-select-wrap"></span>');
            this.con = trigger.parent(".aui-select-wrap");
            trigger.after('<span><i class="ui-arrow-down"></i></span>');
            this.btn = this.con.find("span");
            this.btn.on("click", function() {
                $(".aui-select").hide();
                tempObj.show();
                return false;
            });
            tempObj.after("show", function() {
                _this.con.addClass("aui-select-wrap-active");
                tempObj._relativeElements[1].addClass("aui-select-active");
            });
            tempObj.after("hide", function() {
                _this.con.removeClass("aui-select-wrap-active");
                tempObj._relativeElements[1].removeClass("aui-select-active");
            });
            $(this).data("select", tempObj);
            $(this).data("rended", true);
        });
    };
    /**
     *placeholder
     * @returns {each|*|each}
     */
    $.fn.myPlaceholder = function() {
        return this.each(function() {
            $(this).wrap('<span class="formText_con"></span>').before("<label>" + $(this).attr("txt") + "</label>");
            var con = $(this).parent(".formText_con");
            var label = con.find("label");
            var o = con.find("input,textarea");
            var lh;
            if ($(this).is("input")) {
                lh = o.outerHeight();
            } else if ($(this).is("textarea")) {
                lh = 30;
            }
            setStyle(this);
            if (o.val()) {
                label.hide();
            }
            label.bind("click", function() {
                o.focus();
            });
            o.bind("kewdown", function() {
                if (o.val().length) {
                    label.hide();
                } else {
                    label.show();
                }
            });
            o.bind("focus", function() {
                label.css({
                    color: "#ccc"
                });
            });
            o.bind("blur", function() {
                if (o.val().length == 0) {
                    label.show();
                    label.css({
                        color: ""
                    });
                }
            });
            function setStyle() {
                o.css("float", "left");
                o.parent(".formText_con").css({
                    position: "relative",
                    display: "inline-block",
                    verticalAlign: "middle",
                    width: o.outerWidth() + "px",
                    height: o.outerHeight() + "px"
                }).end().prev("label").css({
                    position: "absolute",
                    height: o.outerHeight() + "px",
                    lineHeight: lh + "px",
                    left: "8px",
                    top: 0
                });
            }
        });
    };
    $.fn.resizeImage = function(b, c) {
        return this.each(function() {
            var d = $(this)[0], f = d.width, e = d.height;
            if (!(f <= b && e <= c)) if (f <= b && e > c) d.width = f * c / e, d.height = c; else if (f > b && e <= c) d.width = b, 
            d.height = e * b / f; else if (d.width = b, d.height = e * b / f, e * b / f > c) d.width = f * c / e, 
            d.height = c;
        });
    };
    /**
     * textarea 自动高度；
     */
    $.fn.textareaAutoHeight = function() {
        var b = this, c = b.outerHeight();
        b.bind("keyup input propertychange focus", function() {
            0 > c && (c = b.outerHeight());
            ($.browser.mozilla || $.browser.safari) && b.height(c);
            var d = b[0].scrollHeight, f = d < c ? c : d, f = f < 1.5 * c ? c : d;
            b.height(f);
        });
    };
    /**
     * @description 在光标位置插入字符
     * @param b {String} 被插入的字符串
     */
    $.fn.insertAtCursor = function(b) {
        var c = $(this)[0];
        if (document.selection) {
            this.focus();
            sel = document.selection.createRange();
            sel.text = b;
            this.focus();
        } else if (c.selectionStart || "0" == c.selectionStart) {
            var d = c.selectionStart, f = c.selectionEnd, e = c.scrollTop;
            c.value = c.value.substring(0, d) + b + c.value.substring(f, c.value.length);
            this.focus();
            c.selectionStart = d + b.length;
            c.selectionEnd = d + b.length;
            c.scrollTop = e;
        } else {
            this.value += b;
            this.focus();
        }
    };
});
