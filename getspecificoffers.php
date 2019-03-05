<?php

require 'connection.php';
$resp=array();
$offers=array();
session_start();
if($_SERVER['REQUEST_METHOD']=='POST'){

    $d=file_get_contents("php://input");
    $decoded=json_decode($d);
    @$vendorid=$decoded->vendorid;
    $_SESSION['selected_vendor']=$vendorid;
    $resp['status']=1;
    echo json_encode($resp);
}
if($_SERVER['REQUEST_METHOD']=='GET'){

    $stmt=$con->prepare("SELECT * FROM offers WHERE vendorid=?;");
    $stmt->bind_param("s",$vid);
    $vid=$_SESSION['selected_vendor'];
    $stmt->execute();
    $d=$stmt->get_result();
    while($s=$d->fetch_assoc()){
        $o=array();
        $o['vendorid']=$s['vendorid'];
        $o['price']=$s['price'];
        $o['description']=$s['description'];
        array_push($offers,$o);
    }

    echo json_encode($offers);
}



?>