define("sht/pnumview/1.0.0/pnumview-debug", [ "sht/klass/1.0.0/klass-debug", "arale/overlay/1.1.4/overlay-debug" ], function(require, exports, module) {
    var Klass = require("sht/klass/1.0.0/klass-debug");
    var Overlay = require("arale/overlay/1.1.4/overlay-debug");
    /**
     * class Pnumview
     * @type {Function}
     * @constructor
     *      调用 var a  = new Pnumview('#input');   
     *      var num =  a.createBigNumView();
     *      num.element.html('11111111');
     *      num.show();
     */
    var Pnumview = Klass(null, {
        /**
         * @param input {String} jquery表达式
         */
        __construct: function(input) {
            this.input = $(input);
        },
        /**
         * 新建输入号码放大视图
         * @returns {Object}  Overlay 实例对象 具有show hide方法;element属性指向对象dom节点
         */
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
        /**
         * 新建信息提示框视图
         * @returns {Object}  Overlay 实例对象 具有show hide方法;element属性指向对象dom节点
         */
        createInfoView: function() {
            var _this = this;
            return new Overlay({
                template: '<div id="infoview"></div>',
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
        /**
         * 为号码添加分隔符 如：182-1111-2222
         * @param value {String}
         * @returns {String}
         */
        setDlForNum: function(value) {
            if (value.length > 3 && value.length <= 7) {
                return value.replace(/^(\d{3})/, "$1-");
            } else if (value.length > 7) {
                return value.replace(/^(\d{3})(\d{4})/, "$1-$2-");
            } else {
                return value;
            }
        }
    });
    module.exports = Pnumview;
});
