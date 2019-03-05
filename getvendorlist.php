<?php

require 'connection.php';

$vendors=Array();
$numoffers=Array();
$offers=Array();

if($_SERVER['REQUEST_METHOD']=="GET"){


    $stmt=$con->prepare("SELECT * FROM foodvendor;");
    $stmt->execute();
    
    $s=$stmt->get_result();
    while($d=$s->fetch_assoc()){
        $stmt3=$con3->prepare("SELECT * FROM offers WHERE vendorid=?;");
        $stmt3->bind_param("s",$vid);
        $stmt1=$con1->prepare("SELECT * FROM vendortransactions WHERE paymentto=?;");
        $stmt1->bind_param("s",$vid);
        $vid=$d['username'];
        $stmt1->execute();
        $stmt1->store_result();
        $stmt3->execute();
        $stmt3->store_result();
        $a=$stmt1->num_rows();
        $e=$stmt3->num_rows();
        $numoffers[$d['username']]=$a;
        $offers[$d['username']]=$e;
        
    }

    $stmt2=$con2->prepare("SELECT * FROM foodvendor;");
    $stmt2->execute();
    $b=$stmt2->get_result();
    while($c=$b->fetch_assoc()){
        $vendor=Array();
        $vendor['name']=$c['name'];
        $vendor['username']=$c['username'];
        $vendor['email']=$c['email'];
        $vendor['numoffers']=$numoffers[$c['username']];
        $vendor['offers']=$offers[$c['username']];
        
        array_push($vendors,$vendor);
    }

}
echo json_encode($vendors);


?>