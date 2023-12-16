<?php
session_start();
include "../dbConnect.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET");

function get(
    $res
) {
    $res->execute();

    if ($res) {
        $data = $res->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(['status' => 'error getting data']);
    }
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
 
    if (isset($_GET['id']) || isset($_GET['type']) || isset($_GET['cmd'])) {
        $id_cmd = $_GET['cmd'];
        $type = $_GET['type'];
       

        switch ($type) {
            case "users":
                $sql = " SELECT * FROM users";
                $res = $con->query($sql);
               echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));
                break;
            case "orderDetails":
                $id_user = $_GET['id'];
                $sql = "SELECT 
                            u.nom, u.prenom, u.email, u.phone, a.ville, 
                            a.address_line_1, a.code_postal, c.id_cmd,
                            c.methode_pay, c.created_at, c.total, c.status, c.id_user, c.tracking_no
                        FROM 
                            users u 
                        INNER JOIN 
                            commande c ON u.id_user = c.id_user
                        INNER JOIN 
                            addresses a ON c.address_id = a.address_id
                        WHERE 
                            u.id_user = :id AND c.id_cmd = :id_cmd";

                $res = $con->prepare($sql);
                $res->bindParam(':id', $id_user);
                $res->bindParam(':id_cmd', $id_cmd);
                get($res);
                break;

            case "orders":
                $sql = "SELECT * FROM commande";
                $res = $con->prepare($sql);
                get($res);
                break;

            case "OrderProd":
                $sql = "SELECT * FROM produit_cmd where cmd_id = :id";
                $res = $con->prepare($sql);
                $res->bindParam(':id', $id_cmd);
                get($res);
                break;

            case "validate":
                try {
                    $stmt = "UPDATE commande SET status = :status WHERE id_cmd = :id";
                    $res = $con->prepare($stmt);
                    if ($res->execute([
                        ':status' => 'confirmed',
                        ':id' => $id_cmd
                    ])) {
                        $sql = "SELECT * FROM produit_cmd WHERE cmd_id = :order_id";
                        $stmt = $con->prepare($sql);
                        $stmt->bindParam(':order_id', $id_cmd);
                        $stmt->execute();
                        $order_products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                        $total = 0 ;
                        foreach ($order_products as $product) {
                            $prod_name = $product['nom_prod'];
                            $quantity_ordered = $product['qty'];
                            $prix_prod = $product['prix'];
                            $total =  $prix_prod * $quantity_ordered;
                            $image = $product['image'];
                            $stmt = "INSERT INTO ventes(nom_prod,prix_prod,quantite,total,image)
                             VALUES (:nom,:prix,:qty,:total,:image)";

                            $res = $con->prepare($stmt);
                            $values=[
                                ':nom' => $prod_name,
                                ':prix'=> $prix_prod,
                                ':qty' => $quantity_ordered,
                                ':total' => $total,
                                ':image' => $image
                            ];
                            $res->execute($values);

                            $productTables = ['pc', 'tv', 'telephone', 'watch'];
                            $productNames = ['nom_pc', 'nom_tv', 'nom_tele', 'nom_watch'];

                            for ($i = 0; $i < count($productTables); $i++) {
                                $update_sql = "UPDATE " . $productTables[$i] . " SET stock = stock - :quantity_ordered WHERE " . $productNames[$i] . " = :prod_name ";
                                $update_stmt = $con->prepare($update_sql);
                                $update_stmt->bindParam(':quantity_ordered', $quantity_ordered);
                                $update_stmt->bindParam(':prod_name', $prod_name);
                                $update_stmt->execute();
                            }
                        }
                        echo json_encode(['status' => 'success']);
                    } else {
                        echo json_encode(['status' => 'error']);
                    }
                } catch (PDOException $e) {
                    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
                }
                break;

            default:
                echo json_encode(['status' => 'invalid request type']);
        }

      
    } else {
        echo json_encode(['status' => 'missing parameters']);
    }
} else {
    echo json_encode(['status' => 'invalid request method']);
}
