<?php


require 'connection.php';

if($_SERVER['REQUEST_METHOD']=="POST"){

    $d=file_get_contents("php://input");
    $dd=json_decode($d);
    @$gn=(string)$dd->groupname;
    $stmt=$con->prepare("INSERT INTO listgroups(groupname) VALUES(?);");
    $stmt->bind_param("s",$groupname);
    $stmt1=$con->prepare("SELECT * FROM listgroups WHERE groupname=?;");
    $stmt1->bind_param("s",$groupname);
    $groupname=$gn;
    $stmt1->execute();
    $stmt1->store_result();
    if($stmt1->num_rows>0){
        $resp['rows']=$stmt1->num_rows;
        $resp['status']=0;
    }else{
        if($stmt->execute()){
            $resp['status']=1;
    
        }else{
            $resp['status']=-1;
        }
    }
    
}

echo json_encode($resp);
?>