<?php



require 'connection.php';
session_start();
$details=array();
// $response['credit']=array();
// $response['paymentto']=array();
// $response['debit']=array();
// $response['paymentby']=array();
// $response['time']=array();
$stmt=$con->prepare("SELECT * FROM pendingtransactions WHERE paymentby=?");
$stmt->bind_param("s",$username);
$username=$_SESSION['username'];
$stmt->execute();
$s=$stmt->get_result();
while($t=$s->fetch_assoc()){
    $d=array();
    $d['paymentby']=$t['paymentby'];
    $d['paymentto']=$t['paymentto'];
    $d['time']=$t['time'];
    $d['credit']=$t['credit'];
    $d['debit']=$t['debit'];
    $d['transactionid']=$t['transactionid'];
    $d['otp']=$t['otp'];
    array_push($details,$d);
}
echo json_encode($details);

?>
