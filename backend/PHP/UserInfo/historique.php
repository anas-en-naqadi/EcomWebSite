

<?php

session_start();
include "../dbConnect.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

if(isset($_GET['id'])){

    $id = $_GET['id'];
    $sql = "SELECT * FROM commande  WHERE id_user=:id and status ='confirmed'";
    $res = $con->prepare($sql);
    $res->execute([':id' => $id]);
    if($res){

        $data = $res->fetchAll(PDO::FETCH_ASSOC);
        if(count($data)>=1){
        echo json_encode($data);
    }
        else{
            echo json_encode(['status' => 'no order set yet']);}
        }
        
    }else{
        echo json_encode(['status' => 'Error selecting data']);
    }


}else{
    echo json_encode(['status' => 'Error Get Method']);
}










































?>