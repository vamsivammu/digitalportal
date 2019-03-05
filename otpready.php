<?php

require 'connection.php';
session_start();
$resp=array();
if($_SERVER['REQUEST_METHOD']=="POST"){
    $d=file_get_contents("php://input");
    $dd=json_decode($d);
    @$otp=$dd->otp;
    @$tid=$dd->tid;
    $_SESSION['otp']=$otp;
    $_SESSION['pendingtid']=$tid;
    $resp['status']=1;
}
echo json_encode($resp);
?>