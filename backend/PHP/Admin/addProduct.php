
<?php
session_start();
include "../dbConnect.php";
if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $select = $_POST['selectProdect'];
    if ($select === "Télephone") {

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
            isset($_POST['PhoneLargeurPcInp']) &&
            isset($_POST['PhoneProfondeurPcInp']) &&
            isset($_POST['DescriptionProduits'], $_POST['NomProduit'], $_POST['PrixProduit'] ,$_POST['stock'], $_FILES['image'])
        ) {

            $se = $_POST['PhoneOSInp'];

            $marque = $_POST['PhoneMarqueInp'] ?? '';
            $tailleEcran = $_POST['PhoneTailEcran'] ?? '';
            $ram = $_POST['PhoneRAMInp'] ?? '';
            $stockage = $_POST['PhoneStokage'] ?? '';
            $os = $_POST['PhoneOSInp'] ?? '';
            $reseau = $_POST['PhoneReseauInp'] ?? '';
            $couleur = $_POST['PhoneCouleurInp'] ?? '';
            $camera = $_POST['PhoneCameraInp'] ?? '';
            $grammes = $_POST['PhoneGrammesPcInp'] ?? '';
            $hauteur = $_POST['PhoneHauteurInp'] ?? '';
            $largeur = $_POST['PhoneLargeurPcInp'] ?? '';
            $profondeur = $_POST['PhoneProfondeurPcInp'] ?? '';
            $nomProduit = $_POST['NomProduit'];
            $prixProduit = $_POST['PrixProduit'];
            $desc = $_POST['DescriptionProduits'];
            $stock = $_POST['stock'];
            $image = $_FILES['image'];

            try {
                $sql = "INSERT INTO telephone (nom_tele,prix,description,marque,taille_ecran,ram,stockage,se ,reseau,couleur,qualite_camera,poids,hauteur,largeur,profondeur,stock,image) VALUES
                 (:nom,:prix,:descr,:marque,:taille,ram,:stockage,:se,:reseau,:couleur,:camera,:poids,:hauteur,:largeur,:profondeur,:stock,:imag)";

                $values = [
                    ':nom' => $nomProduit,             // Assuming $nomProduit is the variable for 'NomProduit'
                    ':prix' => $prixProduit,           // Assuming $prixProduit is the variable for 'PrixProduit'
                    ':descr' => $desc,   // You can replace this with the actual value for 'description'
                    ':marque' => $marque,              // Assuming $marque is the variable for 'marque'
                    ':taille' => $tailleEcran,         // Assuming $tailleEcran is the variable for 'taille_ecran'
                    ':ram' => $ram,                    // Assuming $ram is the variable for 'ram'
                    ':stockage' => $stockage,          // Assuming $stockage is the variable for 'stockage'
                    ':se' => $se,                      // Assuming $se is the variable for 'se'
                    ':reseau' => $reseau,              // Assuming $reseau is the variable for 'reseau'
                    ':couleur' => $couleur,            // Assuming $couleur is the variable for 'couleur'
                    ':camera' => $camera,              // Assuming $camera is the variable for 'qualite_camera'
                    ':poids' => $grammes,              // Assuming $grammes is the variable for 'poids'
                    ':hauteur' => $hauteur,            // Assuming $hauteur is the variable for 'hauteur'
                    ':largeur' => $largeur,            // Assuming $largeur is the variable for 'largeur'
                    ':profondeur' => $profondeur  ,      // Assuming $profondeur is the variable for 'profondeur'
                    'stock' => $stock,
                    'imag' => $image
                ];

                $res = $con->prepare($sql);
                $res->execute($values);
            } catch (PDOException $e) {
                echo "error sending request : " . $e->getMessage();
            }
        }else{
            echo "no data inserted";
        }
    } elseif ($select === "Ordinateurs") {

       
    } elseif ($select === "Smart Watch") {
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
                $_FILES['image']
            )
        ) {

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
            $image = $_FILES['image'];

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
                'imag' => $image
            ];

            $res->execute($values);
        }
    } elseif ($select === "Television") {

        if (
            isset(
                $_POST['TVMarqueInp'],
                $_POST['TVSmartInp'],
                $_POST['TVTypeEclairageInp'],
                $_POST['TVHDInp'],
                $_POST['TVWifiInp'],
                $_POST['TvCoulourInp'],
                $_POST['TVGrammesInp'],
                $_POST['TVHauteurInp'],
                $_POST['TVLargeurInp'],
                $_POST['TVProfondeurInp'],
                $_POST['DescriptionProduits'],
                $_POST['NomProduit'],
                $_POST['PrixProduit'],
                $_POST['stock'],
                $_FILES['image']
            )
        ) {
            $tvMarque = $_POST['TVMarqueInp'];
            $tvSmart = $_POST['TVSmartInp'];
            $tvTypeEclairage = $_POST['TVTypeEclairageInp'];
            $tvHD = $_POST['TVHDInp'];
            $tvWifi = $_POST['TVWifiInp'];
            $tvCoulour = $_POST['TvCoulourInp'];
            $tvGrammes = $_POST['TVGrammesInp'];
            $tvHauteur = $_POST['TVHauteurInp'];
            $tvLargeur = $_POST['TVLargeurInp'];
            $tvProfondeur = $_POST['TVProfondeurInp'];
            $nomProduit = $_POST['NomProduit'];
            $prixProduit = $_POST['PrixProduit'];
            $desc = $_POST['DescriptionProduits'];
            $stock = $_POST['stock'];
            $image = $_FILES['image'];

            $sql = "INSERT INTO tv (nom_tv, prix, description, marque, taille_ecran, smart_tv , type_stockage, norme_hd, resolution, wifi,type_eclairage,poids, hauteur, largeur, profondeur,stock,image)
                    VALUES (:nom, :prix, :descr, :marque, :smart, :eclairage, :hd, :wifi, :couleur, :poids, :hauteur, :largeur, :profondeur,:stock,:imag)";

            $res = $con->prepare($sql);
            $values = [
                'nom' => $nomProduit,
                'prix' => $prixProduit,
                'descr' => $desc,
                'marque' => $tvMarque,
                'smart' => $tvSmart,
                'eclairage' => $tvTypeEclairage,
                'hd' => $tvHD,
                'wifi' => $tvWifi,
                'couleur' => $tvCoulour,
                'poids' => $tvGrammes,
                'hauteur' => $tvHauteur,
                'largeur' => $tvLargeur,
                'profondeur' => $tvProfondeur,
                'stock' => $stock,
                'imag' => $image
            ];
            $res->execute($values);
        }
    } else {
        echo "no values selected";
    }
}else{
    echo "no post detected";
}















?>
