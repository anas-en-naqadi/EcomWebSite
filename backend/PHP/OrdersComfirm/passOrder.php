
<?php
include "../dbConnect.php";


header('Allow-Control-Access-Origin:*');
header('Allow-Control-Access-Headers:*');
header('Allow-Control-Access-Methods:GET');

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    if (isset($_GET['type'])) {
        $type = $_GET['type'];
        $sql = "SELECT id_cmd FROM commande ORDER BY id_cmd DESC LIMIT 1";
        $res = $con->prepare($sql);
        $res->execute();
        $id_cmd = $res->fetch(PDO::FETCH_ASSOC);

        switch ($type) {
            case "orderDetails":
                if ($id_cmd) {
                    $stmt = "SELECT  
                        u.nom, u.prenom, u.email, u.phone, a.ville, 
                        a.address_line_1, a.code_postal, 
                        c.methode_pay, c.created_at, c.total, c.status, c.tracking_no
                    FROM 
                        users u 
                    INNER JOIN 
                        commande c ON u.id_user = c.id_user
                    INNER JOIN 
                        addresses a ON c.address_id = a.address_id
                    WHERE 
                        c.id_cmd = :id ";

                    $test = $con->prepare($stmt);
                    $test->bindParam(':id', $id_cmd['id_cmd']);
                    if ($test->execute()) {
                        $data = $test->fetch(PDO::FETCH_ASSOC);
                        if ($data['status'] === "confirmed") {
                            $sql = "SELECT * FROM produit_cmd WHERE cmd_id = :order_id";
                            $stmt = $con->prepare($sql);
                            $stmt->bindParam(':order_id', $id_cmd['id_cmd']);
                            $stmt->execute();
                            $order_products = $stmt->fetchAll(PDO::FETCH_ASSOC);
$total = 0;
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
                                    $update_sql = "UPDATE " . $productTables[$i] . " SET stock = stock - :quantity_ordered WHERE " . $productNames[$i] . " = :prod_name";
                                    $update_stmt = $con->prepare($update_sql);
                                    $update_stmt->bindParam(':quantity_ordered', $quantity_ordered);
                                    $update_stmt->bindParam(':prod_name', $prod_name);

                                    $update_stmt->execute();
                                   
                                }
                            }
                            echo json_encode($data);
                        } else {
                            // Not confirmed status
                            echo json_encode($data);
                        }
                    } else {
                        http_response_code(404);
                    }
                } else {
                    http_response_code(404);
                }
                break;
                
                case "OrderProd":
                    $sql = "SELECT * FROM produit_cmd where cmd_id = :id";
    
                    $res = $con->prepare($sql);
                    $res->bindParam('id', $id_cmd['id_cmd']);
    
                    if ($res->execute()) {
                        $data = $res->fetchAll(PDO::FETCH_ASSOC);
                        echo json_encode($data);
                    } else {
                        http_response_code(404);
                    }
    
                    break;
            

            default:
                echo json_encode(['status' => 'error type send']);
        }
    } else {
        echo json_encode(['status' => 'send the type pls']);
    }
} else {
    echo json_encode(['status' => 'error methode type']);
}
?>