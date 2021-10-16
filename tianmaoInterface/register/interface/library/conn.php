<?php
    header('content-type:text/html;charset=utf-8');

    $mysql_conf = array(
        'host'=>'localhost:3306',  // 主机名和端口号
        'db_user'=>'root', // mysql 登录的用户名
        'db_pass'=>'root', // 登录密码
        'db'=>'tianmao' // 数据库名
    );

    // 登录(连接) 数据库
    $conn = @new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_pass']);

    
    if($conn->connect_errno){ // 判断是否有连接错误
        // die 结束进程 终止代码执行
        die('连接错误'.$conn->connect_errno); // 输出连接错误的错误代码 并且 结束进程
    }
    
    // 设置查询字符集
    $conn->query('set names utf8');

    // 选择数据库
    $selected = $conn->select_db($mysql_conf['db']);

    if(!$selected){ // 没有选择到数据库 结束进程
        die('数据库选择错误'.$conn->error);
    }
?>