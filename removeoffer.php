<?php

require 'connection.php';
$resp=array();
session_start();
if($_SERVER["REQUEST_METHOD"]=="GET"){

    $stmt=$con->prepare("DELETE FROM offers WHERE price=? AND description=? AND vendorid=?;");
    $stmt->bind_param("iss",$price,$des,$vid);
    $price=$_SESSION['removedprice'];
    $des=$_SESSION['removeddescription'];
    $vid=$_SESSION['sv'];
    $resp['a']=$_SESSION['removedprice'];
    $resp['b']=$_SESSION['removeddescription'];
    $resp['c']=$_SESSION['sv'];
    if($stmt->execute()){
        $resp['status']=1;
    }
}
echo json_encode($resp);


?>