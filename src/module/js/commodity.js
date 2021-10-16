import $ from './library/jquery-tabs.js';
import cookie from './library/cookie.js'

$('.tabs-products').tabs({
    ev: 'mouseenter',
    active: 'choose',
    display: 'displayed'
});
let arr = Array.from($('.tabs-products>div'))
console.log($('.tabs-products>div'));
console.log(arr);
let count = parseInt($('.buy>dl>dd:first').text());
console.log(count);

$('.buy>dl>dd:last>p:first').on('click', function() {
    if (count >= 1) {
        count++;
        $('.buy>dl>dd:first').text(`${count}`);
    }
});
$('.buy>dl>dd:last>p:last').on('click', function() {
    if (count > 1) {
        count--;
        $('.buy>dl>dd:first').text(`${count}`);
    }
});

let id = location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../../../tianmaoInterface/product/interface/get-commodity.php",
    data: { id },
    dataType: "json"
}).then(res => {
    console.log(res);
    let picture = JSON.parse(res.picture);
    Array.from($('.tabs-products>div')).forEach((elm, i) => {
        console.log($(elm));
        $(elm).children('img').attr('src', `${picture[i].src}`);
    });
    Array.from($('.tabs-products>ul>li')).forEach((elm, i) => {
        $(elm).children('img').attr('src', `${picture[i].src}`);
    });
    $('.product-price>dl>dd:last').text(`${parseFloat(res.price).toFixed(1)}`);
    console.log(res.id);
    $('.add-shopping').on('click', function() {
        let shopNum = parseInt($('.buy>dl>dd:first').text());
        addShopping(res.id, shopNum);
        alert("添加成功");
        console.log("添加成功");
    });

}).catch(xhr => {
    console.log(xhr.status);
});





// cookie中存储的数据是 字符串类型
// 在cookie中存储 json字符串
// shop=[{"id":100001,"num":5},{"id":100003,"num":1}]

// 不管购物车中的商品有几种 都存储 JSON字符串(数组形式)
function addShopping(id, num) {
    // 获取购物车数据

    let shop = cookie.get('shop');
    let product = { id, num };

    if (shop) { // 判断是否已经有属性
        shop = JSON.parse(shop); // cookie中已经有数据情况 将数据转成数组
        // shop.push(product);

        // 判断当前商品在购物车数据中是否已经存在 如果存在则修改数量 不存在则添加
        if (shop.some(el => el.id == id)) {
            let index = shop.findIndex(elm => elm.id == id); // 获得当前商品id在数组中的索引
            let count = parseInt(shop[index].num); // 获得当前数量
            count += parseInt(num);
            shop[index].num = count;
        } else {
            shop.push(product);
        }


    } else {
        shop = [];
        shop.push(product);
    }

    cookie.set('shop', JSON.stringify(shop), 1);

}