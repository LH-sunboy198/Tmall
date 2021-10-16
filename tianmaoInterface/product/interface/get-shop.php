<?php
    include('./library/conn.php');

    $idList = $_REQUEST['idList'];

    $sql = "select * from products where id in ($idList)";
    
    $res = $conn->query($sql);

    $conn->close();

    $arr = array();
    while($row=$res->fetch_assoc()){
        array_push($arr,$row);
    }
    $json=json_encode($arr);
    echo $json;
?>