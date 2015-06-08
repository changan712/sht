define(function (require, exports, module) {


    var Carousel = require('arale/switchable/1.0.2/carousel');

  /*  (function () {
        $(document).on('ajaxComplete', function (e) {
            ui.setDefaultImg(e.target);
        });
        ui.setDefaultImg('.t-list');
    }());*/

     new Carousel({
        element: '#i-carousel',
        effect: 'fade',
        autoplay: true,
         triggerType:'click'
     }).render();

});
