[<?php
session_start();

    include "../dbConnect.php";


    header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *"); // Autoriser tous les en-têtes
    if ($_SERVER['REQUEST_METHOD'] === "POST") {
        if (
            isset(
                $_POST['WatchMarqueInp'],
                $_POST['Watchdiametre'],
                $_POST['WatcGrammesInp'],
                $_POST['WatcHauteurInp'],
                $_POST['WatcLargeurInp'],
                $_POST['WatcProfondeurInp'],
                $_POST['DescriptionProduits'],
                $_POST['NomProduit'],
                $_POST['PrixProduit'],
                $_POST['stock'],

            )
        ) {

            $imageFileName = basename($_FILES['image']['name']);









            try {
                if ($imageFileName) {
                  

                    $watchMarque = $_POST['WatchMarqueInp'];
                    $diametre = $_POST['Watchdiametre'];
                    $watchGrammes = $_POST['WatcGrammesInp'];
                    $watchHauteur = $_POST['WatcHauteurInp'];
                    $watchLargeur = $_POST['WatcLargeurInp'];
                    $watchProfondeur = $_POST['WatcProfondeurInp'];
                    $nomProduit = $_POST['NomProduit'];
                    $prixProduit = $_POST['PrixProduit'];
                    $desc = $_POST['DescriptionProduits'];
                    $stock = $_POST['stock'];
                } else {
                    echo "Error uploading image.";
                }
                $sql = "INSERT INTO watch (nom_watch, prix, description, marque, diametre, poids, hauteur, largeur, profondeur,stock,image)
    VALUES (:nom, :prix, :descr, :marque, :diametre, :poids, :hauteur, :largeur, :profondeur,:stock,:imag)";

                $res = $con->prepare($sql);

                $values = [
                    ':nom' => $nomProduit, // Remplace cette valeur par celle appropriée
                    ':prix' => $prixProduit, // Remplace cette valeur par celle appropriée
                    ':descr' => $desc, // Remplace cette valeur par celle appropriée
                    ':marque' => $watchMarque,
                    ':diametre' => $diametre,
                    ':poids' => $watchGrammes,
                    ':hauteur' => $watchHauteur,
                    ':largeur' => $watchLargeur,
                    ':profondeur' => $watchProfondeur,
                    'stock' => $stock,
                    'imag' => $imageFileName
                ];

                $result = $res->execute($values);

                if ($result) {
                    echo "Data inserted successfully";
                } else {
                    echo "Error: Failed to insert data";
                    // Check for specific errors: $res->errorInfo()
                }
            } catch (PDOException $e) {
                echo "error message : " . $e->getMessage();
            }
        } else {
            echo "fill all the inputs";
        }
    } else {
        echo "error post request ";
    }





    ?>