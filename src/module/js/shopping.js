import $ from './library/jquery-tabs.js';
import cookie from './library/cookie.js';




//请求数据从数据库提取数据进行页面渲染
let shop = cookie.get('shop');


if (shop) {

    shop = JSON.parse(shop);

    let idList = shop.map(el => el.id).join();

    // console.log(idList);

    $.ajax({
        type: 'get',
        url: '../../../tianmaoInterface/product/interface/get-shop.php',
        data: {
            idList
        },
        dataType: 'json'
    }).then(res => {
        // console.log(res);

        let template = '';

        res.forEach((el, i) => {
            let picture = JSON.parse(el.picture);

            let current = shop.filter(elm => elm.id === el.id);
            console.log(current);

            template += `  
            <div>
                <dl class="clearfix">
                    <dt class="selected-one">
                        <input type="checkbox">
                    </dt>
                    <dd class="shop-img">
                        <a href="">
                            <img src="${picture[0].src}" alt="">
                        </a>
                    </dd>
                    <dd class="shop-title">
                        <a href="">
                            <p>${el.title}</p>
                        </a>
                    </dd>
                    <dd class="shop-type">
                        <p>颜色：浅灰色+黑色</p>
                        <p>尺码：M</p>
                    </dd>
                    <dd class="shop-one-price">
                        ￥${parseInt(el.price).toFixed(2)}
                    </dd>
                    <dd class="shop-num">
                        <input type="number" min="1" value="${current[0].num}" data-id="${el.id}">
                    </dd>
                    <dd class="shop-price">￥${el.price*current[0].num}</dd>
                    <dd class="shop-contr">
                        <p>移入收藏夹</p>
                        <span class="del" data-id="${el.id}">删除</span>
                    </dd>
                </dl>
            </div>`;
        });
        $('.shopping>.tabs-shop').html(function(i, current) {
            // console.log(i, current);
            return current + template;
        }).find('.del').on('click', function() {
            let res = shop.filter(el => el.id !== $(this).attr('data-id'));
            cookie.set('shop', JSON.stringify(res), 1);
            location.reload();
        });
        $(function() {
            let arr = Array.from($('.tabs-shop>div'));
            $('.menu>sub').text(`${arr.length}`);
        });



        //购物车全选商品时触发的一系列变化的功能(例如选择，价格)
        $('.shopping').on('change', '.shop-num>input', function() {
            let newNum = $(this).val();
            let arr = shop;
            let _index = arr.findIndex((ele) => {
                return ele.id == $(this).attr('data-id');
            });
            arr[_index].num = newNum;
            cookie.set('shop', JSON.stringify(arr), 1);
            location.reload();
        });

        console.log($('.selected-all>input').prop('checked'));
        $('.shopping').on('click', '.selected-all>input', function() {
            let resAll = $('.selected-all>input').prop('checked');
            // let resOne = $('.selected-one>input').prop('checked');
            $('.selected-one>input').prop("checked", resAll);
            let sum = 0;
            let arr = $('.shop-price').text().split('￥')
            arr.forEach((ele, i) => {
                if (i) {
                    sum += parseInt(ele);
                }
            });
            if (resAll) {
                $('.all-account').text(`${sum.toFixed(2)}`);
            } else {
                $('.all-account').text('0.00');
            }
        });

        //单件商品选择金额发生变化的功能
        $('.shopping').on('click', '.selected-one>input', function() {
            // let resOne = $(this).prop('checked');
            let arr = Array.from($('.selected-one>input'));

            $('.selected-all>input').prop('checked', arr.every(ele => $(ele).prop('checked'))); //判断商品是否全部选择从而是否选择全选按钮
            let arr2 = arr.filter(ele => $(ele).prop('checked') == true);
            let sum = 0;
            arr2.forEach(ele => {
                let price = $(ele).parent().parent().children('.shop-price').text().slice(1);
                sum += parseInt(price);
            });
            $('.all-account').text(`${sum.toFixed(2)}`);

        });

    }).catch(xhr => {
        console.log(xhr.status);
    })
}