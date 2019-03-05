<?php


require 'connection.php';
session_start();
$resp=array();
if($_SERVER['REQUEST_METHOD']=="POST"){

    $d= file_get_contents("php://input");
    $dd=json_decode($d);
    @$p=(int)$dd->price;
    @$desc = (string)$dd->description;
    $_SESSION['selected_price']=$p;
    $_SESSION['description']=$desc;
    
    $resp['status']=1;
}

if($_SERVER['REQUEST_METHOD']=="GET"){
$resp['price']=$_SESSION['selected_price'];
    
}
echo json_encode($resp);
?>