define(function (require, exports, module) {

    var klass = require('sht/klass/1.0.0/klass');

    /**
     *
     * @param delay 延迟时间
     * @param fn  计时器执行函数
     *
     */

    var Timer = klass(null, {

        __construct: function (delay, fn) {
            var _this = this;
            this.delay = delay;
            this.fn = fn;
            this.currentCount = 0;
            this.running = false;
            this._run();
        },
        _run: function () {
            var _this = this;
            this.running = true;
            this.time = setInterval(
                function () {
                    _this.currentCount++;
                    _this.fn(_this.currentCount);
                }, _this.delay);
        },
        stop: function () {
            clearInterval(this.time);
            this.currentCount = 0;
            this.running = false;
        },
        pause: function () {
            if (this.running) {
                clearInterval(this.time);
            }
        },
        start: function () {
            this._run();
        },
        reset: function () {
            this.stop();
            this.start();
        }


    });

    module.exports = Timer;
});

