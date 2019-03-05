<?php

require 'connection.php';
$resp=array();
session_start();
if($_SERVER['REQUEST_METHOD']=="POST"){
    $d=file_get_contents("php://input");
    $dd=json_decode($d);
    @$v=(string)$dd->sv;
    $_SESSION['sv']=$v;
    $resp['status']=1;
}
echo json_encode($resp);
?>