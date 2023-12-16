<?php


session_start();
include "../dbConnect.php";



header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *"); // Autoriser tous les en-têtes


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['type'])) {
        $select = $_GET['type'];
        try {
            switch ($select) {
                case "Telephone":
                    $sql = "SELECT id_tel,nom_tele,image,stock,prix FROM telephone";
                    break;
                case "Ordinateurs":
                    $sql = "SELECT id_pc,nom_pc,image,stock,prix FROM pc";
                    break;
                case "Smart Watch":
                    $sql = "SELECT id_watch,nom_watch,image,stock,prix FROM watch";
                    break;
                case "Television":
                    $sql = "SELECT id_tv,nom_tv,image,stock,prix FROM tv ";
                    break;
            }

            $res = $con->prepare($sql);
            $res->execute();
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (count($data) >= 1) {
                echo json_encode($data);
            } else {
                echo  http_response_code(404);
                echo json_encode(['status'=>"no data selected "]);
            }
        } catch (PDOException $e) {
            echo "error message : " . $e->getMessage();
        }
    } else {
        echo http_response_code(404);
        echo json_encode(['status'=>"No Value Set"]);
       
    }
} else {
    echo "error get method";
}
