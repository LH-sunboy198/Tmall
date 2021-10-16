<?php

    // 实现注册功能
    // 1. 连接数据库
    // 2. 接收前端发送的数据
    // 3. 在数据库中查询用户名是否存在 
    //    如果用户名存在 告知结果 并返回 注册页
    //    如果用户名不存在 将用户传入的数据 写入 数据库 并返回 注册成功的信息

    include('./library/conn.php');

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    // 查询用户名是否存在
    $sql = "select * from users where username='$username'";

    $result = $conn->query($sql);

    if($result->num_rows>0){
        $conn -> close(); // 断开数据库连接
        echo '<script>alert("用户名已存在");</script>';
        echo '<script>location.href="http://localhost/project/TmallWeb-develop/src/module/html/reg.html";</script>';
        die();
    }

    // 数据不存在 则将数据 插入数据库

    $sql2 = "insert into users (username,password) values ('$username','$password')";
    
    $insert = $conn->query($sql2); // 执行插入操作时返回一个布尔值 表示是否插入成功

    $conn -> close(); // 断开数据库连接

    if($insert){
        echo '<script>alert("注册成功");</script>';
        echo '<script>location.href="http://localhost/project/TmallWeb-develop/src/module/html/register.html";</script>';
    }
?>