<?php
include "../dbConnect.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['Nom'], $_POST['Prenom'], $_POST['Email'], $_POST['Pass'], $_POST['Phone'])) {
        try {
            $nom = $_POST['Nom'];
            $prenom = $_POST['Prenom'];
            $email = $_POST['Email'];
            $password = $_POST['Pass'];
          
            $telephone = $_POST['Phone'];
           
            if (strlen($password) > 8) {
              
                    // Password hashing for better security
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                    $sql = "INSERT INTO users (nom, prenom, email, pass, phone) VALUES (:nom, :prenom, :email, :pass, :phone)";
                    $res = $con->prepare($sql);
                    $values = [
                        ':nom' => $nom,
                        ':prenom' => $prenom,
                        ':email' => $email,
                        ':pass' => $hashedPassword,
                        ':phone' => $telephone
                    ];
                    $check = $res->execute($values);
                    if ($check) {
                        echo "Inscription reussie"; // Successful registration message
                    } else {
                        echo "Erreur d'inscription"; // Error message for failed registration
                    }
               
            } else {
                echo "The Password is Too Short"; // Password length error message
            }
        } catch (PDOException $e) {
            echo "Error Message: " . $e->getMessage(); // Generic error message for PDO exceptions
        }
    } else {
        echo "Fill all the Inputs"; // Input validation message
    }
} else {
    echo "Error: Invalid HTTP Method"; // Invalid HTTP method error message
}
?>
