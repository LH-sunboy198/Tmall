<?php
    include('./library/conn.php');

    $id=$_REQUEST['id'];

    $sql="select * from products where id=$id";

    $res=$conn->query($sql);

    $conn->close();
    
    $row=$res->fetch_assoc();

    $json=json_encode($row);

    echo $json;
?>