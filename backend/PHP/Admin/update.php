<?php

include "../dbConnect.php";
session_start();
// header("Access-Control-Allow-Origin: http://localhost");

header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET, PUT,POST, OPTIONS"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *"); // Autoriser tous les en-têtes// Allow Content-Type header



if ($_SERVER['REQUEST_METHOD'] === 'POST' ) {
    $id = $_GET['id'];

 
$nom = $_POST['nom']; // Example field, adjust as per your form fields
$prix = $_POST['prix']; // Example field, adjust as per your form fields
$stock = $_POST['stock']; // Example field, adjust as per your form fields
$type = $_POST['type']; // Type added in JavaScript

// Handle the image file
$image = $_FILES['image']['name']; 


    if ($nom !== false && $prix !== false && $stock !== false && $id !== false && $type !== false && $image !== false) {


        if (
            $type === "Smart Watch"

        ) {
            try {
                // sql querry 
                $sql = "UPDATE watch SET nom_watch = :nom, prix = :prix, stock = :stock ,image = :image WHERE id_watch = :id";

                // Prepare and execute the SQL statement with bound parameters
                $res = $con->prepare($sql);
                $values = [
                    ':nom' => $nom,
                    ':prix' => $prix,
                    ':stock' => $stock,
                    ':image' => $image,
                    ':id' => $id
                ];
                // execute querry 
                $res->execute($values);
                // success message 
                echo "data updated succesfully ";
            } catch (PDOException $e) {
                echo "error message : " . $e->getMessage();
            }
        } elseif ($type === "Telephone") {

            try {
                $sql = "UPDATE telephone SET nom_tele = :nom, prix = :prix, stock = :stock , image =:image WHERE id_tel = :id";

                // Prepare and execute the SQL statement with bound parameters
                $res = $con->prepare($sql);
                $values = [
                    ':nom' => $nom,
                    ':prix' => $prix,
                    ':stock' => $stock,
                    ':image' => $image,
                    ':id' => $id
                ];
                $res->execute($values);
                echo "data updated succesfully ";
            } catch (PDOException $e) {
                echo "error message : " . $e->getMessage();
            }
        } elseif ($type === "Ordinateurs") {
            try {
                $sql = "UPDATE pc SET nom_pc = :nom, prix = :prix, stock = :stock WHERE id_pc = :id";

                // Prepare and execute the SQL statement with bound parameters
                $res = $con->prepare($sql);
                $values = [
                    ':nom' => $nom,
                    ':prix' => $prix,
                    ':stock' => $stock,

                    ':id' => $id
                ];
                $res->execute($values);
                echo "data updated succesfully ";
            } catch (PDOException $e) {
                echo "error message : " . $e->getMessage();
            }
        } elseif ($type === "Television") {
            try {
                $sql = "UPDATE tv SET nom_tv = :nom, prix = :prix, stock = :stock WHERE id_tv = :id";

                // Prepare and execute the SQL statement with bound parameters
                $res = $con->prepare($sql);
                $values = [
                    ':nom' => $nom,
                    ':prix' => $prix,
                    ':stock' => $stock,

                    ':id' => $id
                ];
                $res->execute($values);
                echo "data updated succesfully ";
            } catch (PDOException $e) {
                echo "error message : " . $e->getMessage();
            }
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
        echo "Invalid data format";
    }
} else {
    // Handle errors or invalid requests
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid request or missing resource ID";
}
