

<?php
session_start();
include "../dbConnect.php";

header('Access-Allow-Control-Headers:*');
header('Access-Allow-Control-Methods: POST');
header('Access-Allow-Control-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['id_user'], $_POST['pay_id'], $_POST['status'],$_POST['id_add'],$_POST['pay_meth'])) {

        $id_user = $_POST['id_user'];
        $query = "SELECT quantite,nom_prod,prix_prod,image FROM pannier where id_user = :id_user";
        $res = $con->prepare($query);
        $res->execute([':id_user' => $id_user]);

        $data = $res->fetchAll(PDO::FETCH_ASSOC);
        $total = 0;
        if (count($data) > 0) {
            foreach ($data as  $value) {
                $total = $value['prix_prod'] * $value['quantite'];
            }
        } else {
            echo json_encode([
                'status' => 'no data found'
            ]);
            exit(0);
        }


        $pay_id = $_POST['pay_id'];
        $id_add = $_POST['id_add'];
        $tracking_no =  rand(111111111, 999999999);
        $pay_meth = $_POST['pay_meth'];
        $status = $_POST['status'];
        $sql = "INSERT INTO commande (id_user,address_id,tracking_no,total,methode_pay,payment_id,status)
                VALUES (:id,:add,:track,:total,:method,:pay_id,:status)";
        $res = $con->prepare($sql);
        $values = [
            ':id' => $id_user,
            ':add' => $id_add,
            ':track' => $tracking_no,
            ':total' => $total,
            ':pay_id' => $pay_id,
            ':method' => $pay_meth,
            ':status' => $status
        ];
        $res->execute($values);
        if ($res) {
            $id_cmd = $con->lastInsertId();
            foreach ($data as $row) {
                $qty = $row['quantite'];
                $prix = $row['prix_prod'];
                $image = $row['image'];
                $nom_prod = $row['nom_prod'];

                $sql = "INSERT INTO produit_cmd (cmd_id,nom_prod,qty,prix,image) VALUES (:cmd ,:nom,:qty,:prix,:image)";
                $stmt = $con->prepare($sql);
                $values = [
                    ':cmd' => $id_cmd,
                    ':nom' => $nom_prod,
                    ':qty' => $qty,
                    ':prix' => $prix,
                    ':image' => $image
                ];
                $stmt->execute($values);

                
            }
            echo json_encode(['status' => 'order paied successful']);
        } else {
            echo json_encode([
                'status' => 'no data inserted in commande'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'missing data'
        ]);
    }
} else {
    http_response_code(404);
}



















?>