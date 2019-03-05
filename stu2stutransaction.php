<?php

require 'connection.php';
$alerts = array();
date_default_timezone_set("Asia/Kolkata");
if($con->connect_error){
    die("failed to connect");
}

if($_SERVER["REQUEST_METHOD"]=="POST"){
$q=file_get_contents("php://input");
$qd=json_decode($q);
session_start();

$stmt=$con->prepare("SELECT * FROM logindet WHERE username=? ;");
$stmt->bind_param("s",$stu);

$stm =$con1->prepare("SELECT * FROM logindet WHERE username=? ;");
$stm->bind_param("s",$benef);

$stm1 =$con1->prepare("SELECT * FROM logindet WHERE username=? ;");
$stm1->bind_param("s",$benef);


$stu = $_SESSION['username'];
@$benef = (string)$qd->benef;

$stmt->execute();
$d = $stmt->get_result()->fetch_assoc();

$stm->execute();
$d1 =$stm->get_result()->fetch_assoc();

$stm1->execute();
$stm1->store_result();

if($stm1->num_rows>0){

$current_stu_balance = (int)$d['balance'];
$current_benef_balance = (int)$d1['balance'];
$alerts['bal1'] = $current_stu_balance;
$alerts['bal2'] = $current_benef_balance;

$amoun=(string)$qd->am;

$amount = (int)$amoun;
$alerts['am'] = $amount;
$paybystu = $con->prepare("UPDATE logindet SET balance =? WHERE username = ? ;");
$paybystu->bind_param("ss",$updatedbalancestu,$payingstu);

$benefupd = $con1->prepare("UPDATE logindet SET balance =? WHERE username = ? ;" );
$benefupd->bind_param("ss",$updatedbalancebenef,$payedto);

$payingstu = $_SESSION['username'];
$payedto =$benef;

$updatedbalancestu = (string)($current_stu_balance-$amount);
$updatedbalancebenef= (string)($current_benef_balance+$amount);
$alerts['updatedbal1']=$updatedbalancestu;
$alerts['updbal2']=$updatedbalancebenef;
$i = (int)($updatedbalancestu);
if($i<0){

    $alerts['message'] = "your balance is not sufficient";
    $alerts['status'] = 0;
}else if($paybystu->execute() and $benefupd->execute()){
    $tra=$con->prepare("INSERT INTO studebittransactions(credit,debit,paymentto,paymentby,transactionid) VALUES(?,?,?,?,?);");
    $tra->bind_param("iisss",$credit,$debit,$paymentto,$paymentby,$tid);
     $tra1=$con1->prepare("INSERT INTO stucredittransactions(credit,debit,paymentto,paymentby,transactionid) VALUES(?,?,?,?,?);");
     $tra1->bind_param("iisss",$credit1,$debit1,$paymentto,$paymentby,$tid);
    $tid=$_SESSION['username'].(string)date("Ymdhis");
    $credit=0;
    $debit=$amount;
    $credit1=$amount;
    $debit1=0;
    $paymentby=$_SESSION['username'];
    $paymentto=$payedto;
    $tra->execute();
    $tra1->execute();
    
    $alerts['message']= "transaction succesful";
    $alerts['username'] = $d['username'];
    $alerts['email'] = $d['email'];
    $alerts['tid']=$_SESSION['username'].(string)date("Ymdhis");
    $alerts['balance'] = $updatedbalancestu;
    $alerts['name'] = $d['name'];
    $alerts['status'] = 1;

}else{
    $alerts['message'] ="transaction failed";
    $alerts['status']  = 0;
}
}
else{
    $alerts["message"] = "Student ID doesn't exist";
    $alerts['status']  = -1;
}



}
echo json_encode($alerts);
?>
