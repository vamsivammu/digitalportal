<?php

require 'connection.php';
$stmt=$con->prepare("SELECT * FROM logindet WHERE 1=1;");
$students=array();
$stmt->execute();
$s = $stmt->get_result();

while($t = $s->fetch_assoc()){
    $student=array();
    $student['name']=$t['name'];
    $student['email']=$t['email'];
    $student['username']=$t['username'];
    $student['balance']=$t['balance'];
    
    array_push($students,$student);
}
echo json_encode($students);
?>