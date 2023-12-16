<?php
include "../dbConnect.php";

header('Allow-Control-Access-Origin:*');
header('Allow-Control-Access-Headers:*');
header('Allow-Control-Access-Methods:GET');

if ($_SERVER['REQUEST_METHOD'] === "GET") {

    if (isset($_GET['case'])) {
        $case = $_GET['case'];
        $id_prod = $_GET['id'];
        $prod_name = $_GET['n'];

        $slct = "";
        $stock = 0;
        $update_sql = "";


        $productTables = ['pc', 'tv', 'telephone', 'watch'];
        $productNames = ['nom_pc', 'nom_tv', 'nom_tele', 'nom_watch'];

        for ($i = 0; $i < count($productTables); $i++) {
            $slct = "SELECT stock FROM " . $productTables[$i] . " WHERE " . $productNames[$i] . " = :prod_name";
            $res = $con->prepare($slct);
            $res->bindParam(':prod_name', $prod_name);

            $res->execute();
            $result = $res->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                $stock = $result['stock'];
                break;
            }
        }

        if ($stock) {
            $select_sql = "SELECT quantite FROM pannier WHERE id_prod = :id";
            $select_stmt = $con->prepare($select_sql);
            $select_stmt->bindParam(':id', $id_prod);
            $select_stmt->execute();
            $row = $select_stmt->fetch(PDO::FETCH_ASSOC);
            $quantite = $row['quantite'];
            if ($quantite) {
                if ($quantite < $stock) {
                    if ($case === 'plus') {
                        $update_sql = "UPDATE pannier SET quantite = quantite +1 WHERE id_prod = :id"; // Replace :id with the appropriate column name that represents the primary key of your 'pannier' table
                    } elseif ($case === 'moins') {
                        $update_sql = "UPDATE pannier SET quantite = quantite -1 WHERE id_prod = :id"; // Replace :id with the appropriate column name that represents the primary key of your 'pannier' table
                    }

                    $update_stmt = $con->prepare($update_sql);

                    $update_stmt->bindParam(':id', $id_prod); // Replace $pannier_id with the actual value you want to use

                    if ($update_stmt->execute()) {
                        $sql = "SELECT SUM(quantite * prix_prod) AS total FROM pannier";
                        $result = $con->query($sql);

                        if ($result) {
                            $row = $result->fetch(PDO::FETCH_ASSOC);
                            $total = $row['total'];
                            echo json_encode(['status' => 'success', 'total' => $total, 'message' => 'Quantite updated successfully']);
                        } else {
                            echo json_encode(['status' => 'error', 'message' => 'Failed to fetch total']);
                        }
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Failed to update quantite']);
                    }
                } else {
                    json_encode(['message' => 'Vous avez arriver le nombre du stock']);
                }
            }
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Send the case parameter']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
