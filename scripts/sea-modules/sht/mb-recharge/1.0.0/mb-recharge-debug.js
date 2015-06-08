define("sht/mb-recharge/1.0.0/mb-recharge-debug", [ "http://yb.shenghuo.com/js/common-debug", "arale/overlay/1.1.4/overlay-debug", "arale/autocomplete/1.2.3/autocomplete-debug", "arale/tip/1.2.1/tip-debug", "arale/cookie/1.0.2/cookie-debug" ], function(require, exports, module) {
    var commonMod = require("http://yb.shenghuo.com/js/common-debug.js");
    var Overlay = require("arale/overlay/1.1.4/overlay-debug");
    var AutoComplete = require("arale/autocomplete/1.2.3/autocomplete-debug");
    var Tip = require("arale/tip/1.2.1/tip-debug");
    var Cookie = require("arale/cookie/1.0.2/cookie-debug");
    var mb = {
        init: function() {
            this.mobile_amount_user = false;
            this.input = $("#J_p-num-input");
            this.con = $(".tbr-phpne").eq(0);
            this.select = $("#J_phone-amount-list").data("select");
            this.selectHd = $(".service .aui-select-wrap");
            this.sbmBtn = $("#J_mobile-btn");
            this.discount = $("#J_mobile-discount-price");
            this.historyIc = this.con.find(".ic-contacts").eq(0);
            this.noHistoryTip = this.createNoHistoryTips();
            this.historyDiv = $("#J_phone-list");
            this.hasHistry = false;
            this.numCorrect = false;
            this.errcode = true;
            this.maxlength = 11;
            this.bigNum = this.createBigNumView();
            this.dc = {
                10: "9.8 - 10",
                20: "19.6 - 20",
                30: "29.4 - 30",
                50: "49 - 49.8",
                100: "98 - 99.5",
                200: "196 - 199",
                300: "294 - 299",
                500: "490 - 498",
                1e3: "980 -990"
            };
            //this.selectHd.disable();
            this.infoTip = this.createInfoView();
            this.input.attr({
                maxlength: this.maxlength,
                autocomplete: "off"
            });
            this.input.on("keyup", $.proxy(this.onkeyupInput, this));
            this.select.on("change", $.proxy(this.onChangeSelect, this));
            this.sbmBtn.on("click", $.proxy(this.sbm, this));
            $(this).on("notover", $.proxy(this.onnotOver, this));
            $(this).on("historyready", this.createHistoryListView);
            if (this.input.length == 11) {
                this.updateView();
            }
            this.createSubmitList();
            this.bigNumView();
        },
        createSubmitList: function() {
            var list = Cookie.get("_HISTORYPHONENUMLIST") ? $.parseJSON(decodeURI(Cookie.get("_HISTORYPHONENUMLIST"))) : [];
            var html = "";
            var _this = this;
            if (list.length) {
                $.each(list, function(index, value) {
                    html += "<li>" + value + "</li>";
                });
                _this.historyDiv.html(html);
                _this.createHistoryListView();
            }
        },
        createHistoryListView: function(e, mod) {
            var _this = this;
            ///如有历史记录
            if (this.historyDiv.size() && this.historyDiv.find("li").size()) {
                var historyData = this.createHistoryData();
                this.hasHistry = true;
                if (this.oA) this.oA.destroy();
                var oA = this.oA = this.creatAo(historyData);
                this.noHistoryTip.destroy();
                this.historyIc.css({
                    cursor: "pointer"
                });
                this.historyIc.on("click", function() {
                    if (historyData.length) {
                        _this.historyDiv.show();
                        _this.bigNum.hide();
                        return false;
                    }
                });
                $(document).on("click", function() {
                    _this.historyDiv.hide();
                });
                this.historyDiv.delegate("li", "click", function() {
                    _this.input.val($.trim($(this).text()));
                    _this.historyDiv.hide();
                    _this.updateView();
                });
                return oA;
            }
        },
        //无历史记录提示框；
        createNoHistoryTips: function() {
            this.historyIc.css({
                cursor: "default"
            });
            var _this = this;
            return new Tip({
                trigger: _this.historyIc,
                content: "无最近充值记录",
                arrowPosition: 1,
                theme: "blue",
                inViewport: true
            }).hide();
        },
        //输入放大提示
        bigNumView: function() {
            $(document).on("click", $.proxy(function() {
                this.bigNum.hide();
            }, this));
            this.input.on("click", $.proxy(function() {
                if (this.input.val().length && this.input.val().length < 11) {
                    this.bigNum.show().element.html(this.setDlForNum(this.input.val()));
                    return false;
                }
            }, this));
            this.bigNum.on("click", function() {
                return false;
            });
            $(this).on("over", $.proxy(function() {
                this.bigNum.hide();
            }, this));
        },
        setDlForNum: function(value) {
            if (value.length > 3 && value.length <= 7) {
                return value.replace(/^(\d{3})/, "$1-");
            } else if (value.length > 7) {
                return value.replace(/^(\d{3})(\d{4})/, "$1-$2-");
            } else {
                return value;
            }
        },
        createBigNumView: function() {
            var _this = this;
            return new Overlay({
                template: '<div id="bignum"></div>',
                className: "ui-bignum",
                style: {
                    border: "1px solid #B9C8D3",
                    padding: "0 10px",
                    "line-height": "26px",
                    background: "#F8FCFF",
                    "font-weight": "bold",
                    "font-size": "14px",
                    color: "#f60",
                    width: _this.input.outerWidth() - 22
                },
                align: {
                    selfXY: [ 0, 0 ],
                    baseElement: _this.input,
                    baseXY: [ 0, "100%" ]
                }
            }).hide().set("zIndex", 98);
        },
        //autocomplete 提示
        creatAo: function(data) {
            var _this = this;
            if (this.oA) this.oA.destroy();
            var oA = new AutoComplete({
                trigger: _this.input,
                dataSource: data,
                selectFirst: true,
                className: "mb-oa",
                width: _this.input.innerWidth()
            }).render();
            oA.before("show", function() {
                _this.bigNum.hide();
            });
            oA.on("itemSelect", function() {
                _this.updateView();
            });
            return oA;
        },
        updateView: function() {
            var num = $.trim(this.input.val()), prize = $.trim(this.select.get("value")), _this = this;
            if (num.length < 11) return;
            this.fetchData(num, prize, function(model, discount, info) {
                _this.rerenderSelect(model);
                _this.rerenderDiscount(discount);
                if (_this.input.is(":visible")) {
                    _this.infoTip.show().element.html(info);
                }
            });
        },
        //提示框视图
        createInfoView: function() {
            var _this = this;
            return new Overlay({
                template: '<div id="infoview">号码信息未知</div>',
                height: 26,
                style: {
                    border: "1px solid #ffbb76",
                    padding: "0 10px",
                    "line-height": "26px",
                    background: "#fffcef",
                    color: "#de7c22"
                },
                align: {
                    selfXY: [ 0, "100%+2" ],
                    baseElement: _this.input,
                    baseXY: [ 0, 0 ]
                }
            }).render();
        },
        createHistoryData: function() {
            var aData = [];
            this.historyDiv.find("li").each(function() {
                aData.push($.trim($(this).text()));
            });
            return aData;
        },
        disableView: function() {
            this.defaulteDiscount();
        },
        onnotOver: function() {
            this.infoTip.hide();
            this.defaulteDiscount();
        },
        onkeyupInput: function(e) {
            var time = null;
            var _this = this;
            var value = this.input.val();
            //如果光标移动键
            if (e.keyCode == 37 || e.keyCode == 39) {
                return;
            }
            //如果非数字
            if (value.match(/\D/)) {
                this.input.val(value.replace(/\D/g, ""));
            }
            if (!this.input.val().length || this.input.val().length == this.maxlength) {
                this.bigNum.hide();
                this.oA && this.oA.hide();
            } else {
                _this.bigNum.show().element.html(_this.setDlForNum(_this.input.val()));
                this.numCorrect = false;
            }
            //如果用退格键
            if (e.keyCode == 8) {
                $(this).trigger("notover");
                return;
            }
            if (this.input.val().length == this.maxlength) {
                this.updateView();
                $(this).trigger("over");
            } else {
                this.disableView();
                $(this).trigger("notover");
            }
        },
        onChangeSelect: function() {
            if (this.numCorrect) {
                this.updateView();
            } else {
                this.defaulteDiscount();
            }
        },
        defaulteDiscount: function() {
            var text = this.dc[this.select.get("value")];
            this.discount.text(text);
        },
        disableSelect: function() {
            this.selectHd.disable();
        },
        rerenderDiscount: function(discount) {
            if (discount > 0) {
                this.discount.text((discount / 100).toFixed(2));
            } else {
                this.defaulteDiscount();
            }
        },
        rerenderSelect: function(model) {
            this.select.syncModel(model);
        },
        sbm: function() {
            if (this.errcode == false) return;
            var mobile = $.trim(this.input.val());
            var amount = $.trim(this.select.get("value"));
            if (/\d{11}/.test(mobile) && amount > 0 && this.numCorrect) {
                location.replace("https://pay.shenghuo.com/bill/recharge?mobile=" + mobile + "&amount=" + amount);
            } else {
                this.infoTip.show().element.html("请确认号码输入是否正确");
            }
        },
        fetchData: function(mobile, amount, callback) {
            var model = [], info = "号码信息未知", show_price = 0, discount = 0, _this = this;
            var querys = {
                mobile: mobile,
                with_amount: 1,
                with_amount_selected: 1
            };
            amount *= 100;
            commonMod.getMobileAttribution(querys, function(ret) {
                if (ret.data && ret.data.isp) {
                    info = $.trim(ret.data.isp);
                }
                if (ret.errcode == 0 && ret.data && ret.data.price_list && ret.data.price_list.length > 0) {
                    //correct response
                    $.each(ret.data.price_list, function(k, price) {
                        show_price = price.show_price / 100;
                        var tmpObj = {
                            value: show_price,
                            text: show_price + "元"
                        };
                        if (amount == price.show_price) {
                            amount_exists = true;
                            discount = price.price;
                            tmpObj["selected"] = "true";
                        }
                        model.push(tmpObj);
                    });
                    _this.numCorrect = true;
                    _this.errcode = true;
                    callback(model, discount, info);
                } else if (ret.errcode > 0 && ret.errmsg.length < 40) {
                    _this.numCorrect = false;
                    _this.errcode = false;
                    _this.infoTip.show().element.html(ret.errmsg);
                } else {
                    _this.numCorrect = false;
                    _this.errcode = false;
                    _this.infoTip.show().element.html("未知错误！请稍后重试");
                }
            });
        }
    };
    mb.init();
    module.exports = mb;
});
