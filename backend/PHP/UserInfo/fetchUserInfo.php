<?php
session_start();
include "../dbConnect.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,PUT,GET');
header('Access-Control-Allow-Headers: *');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['UserAdresse'], $_POST['Userregions'], $_POST['UserVille'], $_POST['UserCP'])) {
        try {
            $sql = "INSERT INTO addresses (id_user,address_line_1,ville,province,code_postal,pays)
            VALUES (:id,:addresse,:ville,:province,:code,:pays)";

            $res = $con->prepare($sql);
            $values = [
                ':id' => $_POST['id_user'],
                ':addresse' => $_POST['UserAdresse'],
                ':ville' => $_POST['UserVille'],
                ':province' => $_POST['Userregions'],
                ':code' => $_POST['UserCP'],
                ':pays' => 'MAROC'
            ];
            
            $res->execute($values);
            if($res){
                echo json_encode(["status"=>"success"]);
            }
            if (!$res) {
                echo json_encode(["status" => "error", "message" => "Erreur lors de l'ajout"]);
                echo http_response_code(404);
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }else{
        echo json_encode(['status'=> 'send all data']);
    }
}

if ($_SERVER['REQUEST_METHOD'] == "PUT" || $_SERVER['REQUEST_METHOD'] == "GET") {
    try {
        $id = $_GET['id'];
$type = $_GET['type'];
$sql="";
        switch ($type) {
            case "user":
                $sql = "SELECT * FROM users WHERE id_user = :id";
                break;
            case "addresse":
                $sql = "SELECT * FROM addresses WHERE id_user = :id LIMIT 1";
                break;
            case "allAdresse":
                $sql = "SELECT DISTINCT *
                 FROM addresses a
                 INNER JOIN users u 
                 on a.id_user = u.id_user
                 WHERE u.id_user = :id ";
                break;
            default:
                echo http_response_code(404);
        }
        $res = $con->prepare($sql);
        $res->execute([':id' => $id]);
        $data1 = $res->fetchAll(PDO::FETCH_ASSOC);
    

        $data2 = json_decode(file_get_contents("php://input"), true);

        if (empty($data2)) {



            if (count($data1)>=1) {
                echo json_encode($data1);
            } else {
                echo json_encode(['status' => 'no data found']);
            }
        } else {
            try {
                $sql2 = "UPDATE users SET nom = :nom, prenom = :prenom, email = :email WHERE id_user = :id";
                $values = [
                    ':nom' => $data2['nom'],
                    ':prenom' => $data2['prenom'],
                    ':email' => $data2['email'],
                    ':id' => $id
                ];

                if (password_verify(password_hash($data2['actPass'], PASSWORD_DEFAULT), $data1['pass'])) {
                    $newPass = password_hash($data2['newPass'], PASSWORD_DEFAULT);
                    $sql2 = "UPDATE users SET nom = :nom, prenom = :prenom, email = :email, pass = :pass WHERE id_user = :id";
                    $values[':pass'] = $newPass;
                } else {
                    $status = ['status' => 'wrong password'];
                }

                $res = $con->prepare($sql2);
                $res->execute($values);

                if ($res) {
                    if (!isset($status)) {
                        $status = ['status' => true];
                    }
                    echo json_encode($status);
                } else {
                    echo json_encode(['status' => false]);
                }
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
?>