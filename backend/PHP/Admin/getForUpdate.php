<?php

session_start();

include "../dbConnect.php";



header("Access-Control-Allow-Origin: *"); // Autoriser l'accès depuis n'importe quelle origine
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autoriser les méthodes HTTP spécifiées
header("Access-Control-Allow-Headers: *"); // Autoriser tous les en-têtes


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $select = $_GET['type'];
    $id = $_GET['idi'];
    if ($select == "Telephone") {

        try {
            $sql = "SELECT id_tel,nom_tele,image,stock,prix FROM telephone WHERE id_tel = :id";

            $res = $con->prepare($sql);
            $res->execute([
                ':id' => $id
            ]);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (count($data) >= 1) {
                echo json_encode($data);
            } else {
                echo "no data selected ";
            }
        } catch (PDOException $e) {
            echo "error message : " . $e->getMessage();
        }
    } elseif ($select == "Ordinateurs") {
        try {
            $sql = "SELECT id_pc,nom_pc,image,stock,prix FROM pc WHERE id_pc = :id";

            $res = $con->prepare($sql);
            $res->execute([
                ':id' => $id
            ]);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (count($data) >= 1) {
                echo json_encode($data);
            } else {
                echo "no data selected ";
            }
        } catch (PDOException $e) {
            echo "error message : " . $e->getMessage();
        }
    } elseif ($select == "Smart Watch") {

        try {
            $sql = "SELECT id_watch,nom_watch,image,stock,prix FROM watch WHERE id_watch = :id";

            $res = $con->prepare($sql);
            $res->execute([
                ':id' => $id
            ]);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (count($data) >= 1) {
                echo json_encode($data);
            } else {
                echo "no data selected ";
            }
        } catch (PDOException $e) {
            echo "error message : " . $e->getMessage();
        }
    } elseif ($select == "Television") {


        try {
            $sql = "SELECT id_tv,nom_tv,image,stock,prix FROM tv WHERE id_tv = :id";

            $res = $con->prepare($sql);
            $res->execute([
                ':id' => $id
            ]);
            $data = $res->fetchAll(PDO::FETCH_ASSOC);

            if (count($data) >= 1) {
                echo json_encode($data);
            } else {
                echo "no data selected ";
            }
        } catch (PDOException $e) {
            echo "error message : " . $e->getMessage();
        }
    }
} else {
    echo "error get method";
}
