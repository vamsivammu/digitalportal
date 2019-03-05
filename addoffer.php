<?php
require 'connection.php';
session_start();
$resp=array();
if($_SERVER["REQUEST_METHOD"]=='POST'){

        $d=file_get_contents("php://input");
        $dd=json_decode($d);

        $stmt=$con->prepare("INSERT INTO offers(vendorid,price,description) VALUES(?,?,?);");
        $stmt->bind_param("sis",$vid,$p,$des);
        @$price=(string)$dd->price;
        @$description=(string)$dd->description;
        @$v=(string)$dd->vend;
        $vid=$v;
        $p=(int)$price;
        $des=$description;
        if($stmt->execute()){
            $resp['status']=1;
            $_SESSION['sv']=$vid;
        }
        else{
            $resp['status']=0;
        }


echo json_encode($resp);

}



?>