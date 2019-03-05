<?php

require 'connection.php';
$alerts = array();
date_default_timezone_set("Asia/Kolkata");
if($con->connect_error){
    die("failed to connect");
}

if($_SERVER["REQUEST_METHOD"]=="POST"){

session_start();

$stmt=$con->prepare("SELECT * FROM logindet WHERE username=? ;");
$stmt->bind_param("s",$stu);

$stm =$con1->prepare("SELECT * FROM foodvendor WHERE username=? ;");
$stm->bind_param("s",$vendorid);

$stm1 =$con1->prepare("SELECT * FROM foodvendor WHERE username=? ;");
$stm1->bind_param("s",$vendorid);


$stu = $_SESSION['username'];
$vendorid = $_SESSION['selected_vendor'];

$stmt->execute();
$d = $stmt->get_result()->fetch_assoc();

$stm->execute();
$d1 =$stm->get_result()->fetch_assoc();

$stm1->execute();
$stm1->store_result();

if($stm1->num_rows>0){

$current_stu_balance = (int)$d['balance'];
$current_vendor_balance = (int)$d1['balance'];
$alerts['bal1'] = $current_stu_balance;
$alerts['bal2'] = $current_vendor_balance;

$amoun=(string)$_SESSION['selected_price'];

$amount = (int)$amoun;
$alerts['am'] = $amount;
$paybystu = $con->prepare("UPDATE logindet SET balance =? WHERE username = ? ;");
$paybystu->bind_param("ss",$updatedbalancestu,$payingstu);

$vendorupd = $con1->prepare("UPDATE foodvendor SET balance =? WHERE username = ? ;" );
$vendorupd->bind_param("ss",$updatedbalancevend,$payedto);

$payingstu = $_SESSION['username'];
$payedto =$vendorid;

$updatedbalancestu = (string)($current_stu_balance-$amount);
$updatedbalancevend= (string)($current_vendor_balance+$amount);
$alerts['updatedbal1']=$updatedbalancestu;
$alerts['updbal2']=$updatedbalancevend;
$i = (int)($updatedbalancestu);
if($i<0){

    $alerts['message'] = "your balance is not sufficient";
    $alerts['status'] = 0;
}else if($paybystu->execute() and $vendorupd->execute()){
    $tra=$con->prepare("INSERT INTO pendingtransactions(credit,debit,paymentto,paymentby,transactionid,otp) VALUES(?,?,?,?,?,?);");
    $tra->bind_param("iisssi",$credit,$debit,$paymentto,$paymentby,$tid,$otp);
    $tra1=$con1->prepare("INSERT INTO vendorpendingtransactions(credit,debit,paymentto,paymentby,transactionid,otp) VALUES(?,?,?,?,?,?);");
    $tra1->bind_param("iisssi",$credit1,$debit1,$paymentto,$paymentby,$tid,$otp);
    $tid=$_SESSION['username'].(string)date("Ymdhis");
    $desc = $_SESSION["description"];
    $otp = rand(10000,99999);
    $credit=0;
    $debit=$amount;
    $credit1=$amount;
    $debit1=0;
    $paymentby=$_SESSION['username'];
    $paymentto=$payedto;
    $tra->execute();
    $tra1->execute();
    $alerts['otp']=$otp;
    $alerts['message']= "transaction succesful";
    $alerts['username'] = $d['username'];
    $alerts['email'] = $d['email'];
    $alerts['tid']=$_SESSION['username'].(string)date("Ymdhis");
    
    $alerts['balance'] = $updatedbalancestu;
    $alerts['name'] = $d['name'];
    $alerts['status'] = 1;
    $email = $d1['email'];
    $sub="Welcome to CEA 2019";
    $msg4 = '<html><body><div id="email" style="font-family: century gothic;font-size: 16px;">
    <h2>Hi '.$d1['name'].',</h2>
    <p>Product:'.$desc.'</p>
    <p>Transaction ID: '.$tid.'</p>
    <p>Amount credited:Rs.'.$credit1.'</p>
    <h3>Total Balance: Rs.'.$updatedbalancevend.'</h3>
    <p>Thank you,<br/>
    CEA 2019 Team</p>
    </div></body></html>';
    $headers = "From:CEA Web Operations <webops@ceaiitm.org>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    mail($email,$sub,$msg4,$headers);

}else{
    $alerts['message'] ="transaction failed";
    $alerts['status']  = 0;
}
}
else{
    $alerts["message"] = "Vendor ID doesn't exist";
    $alerts['status']  = 0;
}

echo json_encode($alerts);

}

?>
