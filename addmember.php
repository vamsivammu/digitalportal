<?php

require 'connection.php';

$resp=array();
if($_SERVER['REQUEST_METHOD']=="POST"){
    $d=file_get_contents("php://input");
    $dd=json_decode($d);
    @$gn=(string)$dd->groupname;
   @$mn=(string)$dd->membername;
   $stmt2=$con1->prepare("SELECT * FROM logindet WHERE username=?;");
   $stmt2->bind_param("s",$m);
   $m=$mn;
   $stmt2->execute();
   $stmt2->store_result();
   if($stmt2->num_rows>0){
   $stmt1=$con->prepare("SELECT * FROM groups WHERE groupname=? AND userid=?;");
   $stmt1->bind_param("ss",$groupname,$membername);
   $stmt=$con->prepare("INSERT INTO groups(groupname,userid) VALUES(?,?);");
   $stmt->bind_param("ss",$groupname,$membername);
   $groupname=$gn;
   $membername=$mn;
   $stmt1->execute();
   $stmt1->store_result();
   if($stmt1->num_rows>0){
       $resp['status']=0;
   }else{
    if($stmt->execute()){
        $resp['status']=1;

    }else{
        $resp['status']=-1;
    }
   }
}else{
    $resp['status']=2;
}
}

echo json_encode($resp);
?>