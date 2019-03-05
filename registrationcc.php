<?php

require 'connection.php';
$response=array();
if($con->connect_error){
    die("error");
}
 if($_SERVER['REQUEST_METHOD']=='POST'){

    $data= file_get_contents("php://input");
    $data_decoded= json_decode($data);
    @$person=$data_decoded->person;

    if($person == "student"){

    $stmt=$con->prepare("INSERT INTO logindet(name,username,email,password) VALUES(?,?,?,?);");
    $stmt->bind_param("ssss",$name,$username,$email,$pass);
    $stmt5=$con->prepare("SELECT * FROM logindet WHERE email=?;");
    $stmt5->bind_param("s",$email);    
    $stmt4=$con->prepare("SELECT * FROM logindet WHERE username=?;");
    $stmt4->bind_param("s",$username);
    
    
    $data2= file_get_contents("php://input");
    
    $data_decoded2= json_decode($data2);
    @$name = (string)$data_decoded2->name;
    @$username = (string)$data_decoded2->username;
    @$email = (string)$data_decoded2->email;
    @$pass = (string)$data_decoded2->pass;
    $stmt5->execute();
    $stmt5->store_result();
    $stmt4->execute();
        $stmt4->store_result();
        
    if($stmt5->num_rows>0){
        if($stmt4->num_rows>0){
            $response['message'] = "email and username are already registered";
            $response['status'] = 0;
        }else{
            $response['message'] = "email is already registered";
            
            $response['status'] = 0;

        }
    }else if($stmt4->num_rows>0){
        $response['message'] = "username is already taken";
        $response['status'] = 0;
        
    }
        else{
    
if($stmt->execute()){
    $response['message'] = "registered";
    $response['status'] = 1;
    
}else{
    $response['message'] = "failed";
    $response['status'] = 0;
}
    }
    echo json_encode($response);
}
if($person == "financial team"){

    $stmt8=$con->prepare("INSERT INTO findet(name,username,email,password) VALUES(?,?,?,?);");
    $stmt8->bind_param("ssss",$name,$username,$email,$pass);
    $stmt6=$con->prepare("SELECT * FROM findet WHERE email=?;");
    $stmt6->bind_param("s",$email);    
    $stmt7=$con->prepare("SELECT * FROM findet WHERE username=?;");
    $stmt7->bind_param("s",$username);
    
    
    $data4= file_get_contents("php://input");
    
    $data_decoded4= json_decode($data4);
    @$name = (string)$data_decoded4->name;
    @$username = (string)$data_decoded4->username;
    @$email = (string)$data_decoded4->email;
    @$pass = (string)$data_decoded4->pass;
    $stmt6->execute();
    $stmt6->store_result();
    $stmt7->execute();
        $stmt7->store_result();
        
    if($stmt6->num_rows>0){
        if($stmt7->num_rows>0){
            $response['message'] = "email and username are already registered";
            $response['status'] = 0;
        }else{
            $response['message'] = "email is already registered";
            
            $response['status'] = 0;

        }
    }else if($stmt7->num_rows>0){
        $response['message'] = "username is already taken";
        $response['status'] = 0;
        
    }
        else{
    
if($stmt8->execute()){
    $response['message'] = "registered";
    $response['status'] = 1;
    
}else{
    $response['message'] = "failed";
    $response['status'] = 0;
}
    }
    echo json_encode($response);
}
if($person == "food vendor"){
    $data_decoded3= json_decode($data);
    
    $stmt1=$con->prepare("INSERT INTO foodvendor(name,username,email,password) VALUES(?,?,?,?);");
    $stmt1->bind_param("ssss",$name,$username,$email,$pass);
    
    $stmt2=$con->prepare("SELECT * FROM foodvendor WHERE username=?;");
    $stmt2->bind_param("s",$username);

    $stmt3=$con->prepare("SELECT * FROM foodvendor WHERE email=?;");
    $stmt3->bind_param("s",$email);
    
    $data3= file_get_contents("php://input");
    $data_decoded3= json_decode($data3);
        @$name = (string)$data_decoded3->name;
        @$username = (string)$data_decoded3->username;
        @$email =(string)$data_decoded3->email;
        @$pass = (string)$data_decoded3->pass;
    
    $stmt2->execute();
    $stmt2->store_result();
    $stmt3->execute();
    $stmt3->store_result();
    
    if($stmt2->num_rows>0){
            if($stmt3->num_rows>0){
                $response['message'] = "email and username are already registered";
                $response['status'] = 0;
            }else{
                $response['message'] = "username is already taken";
                $response['status'] = 0;
    
            }
        }else if($stmt3->num_rows>0){
    
            $response['status'] = 0;
            $response['message'] = "email is already registered";
        }else{
    if($stmt1->execute()){
        $response['message'] = "registered";
        $response['status'] = 1;
        
    }else{
        $response['message'] = "failed";
        $response['status'] = 0;
        
    }}
    echo json_encode($response);
}


 }



?>


