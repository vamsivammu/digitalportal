<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
session_start();

require "connection.php";
$messages=array();
if($con->connect_error){
    die("failed to connect");
}
if($_SERVER['REQUEST_METHOD']=="GET"){
    $response = array();
    $response['name']="get";
    echo json_encode($response);
}
if($_SERVER['REQUEST_METHOD']=='POST'){
    $logindata= file_get_contents("php://input");
    $logindata_decoded= json_decode($logindata);
    @$person=$logindata_decoded->person;
    
    if($person == "student"){
        $log = $con->prepare("SELECT * FROM logindet WHERE username=? AND password = ?;");
        $log->bind_param("ss",$username,$pass);
        $log1 = $con->prepare("SELECT * FROM logindet WHERE username=? AND password = ?;");
        $log1->bind_param("ss",$username,$pass);
        
        $check=$con->prepare("SELECT * FROM logindet WHERE username=? ;");
        $check->bind_param("s",$username);
        @$username = $logindata_decoded->username;
        @$pass = $logindata_decoded->password;
        $log->execute();
        $log->store_result();
        $check->execute();
        $check->store_result();
        
        if($check->num_rows>0){
        if($log->num_rows>0){
            $log1->execute();
            $a = $log1->get_result()->fetch_assoc();
            $_SESSION['username'] = $a['username'];  
            $messages['username']=$a['username'];
            $messages['name']=$a['name'];
            $messages['email']=$a['email'];
            $messages['balance']=$a['balance'];
            
            $messages['user']='/2019/portal/student';
            $messages["status"] = 1;
           // header('Location: student.html');
        }else {

            $messages["messages"]="invalid  password";
            $messages["status"] = 0;
        }}else{
            $messages["messages"]="username not found";
            $messages["status"] = 0;

        }

    }
    else if($person == "financial team"){
        $log = $con->prepare("SELECT * FROM findet WHERE username=? AND password = ?;");
        $log->bind_param("ss",$username,$pass);
        $log1 = $con->prepare("SELECT * FROM findet WHERE username=? AND password = ?;");
        $log1->bind_param("ss",$username,$pass);
        
        $check=$con->prepare("SELECT * FROM findet WHERE username=? ;");
        $check->bind_param("s",$username);
        @$username = $logindata_decoded->username;
        @$pass = $logindata_decoded->password;
        $log->execute();
        $log->store_result();
        $check->execute();
        $check->store_result();
        
        if($check->num_rows>0){
        if($log->num_rows>0){
            $log1->execute();
            $a = $log1->get_result()->fetch_assoc();
            $_SESSION['fusername'] = $a['username'];  
            $messages['username']=$a['username'];
            $messages['name']=$a['name'];
            $messages['email']=$a['email'];
            $messages['balance']=$a['balance'];
            
            $messages['user']='/2019/portal/finteam';
            $messages["status"] = 1;
           // header('Location: student.html');
        }else {

            $messages["messages"]="invalid  password";
            $messages["status"] = 0;
        }}else{
            $messages["messages"]="username not found";
            $messages["status"] = 0;

        }

    }

    else if($person == "foodvendor"){
        $log = $con->prepare("SELECT * FROM foodvendor WHERE username=? AND password = ?;");
        $log->bind_param("ss",$username,$pass);
        $log1 = $con->prepare("SELECT * FROM foodvendor WHERE username=? AND password = ?;");
        $log1->bind_param("ss",$username,$pass);
        
        $check=$con->prepare("SELECT * FROM foodvendor WHERE username=? ;");
        $check->bind_param("s",$username);
        @$username = $logindata_decoded->username;
        @$pass = $logindata_decoded->password;
        $log->execute();
        $log->store_result();
        $check->execute();
        $check->store_result();
        
        if($check->num_rows>0){
        if($log->num_rows>0){
            $log1->execute();
            $a = $log1->get_result()->fetch_assoc();
            $_SESSION['fvusername'] = $a['username'];  
            $messages['username']=$a['username'];
            $messages['name']=$a['name'];
            $messages['email']=$a['email'];
            $messages['balance']=$a['balance'];
            
            $messages['user']='/2019/portal/vendor';
            $messages["status"] = 1;
           // header('Location: student.html');
        }else {

            $messages["messages"]="invalid  password";
            $messages["status"] = 0;
        }}else{
            $messages["messages"]="username not found";
            $messages["status"] = 0;

        }

    }


}

echo json_encode($messages);
?>