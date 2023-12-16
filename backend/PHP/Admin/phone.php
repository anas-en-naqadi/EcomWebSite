<?php

session_start();
include "../dbConnect.php";

header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: POST"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *"); // Autoriser tous les en-têtes
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if (

        isset($_POST['PhoneMarqueInp']) &&
        isset($_POST['PhoneTailEcran']) &&
        isset($_POST['PhoneRAMInp']) &&
        isset($_POST['PhoneStokage']) &&
        isset($_POST['PhoneOSInp']) &&
        isset($_POST['PhoneReseauInp']) &&
        isset($_POST['PhoneCouleurInp']) &&
        isset($_POST['PhoneCameraInp']) &&
        isset($_POST['PhoneGrammesPcInp']) &&
        isset($_POST['PhoneHauteurInp']) &&
        isset($_POST['PhoneLargeurInp']) &&
        isset($_POST['PhoneProfondeurInp']) &&
        isset($_POST['DescriptionProduits'], $_POST['NomProduit'], $_POST['PrixProduit'], $_POST['stock'])
    ) {

        $se = $_POST['PhoneOSInp'];

      


       $imageFileName = basename($_FILES['image']['name']);
        $marque = $_POST['PhoneMarqueInp'];
        $tailleEcran = $_POST['PhoneTailEcran'];
        $ram = $_POST['PhoneRAMInp'];
        $stockage = $_POST['PhoneStokage'];
        $os = $_POST['PhoneOSInp'];
        $reseau = $_POST['PhoneReseauInp'];
        $couleur = $_POST['PhoneCouleurInp'];
        $camera = $_POST['PhoneCameraInp'];
        $grammes = $_POST['PhoneGrammesPcInp'];
        $hauteur = $_POST['PhoneHauteurInp'];
        $largeur = $_POST['PhoneLargeurInp'];
        $profondeur = $_POST['PhoneProfondeurInp'];
        $nomProduit = $_POST['NomProduit'];
        $prixProduit = $_POST['PrixProduit'];
        $desc = $_POST['DescriptionProduits'];
        $stock = $_POST['stock'];


        try {
            if ($imageFileName) {
                

                $sql = "INSERT INTO telephone (nom_tele, prix, description, marque, taille_ecran, ram, stockage, se, reseau, couleur, qualite_camera, poids, hauteur, largeur, profondeur, stock, image)
            VALUES (:nom, :prix, :descr, :marque, :taille, :ram, :stockage, :se, :reseau, :couleur, :camera, :poids, :hauteur, :largeur, :profondeur, :stock, :imag)";

                $values = [
                    ':nom' => $nomProduit,         // Replace with appropriate variable
                    ':prix' => $prixProduit,       // Replace with appropriate variable
                    ':descr' => $desc,             // Replace with appropriate variable
                    ':marque' => $marque,          // Replace with appropriate variable
                    ':taille' => $tailleEcran,     // Replace with appropriate variable
                    ':ram' => $ram,                // Replace with appropriate variable
                    ':stockage' => $stockage,      // Replace with appropriate variable
                    ':se' => $se,                  // Replace with appropriate variable
                    ':reseau' => $reseau,          // Replace with appropriate variable
                    ':couleur' => $couleur,        // Replace with appropriate variable
                    ':camera' => $camera,          // Replace with appropriate variable
                    ':poids' => $grammes,          // Replace with appropriate variable
                    ':hauteur' => $hauteur,        // Replace with appropriate variable
                    ':largeur' => $largeur,        // Replace with appropriate variable
                    ':profondeur' => $profondeur,  // Replace with appropriate variable
                    ':stock' => $stock,            // Replace with appropriate variable
                    ':imag' => $imageFileName         // Replace with appropriate image variable or file name
                ];


                $res = $con->prepare($sql);
                $result =  $res->execute($values);
                if($result){
                 echo "data inserted succesfully ";
                }else{
                 echo "no data inserted";
                }
            } else {
                echo "error in uploading image";
            }
        } catch (PDOException $e) {
            echo "error sending request : " . $e->getMessage();
        }
    } else {
        echo "fill all the inputs";
    }
} else {
    echo "error post request ";
}
