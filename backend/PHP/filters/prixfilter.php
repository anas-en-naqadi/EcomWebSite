<?php




function filterByPrice($min, $max, $type)
{
    include "../dbConnect.php";

    switch ($type) {
        case "phone":
            $sql = "SELECT id_tel,nom_tele,image,stock,prix FROM telephone WHERE prix between :min AND :max";

            break;
        case "pc":
            $sql = "SELECT id_pc,nom_pc,image,stock,prix FROM pc WHERE prix between :min AND :max";

            break;
        case "watch":
            $sql = "SELECT id_watch,nom_watch,image,stock,prix FROM watch WHERE prix between :min AND :max";

            break;
        case "tv":
            $sql = "SELECT id_tv,nom_tv,image,stock,prix FROM tv WHERE prix between :min AND :max";

            break;

        default:
            echo json_encode(['message' => 'no match type']);
    }
    $stmt = $con->prepare($sql);
    $values = [
        ':min' => $min,
        ':max' => $max
    ];
    $stmt->execute($values);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return json_encode($result);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['min'], $_POST['max'], $_POST['type'])) {
        $min = $_POST['min'];
        $max = $_POST['max'];
        $type = $_POST['type'];
        echo filterByPrice($min, $max, $type);
    }
}
