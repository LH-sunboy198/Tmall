import $ from './library/jquery-tabs-register.js';


$('.register>.tabs-register').tabs({
    active: 'choose',
    display: 'displayed'
});
$('.tabs-register>div:last>.iconfont').on('click', function() {
    $('.tabs-register>div').removeClass('displayed').eq(0).addClass('displayed');
    $('.tabs-register>ul>li').removeClass('choose').eq(0).addClass('choose');

});

// $('.btn').on('click', function() {
//     console.log(1);
//     $.ajax({
//         type: "get",
//         url: "http://127.0.0.1/tianmao/register/interface/login.php",
//         data: {
//             username: $('#username').val(),
//             password: $('#password').val()

//         }
//     });
// })