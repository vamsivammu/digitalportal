<?php



require 'connection.php';
session_start();
$details=array();
// $response['credit']=array();
// $response['paymentto']=array();
// $response['debit']=array();
// $response['paymentby']=array();
// $response['time']=array();

$stmt=$con->prepare("SELECT * FROM stutransactions WHERE paymentby=? or paymentto=?;");
$stmt->bind_param("ss",$username,$username);
$stmt1=$con1->prepare("SELECT * FROM stucredittransactions WHERE paymentto=?;");
$stmt1->bind_param("s",$username);
$stmt2=$con2->prepare("SELECT * FROM studebittransactions WHERE paymentby=?;");
$stmt2->bind_param("s",$username);

$username=$_SESSION['username'];
$stmt->execute();
$stmt1->execute();
$stmt2->execute();

$s=$stmt->get_result();



while($t=$s->fetch_assoc()){

    $d=array();
    $d['paymentby']=$t['paymentby'];
    $d['paymentto']=$t['paymentto'];
    $d['time']=$t['time'];
    $d['credit']=$t['credit'];
    $d['debit']=$t['debit'];
    $d['transactionid']=$t['transactionid'];
    
    
     array_push($details,$d);

}
$z=$stmt1->get_result();
while($t=$z->fetch_assoc()){

    $d=array();
    $d['paymentby']=$t['paymentby'];
    $d['paymentto']=$t['paymentto'];
    $d['time']=$t['time'];
    $d['credit']=$t['credit'];
    $d['debit']=$t['debit'];
    $d['transactionid']=$t['transactionid'];
    
    
     array_push($details,$d);

}
$y=$stmt2->get_result();

while($t=$y->fetch_assoc()){

    $d=array();
    $d['paymentby']=$t['paymentby'];
    $d['paymentto']=$t['paymentto'];
    $d['time']=$t['time'];
    $d['credit']=$t['credit'];
    $d['debit']=$t['debit'];
    $d['transactionid']=$t['transactionid'];
    
    
     array_push($details,$d);

}


echo json_encode($details);

?>
