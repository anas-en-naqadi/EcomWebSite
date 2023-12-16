<?php 
session_start();


include "../dbConnect.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: *");

function getData($query){
    include "../dbConnect.php";

    $res = $con->query($query);
    $data = array();
    $data = $res->fetchAll(PDO::FETCH_ASSOC);
    return $data;

}
function getMarque(){
   
$marque="";
    if(isset($_POST['marque']) || $_POST['marque'] ? :[]){
$marque = $_POST['marque'];
        $query = " WHERE marque IN (' " .implode("','",$marque) . "')";
        $sql = "SELECT distinct marque FROM telephone $query GROUP BY marque";
        return getData($sql);

    }


}
function getColor(){
    $couleur="";
    if(isset($_POST['couleur']) || $_POST['couleur'] ? :[]){
        $couleur = $_POST['couleur'];
                $query = " WHERE couleur IN (' " .implode("','",$couleur) . "')";
                $sql = "SELECT distinct couleur FROM telephone $query GROUP BY couleur";
                return getData($sql);
        
            }
}
function getSe(){
    $se="";
    if(isset($_POST['se']) || $_POST['se'] ? :[]){
        $se = $_POST['se'];
                $query = " WHERE se IN (' " .implode("','",$se) . "')";
                $sql = "SELECT distinct se FROM telephone $query GROUP BY se";
                return getData($sql);
        
            }
}

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['se']) || $_POST['se'] ? :[]){
    echo json_encode(getSe());
    }
    if(isset($_POST['marque']) || $_POST['marque'] ? :[]){
        echo json_encode(getMarque());
        }
        if(isset($_POST['couleur']) || $_POST['couleur'] ? :[]){
            echo json_encode(getColor());
            }

}



if ($_SERVER['REQUEST_METHOD'] === 'GET') {
   
    $type = isset($_GET['type']) ? $_GET['type'] : "";


    $sql = "";
if(!empty($type)){
    switch ($type) {
        case "marque":
            $sql = "SELECT DISTINCT(marque) FROM telephone";
            break;
        case "se":
            $sql = "SELECT DISTINCT(se) FROM telephone";
            break;
        case "couleur":
            $sql = "SELECT DISTINCT(couleur) FROM telephone";
            break;
        default:
            echo "No type was Sent";
            exit; // Terminate execution if no type is sent
    }

    try {
        if ($sql !== "") {
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
        } else {
            exit; // Terminate execution if SQL query is empty
        }
    } catch (PDOException $e) {
        echo $e->getMessage();
    }}

} else {
    echo "Invalid request method";
}
?>
