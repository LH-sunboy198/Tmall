import $ from './jQuery.js';
(function($) {

    $.fn.extend({
        tabs: function(options) {

            const defaults = {
                ev: 'click',
                active: 'active',
                display: 'display'
            };

            $.extend(defaults, options); // 合并对象

            // 获得元素
            let btns = this.children('ul').children('li');
            let divs = this.children('div');

            btns.on(defaults.ev, function() {
                let index = btns.index(this); // 获得索引
                $(this).not('.QR').addClass(defaults.active).siblings().removeClass(defaults.active);
                divs.eq(index).addClass(defaults.display).siblings().removeClass(defaults.display);
            });
        }
    });


})($);
export default $;