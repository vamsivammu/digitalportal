<?php

require 'connection.php';
$resp=array();
if($_SERVER['REQUEST_METHOD']=="POST"){
    $stmt1=$con->prepare("SELECT * FROM listgroups;");
    $stmt1->execute();
    $a =$stmt1->get_result();
    $resp['names']=array();
    while($b= $a->fetch_assoc()){
        array_push($resp['names'],$b['groupname']);
    }
}
echo json_encode($resp);

?>