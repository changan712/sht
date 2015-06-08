define(function (require, exports, module) {
    //nav view
    (function () {
        var nav = $('.nav');
        nav.find('li:has(ul)').addClass('haschild').find('>a').on('click', function () {
            var ul = $(this).next('ul');
            if (ul.is(':visible')) {
                ul.hide();
                $(this).find('.arrow').removeClass().addClass('arrow ui-arrow-up');
            } else {
                ul.show();
                $(this).find('.arrow').removeClass().addClass('arrow ui-arrow-down');
            }
            return false;
        });

        nav.find('ul a').on('click', function (e) {
            e.stopPropagation();
        });

}());

});
