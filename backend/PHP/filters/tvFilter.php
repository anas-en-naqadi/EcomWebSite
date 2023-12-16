<?php 
session_start();
include "../dbConnect.php";
header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *");

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    if(isset($_GET['filter'],$_GET['value'])){
        $filter = $_GET['filter'];
        $value = $_GET['value'];
$sql = "";

        switch($filter){
            case "Marques" :
                $sql = "SELECT id_tv,nom_tv,prix,stock,image , marque  FROM tv WHERE marque = :val";  
                break;
            case "Prix"  :
                $sql = "SELECT id_tv,nom_tv,prix,stock,image , marque FROM tv WHERE prix = :val";
                break;

                        case "TAILLE ECRAN":
                            $sql = "SELECT id_tv,nom_tv,prix,stock,image , marque FROM tv WHERE taille_ecran = :val";
                            break;
                            case "NORME HD":
                                $sql = "SELECT id_tv,nom_tv,prix,stock,image , marque FROM tv WHERE norme_hd = :val";
                                break;
                    
                
            default :
                echo "No type was Sent";
                

        }
        try{
            $res = $con->prepare($sql);
            $res->execute([
                ":val" => strtolower($value)
            ]);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (count($data) >= 1) {
                // Convert the result to JSON and echo the response
                header('Content-Type: application/json');
                echo json_encode($data);
            } else {
                echo "No Phones Found with this filter";
            }
        }catch(PDOException $e){
        echo $e->getMessage();
    }
       }elseif(isset($_GET['type'])){
        $type = $_GET['type'];
        $sql ='';
        switch($type){
            
                case "marque" :
                    $sql =    "SELECT DISTINCT(marque) FROM tv";
                        break;

                            case "norme_hd"  :
                                $sql =   "SELECT DISTINCT(norme_hd) FROM tv";
                                break;

                                case "taille_ecran"  :
                                    $sql =   "SELECT DISTINCT(taille_ecran) FROM tv";
                                    break;
            default :
                echo "No type was Sent";
                

        }
        try{
            $res = $con->prepare($sql);
            $res->execute();
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (count($data) >= 1) {
                // Convert the result to JSON and echo the response
                header('Content-Type: application/json');
                echo json_encode($data);
            } else {
                echo "No Phones Found with this filter";
            }
        }catch(PDOException $e){
        echo $e->getMessage();
    }
        
       }else{
        echo "no data sent";
       }
    }else{
        echo "no method get";
    
    }









?>