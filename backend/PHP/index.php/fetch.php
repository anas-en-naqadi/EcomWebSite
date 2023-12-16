<?php
session_start();
include "../dbConnect.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: *");

function getName($name){
    include "../dbConnect.php";
    $tables = ['telephone','pc','watch','tv'];
    $tabNames = ['nom_tele','nom_pc','nom_watch','nom_tv'];
    $tabIds=['id_tel','id_pc','id_watch','id_tv'];
    $productNames = [];
    $row ="";

    // Loop through tables
    for ($i = 0; $i < count($tables); $i++){
        // Prepare the query with a LIMIT of 5
        $sql = "SELECT * FROM {$tables[$i]} WHERE {$tabNames[$i]} LIKE ? LIMIT 5";
        $stmt = $con->prepare($sql);
        
        // Bind and execute the query
        $searchName = "%{$name}%";
        $stmt->execute([$searchName]);

    
        
        // Append the results to the foundProducts array
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $product = [
                'table' => $tables[$i],
                'name' => $row[$tabNames[$i]],
                'id' => $row[$tabIds[$i]]
            ];
            $productNames[] = $product;
        }
    }

    return $productNames;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if(isset($_GET['name'])){
       echo json_encode(getName($_GET['name']));
    }
    if (isset($_GET['type'])) {
        $type = $_GET['type'];
      

        try {
            $sql = "";
            switch ($type) {
                case "Telephone":
                    $sql = "SELECT id_tel,nom_tele, prix, stock,image,marque FROM telephone";
                    break;
                case "SmartWatch":
                    $sql = "SELECT id_watch,nom_watch, prix, stock,image,marque FROM watch";
                    break;
                case "Ordinateurs":
                    $sql = "SELECT id_pc,nom_pc, prix, stock, image,marque FROM pc";
                    break;
                case "Television":
                    $sql = "SELECT id_tv,nom_tv, prix, stock , image,marque FROM tv";
                    break;
                default:
                    echo "Invalid type";
                    exit();
            }

            $res = $con->prepare($sql);
            $res->execute();
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (count($data) >= 1) {
                echo json_encode($data);
                
            } else {
                http_response_code(404); // Set 404 Not Found status code
                echo "No Data Found";
            }
        } catch (PDOException $e) {
            http_response_code(500); // Set 500 Internal Server Error status code
            echo "Error message: " . $e->getMessage();
        }
    } 
} else {
    http_response_code(405); // Set 405 Method Not Allowed status code
    echo "Method not allowed";
}
?>
