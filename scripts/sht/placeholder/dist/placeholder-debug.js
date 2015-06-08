define("sht/placeholder/1.0.0/placeholder-debug", [], function(require, exports, module) {
    var PlaceHolder = {
        _support: function() {
            return "placeholder" in document.createElement("input");
        }(),
        // 提示文字的样式，需要在页面中其他位置定义
        className: "placeholder",
        init: function() {
            if (!this._support) {
                var inputs = $("input");
                this.create(inputs);
            }
        },
        create: function(inputs) {
            inputs.each(function() {
                if (!PlaceHolder._support && $(this).val() == "" && $(this).attr("placeholder") != undefined) {
                    if ($(this).is(":password")) {
                        PlaceHolder._isPassword($(this));
                    } else {
                        PlaceHolder._setValue($(this));
                        $(this).focus(function() {
                            if ($(this).val() === $(this).attr("placeholder")) {
                                $(this).val("").css("color", "graytext");
                            }
                        });
                        $(this).blur(function() {
                            if ($(this).val() === "") {
                                PlaceHolder._setValue($(this));
                            }
                        });
                    }
                }
            });
        },
        _isPassword: function(input) {
            var pwdField = input.hide();
            pwdField.after('<input class="pwdPlaceholder" style="border: 1px solid #ddd;" type="text" value=' + pwdField.attr("placeholder") + ' autocomplete="off" />');
            var pwdPlaceholder = $(".pwdPlaceholder").css({
                height: pwdField.height(),
                width: pwdField.width(),
                color: "graytext",
                marginLeft: pwdField.css("marginLeft"),
                marginRight: pwdField.css("marginRight"),
                marginTop: pwdField.css("marginTop"),
                marginBottom: pwdField.css("marginBottom"),
                paddingLeft: pwdField.css("paddingLeft"),
                paddingRight: pwdField.css("paddingRight"),
                paddingTop: pwdField.css("paddingTop"),
                paddingBottom: pwdField.css("paddingBottom"),
                fontSize: pwdField.css("font-size"),
                lineHeight: "1.3"
            }).show();
            pwdPlaceholder.focus(function() {
                pwdPlaceholder.hide();
                pwdField.show().focus();
            });
            pwdField.blur(function() {
                if (pwdField.val() == "") {
                    pwdPlaceholder.show();
                    pwdField.hide();
                }
            });
        },
        _setValue: function(input) {
            input.val(input.attr("placeholder")).css("color", "graytext");
        }
    };
    module.exports = PlaceHolder;
});
