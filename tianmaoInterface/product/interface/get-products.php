<?php
    include('./library/conn.php');

    $sql='select * from products';

    $res=$conn->query($sql);

    $conn->close();

    $arr=array();
    while($row=$res->fetch_assoc()){
        array_push($arr,$row);
    }
    $json=json_encode($arr);
    echo $json;
?>