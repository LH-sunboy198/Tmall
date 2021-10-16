import $ from './library/jquery-tabs.js'

// console.log($('.main-menu>div'));
$('.nav-top-right>ul>li').on({
    mouseenter: function() {
        let div = this[0];
        // console.log($(`${this[0]}:has(a)`));
        // $(`${div}:has(a)`).css('color', 'red');
        console.log(this);
        $(this).children('.main-menu').children('.menu-content').addClass('displayed');
    },
    mouseleave: function() {
        $(this).children('.main-menu').children('.menu-content').removeClass('displayed');
    }
});
$('.tabs').tabs({
    ev: 'mouseenter',
    active: 'choose',
    display: 'displayed'
});
$('.menu-left>li').on('mouseleave', function() {
    let _index = $('.menu-left>li').index(this);
    // console.log(_index);
    $(this).removeClass('choose');
    $('.menu-right').eq(_index).removeClass('displayed')

});

$.ajax({
    type: "get",
    url: "../../../tianmaoInterface/product/interface/get-products.php",
    dataType: "json",
}).then((res) => {
    console.log(res);
    // let str = '[{"你好":"世界"}]';

    // let template = '';
    res.forEach((ele, i) => {
        let picture = JSON.parse(ele.picture);
        $(`.section4-right>ul>li:eq(${i})>a>img`).attr('src', `${picture[0].src}`);
        $(`.section4-right>ul>li:eq(${i})>a>p`).text(`${ele.title}`);
        $(`.section4-right>ul>li:eq(${i})>a>span`).text(`￥${ele.price}`);
        $(`.section4-right>ul>li:eq(${i})>a`).attr('href', `./commodity.html?item=${ele.id}`);
    });
}).catch(xhr => {
    console.log(xhr);
})