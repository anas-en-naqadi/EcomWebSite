<?php
session_start();


include "../dbConnect.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: *');





if ($_SERVER['REQUEST_METHOD'] == 'GET') {

if(isset( $_GET['id'])){
    $id_user = $_GET['id'];


    try {
        $sql = "SELECT id_prod, id_user, nom_prod, marque_prod, prix_prod, image, quantite FROM pannier WHERE id_user = :id";



        $res = $con->prepare($sql);

     $res->execute([":id"=> $id_user]);
     $data = $res->fetchAll(PDO::FETCH_ASSOC);
        if (count($data)>=1) {
        
            foreach($data as $row){
                
            }
            echo json_encode($data);
        } else {
            echo json_encode(['status' => "Your Cart is Empty"]);
        }
    } catch (PDOException $e) {
        echo 'erreur :' . $e->getMessage();
    }}else{
        echo"error getting data";
    }
} else {

    echo "method error";
}
