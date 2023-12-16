<?php
session_start();


include "../dbConnect.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
 
    
        if (isset($_POST['nom'], $_POST['marque'], $_POST['prix'],$_POST['id_user'], $_POST['image'], $_POST['id_prod']) || isset($_POST['quantite'])) {

            $id_user = $_POST['id_user'];
            $id = $_POST["id_prod"];
            $nom = $_POST['nom'];
            $marque = $_POST['marque'];
            $prix = $_POST['prix'];
            $quantite = $_POST['quantite'] ?? ""; // Corrected variable name
            $image = $_POST['image'];

            try {
                $sql = "INSERT INTO pannier (id_prod, id_user, nom_prod, marque_prod, prix_prod, image, quantite) VALUES (:id, :id_user, :nom, :marque, :prix, :image, :quantite)";

                $res = $con->prepare($sql);
                $values = [
                    ':id' => $id,
                    ':id_user' => $id_user, // Corrected session variable name
                    ':nom' => $nom,
                    ':marque' => $marque,
                    ':prix' => $prix,
                    ':image' => $image,
                    ':quantite' => $quantite
                ];

                $check = $res->execute($values);
                if ($check) {
                    echo "product added to Cart successfully";
                } else {
                    echo "error in insertion";
                }
            } catch (PDOException $e) {
                echo 'erreur :' . $e->getMessage();
            }
        } else {
            echo "send all the data";
        }
    
}else {
    
        echo "method error";

}
