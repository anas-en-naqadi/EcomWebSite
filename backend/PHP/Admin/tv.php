<?php
session_start();

include "../dbConnect.php";

header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *"); // Autoriser tous les en-têtes
if ($_SERVER['REQUEST_METHOD'] === "POST") {

    if (
        isset(
            $_POST['TVMarqueInp'],
            $_POST['TVSmartInp'],
            $_POST['TVTypeEclairageInp'],
            $_POST['TVHDInp'],
            $_POST['TVWifiInp'],

            $_POST['TVGrammesInp'],
            $_POST['TVHauteurInp'],
            $_POST['TVLargeurInp'],
            $_POST['TVProfondeurInp'],
            $_POST['DescriptionProduits'],
            $_POST['NomProduit'],
            $_POST['PrixProduit'],
            $_POST['stock'],

        )
    ) {  $imageFileName = basename($_FILES['image']['name']);
        $resolution = $_POST['TVResoulitionInp'];
        $ecran = $_POST['TVecran'];
        $tvMarque = $_POST['TVMarqueInp'];
        $tvSmart = $_POST['TVSmartInp'];
        $tvTypeEclairage = $_POST['TVTypeEclairageInp'];
        $tvHD = $_POST['TVHDInp'];
        $tvWifi = $_POST['TVWifiInp'];

        $tvGrammes = $_POST['TVGrammesInp'];
        $tvHauteur = $_POST['TVHauteurInp'];
        $tvLargeur = $_POST['TVLargeurInp'];
        $tvProfondeur = $_POST['TVProfondeurInp'];
        $nomProduit = $_POST['NomProduit'];
        $prixProduit = $_POST['PrixProduit'];
        $desc = $_POST['DescriptionProduits'];
        $stock = $_POST['stock'];

        try {
            if ($imageFileName) {
               

                $sql = "INSERT INTO tv (nom_tv, prix, description, marque, taille_ecran, smart_tv ,  norme_hd, resolution, wifi,type_eclairage,poids, hauteur, largeur, profondeur,stock,image)
                VALUES (:nom, :prix, :descr, :marque,:ecran,:smart, :hd,:resolution, :wifi,:eclairage, :poids, :hauteur, :largeur, :profondeur,:stock,:imag)";

                $res = $con->prepare($sql);
                $values = [
                    ':nom' => $nomProduit,
                    ':prix' => $prixProduit,
                    ':descr' => $desc,
                    ':marque' => $tvMarque,
                    ':ecran' => $ecran,
                    ':smart' => $tvSmart,
                    ':resolution' => $resolution,
                    ':eclairage' => $tvTypeEclairage,
                    ':hd' => $tvHD,
                    ':wifi' => $tvWifi,

                    ':poids' => $tvGrammes,
                    ':hauteur' => $tvHauteur,
                    ':largeur' => $tvLargeur,
                    ':profondeur' => $tvProfondeur,
                    ':stock' => $stock,
                    ':imag' => $imageFileName
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
            echo "error message : " . $e->getMessage();
        }
    } else {
        echo "fill all the  selected values ";
    }
} else {
    echo "error post request ";
}
