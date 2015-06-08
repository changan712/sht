define(function (require, exports, module) {

    var $ = require('$');
    require('../common/jquery.mousewheel.js');


    var Carousel = require('arale/switchable/1.0.2/carousel-debug');

    /*  (function () {
     $(document).on('ajaxComplete', function (e) {
     ui.setDefaultImg(e.target);
     });
     ui.setDefaultImg('.t-list');
     }());*/

    var cs = new Carousel({
        element: '#J_carousel',
        effect: 'scrolly',
        autoplay: true,
        triggerType: 'click',
        easing: 'easeOut'
    }).render();

    $('#J_carousel').on('mousewheel', function (event) {
        if (!cs.anim) {
            if (event.deltaY > 0) {
                cs.next();
            } else {
                cs.prev();
            }
        }
        return false;
    });

    $('.dl-box .close').on('click', function () {
        $('.dl-box').animate({bottom:'-300px'},200);
    });
    return cs;
});
