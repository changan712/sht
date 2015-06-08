define("sht/tab/1.0.0/tab-debug", [], function(require, exports, module) {
    //var $ = require('jquery/1.9.1/jquery');
    module.exports = Tab;
    function Tab(h, con, m) {
        this.h = $(h);
        this.con = $(con);
        this.method = m ? m : "mouseover";
        this.init();
    }
    Tab.prototype = {
        init: function() {
            this.con.hide().eq(0).show();
            var _this = this;
            this.h.bind(this.method, function() {
                _this.n = _this.h.index($(this));
                _this.h.removeClass("curr active");
                $(this).addClass("curr active");
                _this.con.hide().eq(_this.n).show();
                return false;
            });
        }
    };
});
