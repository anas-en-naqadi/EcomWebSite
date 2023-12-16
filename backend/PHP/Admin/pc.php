<?php

session_start();
include "../dbConnect.php";

header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods:  POST"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *"); // Autoriser tous les en-têtes
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if (
        isset($_POST['PcMarqueInp']) &&
        isset($_POST['PcCoulourInp']) &&
        isset($_POST['PcTailEcInp']) &&
        isset($_POST['PcRamInp']) &&
        isset($_POST['PcFrequence']) &&
        isset($_POST['PcStockage']) &&
        isset($_POST['PcCarteGraphInp']) &&
        isset($_POST['PcOSPcInp']) &&
        isset($_POST['PcGrammesInp']) &&
        isset($_POST['PcHauteurInp']) &&
        isset($_POST['PcLargeurInp']) &&
        isset($_POST['PcProfondeurInp']) &&
        isset($_POST['DescriptionProduits'], $_POST['NomProduit'], $_POST['PrixProduit'], $_POST['stock'], $_POST['PcDisquedure'])&&
        isset($_POST['PcProcesseurPcInp'],$_POST['PcBatteryInp'])
        )
     {

        $imageFileName = basename($_FILES['image']['name']);
        $frequence = $_POST['PcFrequence'];
        $pcMarque = $_POST['PcMarqueInp'];
     
        $pcTailleEcran = $_POST['PcTailEcInp'];
        $pcRAM = $_POST['PcRamInp'];
        $type_stock = $_POST['PcDisquedure'];
        $stockage = $_POST['PcStockage'];
        $pcCarteGraphique = $_POST['PcCarteGraphInp'];
        $pcOS = $_POST['PcOSPcInp'];
        $pcCouleur = $_POST['PcCoulourInp'];
        $pcGrammes = $_POST['PcGrammesInp'];
        $pcHauteur = $_POST['PcHauteurInp'];
        $pcLargeur = $_POST['PcLargeurInp'];
        $pcProfondeur = $_POST['PcProfondeurInp'];
        $nomProduit = $_POST['NomProduit'];
        $prixProduit = $_POST['PrixProduit'];
        $desc = $_POST['DescriptionProduits'];
        $stock = $_POST['stock'];
        $processeur = $_POST['PcProcesseurPcInp'];
        $battery = $_POST['PcBatteryInp'];



        try {
            if ($imageFileName) {
                
                $sql = "INSERT INTO pc (nom_pc, prix, description, marque, taille_ecran, ram, stockage, type_stockage, se, carte_graphique, couleur, frequence,processeur,battery, poids, hauteur, largeur, profondeur, stock, image)
            VALUES (:nom, :prix, :descr, :marque, :taille, :ram, :stockage, :types, :se, :carte, :couleur, :frequence,:processeur,:battery, :poids, :hauteur, :largeur, :profondeur, :stock, :imag)";


                $res = $con->prepare($sql);
                $values = [
                    ':nom' =>  $nomProduit, // Remplace cette valeur par celle appropriée
                    ':prix' =>  $prixProduit, // Remplace cette valeur par celle appropriée
                    ':descr' => $desc, // Remplace cette valeur par celle appropriée
                    ':marque' => $pcMarque,
                    ':taille' => $pcTailleEcran,
                    ':ram' => $pcRAM,
                    ':stockage' => $stockage, // Remplace cette valeur par celle appropriée
                    ':types' => $type_stock, // Remplace cette valeur par celle appropriée
                    ':se' => $pcOS,
                    ':carte' => $pcCarteGraphique,
                    ':couleur' => $pcCouleur,
                    ':frequence' => $frequence, 
                    ':processeur' => $processeur,
                    ':battery' => $battery,
                    ':poids' => $pcGrammes,
                    ':hauteur' => $pcHauteur,
                    ':largeur' => $pcLargeur,
                    ':profondeur' => $pcProfondeur,
                    'stock' => $stock,
                    'imag' => $imageFileName
                ];
               $result =  $res->execute($values);
               if($result){
                echo "data inseted succesfully ";
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
        echo "insuffusant data";
    }
} else {
    echo "error post request ";
}
