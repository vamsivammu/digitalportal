<?php
require 'connection.php';
session_start();
$resp=array();
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $d=file_get_contents("php://input");
    $dd=json_decode($d);
    @$userotp=(int)$dd->otp;
    if($_SESSION['otp']==$userotp){
            $resp['status']=1;
            $stmt1=$con1->prepare("SELECT * FROM pendingtransactions WHERE transactionid=?;");
            $stmt1->bind_param("s",$tid);
            
            
            $stmt3=$con3->prepare("DELETE FROM pendingtransactions WHERE transactionid=?;");
            $stmt3->bind_param("s",$tid);
            
            $stmt4=$con4->prepare("DELETE FROM vendorpendingtransactions WHERE transactionid=?");
            $stmt4->bind_param("s",$tid);
            
            $tid=$_SESSION['pendingtid'];

            $stmt1->execute();
            $s=$stmt1->get_result()->fetch_assoc();
            
            if($stmt3->execute() and $stmt4->execute()){

                $stmt5=$con5->prepare("INSERT INTO stutransactions(credit,debit,paymentto,paymentby,transactionid) VALUES(?,?,?,?,?);");
                $stmt5->bind_param("iisss",$credit,$debit,$paymentto,$paymentby,$transactionid);

                $stmt6=$con2->prepare("INSERT INTO vendortransactions(credit,debit,paymentto,paymentby,transactionid) VALUES(?,?,?,?,?);");
                $stmt6->bind_param("iisss",$debit,$credit,$paymentto,$paymentby,$transactionid);
                
                $credit=$s['credit'];
                $debit=$s['debit'];
                $paymentto=$s['paymentto'];
                $paymentby=$s['paymentby'];
                $transactionid=$s['transactionid'];
                if($stmt5->execute() and $stmt6->execute()){
                    $resp['status']=1;
                }

            }

    }else{
        $resp['status']=-1;
    }
    
}
echo json_encode($resp);
?>