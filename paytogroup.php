<?php

require 'connection.php';
$resp=array();
if($_SERVER['REQUEST_METHOD']=="POST"){

    $d=file_get_contents("php://input");
    $dd=json_decode($d);
    @$gn=(string)$dd->groupname;
    @$am=(int)$dd->amount;
    session_start();
    $stmt1=$con->prepare("SELECT * FROM groups WHERE groupname=?;");
    $stmt1->bind_param("s",$groupname);
    $stmt6=$con->prepare("SELECT * FROM groups WHERE groupname=?;");
    $stmt6->bind_param("s",$groupname);
    
    $stmt2=$con1->prepare("SELECT balance FROM logindet WHERE username=?;");
    $stmt2->bind_param("s",$username);
    $stmt3=$con2->prepare("SELECT balance from findet where username=?");
    $stmt3->bind_param("s",$fi);
    $fi=$_SESSION['fusername'];
    $stmt3->execute();
    $b=($stmt3->get_result()->fetch_assoc())['balance'];
    $resp['b']=$b;
    $groupname=$gn;
    $stmt1->execute();
    $s=$stmt1->get_result();
    $stmt6->execute();
    $stmt6->store_result();
    $n=$stmt6->num_rows;
    $resp['n']=$n;
    if($b-$am*$n>=0){
        $resp['usernames']=array();
        
        while($f=$s->fetch_assoc()){
            $username=$f['userid'];
            $stmt2->execute();
            $bal=$stmt2->get_result()->fetch_assoc();
            array_push($resp['usernames'],$bal['balance']);
            // $resp['usernames']=$bal;
            $stmt4=$con4->prepare("UPDATE findet set balance=? where username=?;");
            $stmt4->bind_param("is",$updfinbal,$fin);
           
            $stmt8=$con1->prepare("UPDATE logindet SET balance=? WHERE username=?;");
            $stmt8->bind_param("is",$updstubal,$stuid);
            $fin=$_SESSION['fusername'];
            $stuid=$username;
            $updfinbal=$b-$am;
            $updstubal=$bal['balance']+$am;
            $b=$updfinbal;
            if($stmt4->execute() and $stmt8->execute()){
                $tra=$con->prepare("INSERT INTO stutransactions(credit,debit,paymentto,paymentby,transactionid) VALUES(?,?,?,?,?);");
                $tra->bind_param("iisss",$credit,$debit,$paymentto,$paymentby,$tid);
                $tra1=$con1->prepare("INSERT INTO fintransactions(credit,debit,paymentto,paymentby,transactionid) VALUES(?,?,?,?,?);");
                $tra1->bind_param("iisss",$debit,$credit,$paymentto,$paymentby,$tid);
                $tid=$username.(string)date("Ymdhis");
                $credit=$am;
                $debit=0;
                $paymentby=$_SESSION['fusername'];
                $paymentto=$username;
                $tra->execute();
                $tra1->execute();
                $resp['status']=1;
            
            }
        
        }
    
    }else{
        $resp['status']=0;
    }
    
}
echo json_encode($resp);

?>