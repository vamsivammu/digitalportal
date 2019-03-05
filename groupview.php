<?php
require 'connection.php';

session_start();
$resp=array();
if($_SERVER["REQUEST_METHOD"]=="POST"){
    $d= file_get_contents("php://input");
    $dd=json_decode($d);
    @$gn= $dd->groupname;
    $_SESSION['gn']=$gn;
    $resp['status']=1;
}
if($_SERVER['REQUEST_METHOD']=="GET"){
    $stmt=$con->prepare("SELECT * FROM groups WHERE groupname=?;");
    $stmt->bind_param("s",$groupname);
    $groupname=$_SESSION['gn'];
    $stmt->execute();
    $resp['groupname']=$_SESSION['gn'];
    $resp['details']=array();
    $s = $stmt->get_result();
    while($q=$s->fetch_assoc()){
        $a = array();    
        $b =$con1->prepare("SELECT balance FROM logindet WHERE username=?;");
        $b->bind_param("s",$username);
        $username=$q['userid'];
        $b->execute();
        $c=$b->get_result()->fetch_assoc();
        $a['userid']=$username;
        $a['balance']=$c['balance'];

        array_push($resp['details'],$a);

        }

}
echo json_encode($resp);
?>
