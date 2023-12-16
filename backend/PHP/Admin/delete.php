<?php

session_start();
include "../dbConnect.php";
header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *"); // Autoriser tous les en-têtes

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET['idi']) && isset($_GET['type'])) {
        $type = $_GET['type'];
        $id = $_GET['idi'];
        switch ($type) 
        {
            case "Smart Watch":
                $sql = "DELETE FROM watch WHERE id_watch = :id";
          
        break;
   case  "Ordinateurs": 
        
       
            $sql = "DELETE FROM pc WHERE id_pc = :id";
         
        break;
    case "Television":
      
            $sql = "DELETE FROM tv WHERE id_tv = :id";
           
    case "Telephone":
        
            $sql = "DELETE FROM telephone WHERE id_tel = :id";
          
        break;
    case "pannier":
        $sql = "DELETE FROM pannier WHERE id_prod = :id";
        break;
    case"address":

        $sql = "DELETE FROM pannier WHERE address_id = :id";
        break;
    case "order" :
        $sql = "DELETE commande, produit_cmd
        FROM commande
        LEFT JOIN produit_cmd ON commande.id_cmd = produit_cmd.cmd_id
        WHERE commande.id_cmd = :id";;
      break;
    default : 
        echo "no id sent !!";
    }


    try {
              
        
        $res = $con->prepare($sql);

       $result = $res->execute([
            ':id'=>$id]);
        if($result){
            echo "row deleted succesfully";
        }else{
            echo "row not deleted ";
        }
    } catch (PDOException $e) {
        echo "error message : " . $e->getMessage();
    }

}else{
    echo "send all data ";
}
} else {
    echo "error GET method";
}