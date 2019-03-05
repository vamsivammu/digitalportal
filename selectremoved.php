<?php

require 'connection.php';
$resp=array();
session_start();
if($_SERVER["REQUEST_METHOD"]=="POST"){

    $d=file_get_contents("php://input");
    $dd=json_decode($d);

    @$price=(string)($dd->price);
    @$description=(string)($dd->description);
    $_SESSION['removedprice']=$price;
    $_SESSION['removeddescription']=$description;

    $resp['status']=1;
    $resp['price'] = $price;
    $resp['description'] = $description;
       
}

echo json_encode($resp);
?>
