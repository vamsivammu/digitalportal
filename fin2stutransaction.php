<?php

require 'connection.php';
$alerts = array();
date_default_timezone_set("Asia/Kolkata");
if($con->connect_error){
    die("failed to connect");
}

if($_SERVER["REQUEST_METHOD"]=="POST"){

$details = file_get_contents("php://input");
$details_decoded=json_decode($details);
@$students=(array)$details_decoded->students;

session_start();
foreach($students as $student){
$stmt=$con->prepare("SELECT * FROM logindet WHERE username=? ;");
$stmt->bind_param("s",$stuid);
$stmt1=$con1->prepare("SELECT * FROM findet WHERE username=?;");
$stmt1->bind_param("s",$payby);

$stuid = (string)$student;
$payby=$_SESSION['fusername'];
$stmt->execute();
$d = $stmt->get_result()->fetch_assoc();
$stmt1->execute();
$d1=$stmt1->get_result()->fetch_assoc();

$current_stu_balance = (int)$d['balance'];
$current_fin_balance=(int)$d1['balance'];
@$amoun=(string)($details_decoded->amount);

$amount = (int)$amoun;
$paybyfin = $con->prepare("UPDATE logindet SET balance =? WHERE username = ? ;");
$paybyfin->bind_param("ss",$updatedbalancestu,$payedto);
$finupd=$con1->prepare("UPDATE findet SET balance =? WHERE username=?;");
$finupd->bind_param("ss",$updatedbalancefin,$payingby);
$payingby = $_SESSION['fusername'];
$payedto =$stuid;
$updatedbalancestu = (string)($current_stu_balance+$amount);
$updatedbalancefin= (string)($current_fin_balance-$amount);

$i = (int)($updatedbalancefin);


if($i<0){

    $alerts['message'] = "Your balance is not sufficient";
    $alerts['status'] = 0;
    break;
}else if($paybyfin->execute() and $finupd->execute()){
    $tra=$con->prepare("INSERT INTO stutransactions(credit,debit,paymentto,paymentby,transactionid) VALUES(?,?,?,?,?);");
    $tra->bind_param("iisss",$credit,$debit,$paymentto,$paymentby,$tid);
    $tra1=$con1->prepare("INSERT INTO fintransactions(credit,debit,paymentto,paymentby,transactionid) VALUES(?,?,?,?,?);");
    $tra1->bind_param("iisss",$debit,$credit,$paymentto,$paymentby,$tid);
    $tid=$payedto.(string)date("Ymdhis");
    $credit=$amount;
    $debit=0;
    $paymentby=$_SESSION['fusername'];
    $paymentto=$payedto;
    $tra->execute();
    $tra1->execute();
    $alerts['message']= "transaction succesful";
    $alerts['status'] = 1;

}else{
    $alerts['message'] ="transaction failed";
    $alerts['status']  = 0;
}
}
}

echo json_encode($alerts);



?>
