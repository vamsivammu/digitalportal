<?php

require 'connection.php';
session_start();
$a=array();
if($_SERVER['REQUEST_METHOD']=='GET'){


        $stmt=$con->prepare("SELECT * FROM offers WHERE vendorid=?;");
        $stmt->bind_param("s",$vid);
        $vid=$_SESSION['fvusername'];
        $stmt->execute();
        $d=$stmt->get_result();
        while($s=$d->fetch_assoc()){
            $b=array();
            $b['vendorid']=$s['vendorid'];
            $b['price']=$s['price'];
            $b['description']=$s['description'];
            array_push($a,$b);
        }

}
echo json_encode($a);

?>