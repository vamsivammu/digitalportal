<?php

    require 'connection.php';

    session_start();

    $stmt=$con->prepare("SELECT * FROM findet WHERE username=?;");
    $stmt->bind_param("s",$username);
    $username=$_SESSION['fusername'];
    $stmt->execute();
    $d=$stmt->get_result()->fetch_assoc();
    $resp=array();
    $resp['name']=$d['name'];
    $resp['username']=$d['username'];
    $resp['email'] =$d['email'];
    $resp['balance']=$d['balance'];    
    echo json_encode($resp);

?>