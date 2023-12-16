<?php

session_start();
include "../dbConnect.php";
header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *");





if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $type = $_GET['type'];
       
        switch($type){
            case "Telephone":
                $sql = "SELECT  nom_tele, prix, description, marque, taille_ecran, ram, stockage, se, reseau,
                couleur, qualite_camera, poids, hauteur, largeur, profondeur,battery, stock, image FROM telephone WHERE id_tel = :id";
                break;
            case "Television" :
                $sql = "SELECT  nom_tv, prix, description, marque, taille_ecran, norme_hd,smart_tv, resolution, wifi, type_eclairage,
                 poids, hauteur, largeur, profondeur, stock, image FROM tv WHERE id_tv = :id";
                 break;
            case "Pc" :
                $sql = "SELECT  nom_pc, prix, description, marque, taille_ecran, ram, stockage, se, carte_graphique,
                couleur, frequence,processeur,battery,type_stockage, poids, hauteur, largeur, profondeur,battery, stock, image FROM pc WHERE id_pc= :id";
                break;
            case "Watch" :
                $sql = "SELECT nom_watch, prix, description, marque, diametre,
                poids, hauteur, largeur, profondeur, stock, image FROM watch WHERE id_watch = :id";
                break;
            default:
                echo "Error Type Value";
        }
        try{
           
             $res = $con->prepare($sql);
             $check = $res->execute([
                ':id' => $id
             ]);
             if($check){
                $data = $res->fetch(PDO::FETCH_ASSOC);
                if (count($data) >= 1) {
                    echo json_encode($data);
                }else{
                    echo "No Data Found";
                }
             }else{
                echo "Error Executing Querry";
             }
           
    }catch(PDOException$e){
        echo "Error: " . $e->getMessage();
     }
 
}else{
    echo "Error Getting Id";
}
}else{
    
    echo "Eroor Method Get";
}