<?php
 session_start();
include "../dbConnect.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['Email'], $_POST['Pass'])) {

        $email = $_POST['Email'];
        $pass = $_POST['Pass'];

        if($pass == "12345" && $email == "admin@gmail.com"){
           echo json_encode(['status' => 'admin']);
        }else{

        

        $sql = "SELECT id_user,nom,email, pass FROM users WHERE email = :email";
        $res = $con->prepare($sql);
        $res->execute([
            ':email' => $email
        ]);
        $data = $res->fetch(PDO::FETCH_ASSOC);

        if ($data) {

           
            if (password_verify($pass, $data['pass'])) {
               $_SESSION['id_user' ] = $data['id_user'];
               $_SESSION['user_name'] = $data['nom'];

               echo json_encode(['id_user' =>  $_SESSION['id_user' ]  ,'user_name'=>  $_SESSION['user_name']  , 'status' => "user"]);
              
               
            } else {
                $_SESSION['id_user'] ="";
                echo json_encode( ['status'=>'Wrong Password']);
            }
        } else {
            echo "Email not Exist";
        }
    }
    } else {
        echo "Missing Parameters";
    }
} else {
    echo "Error GET Method";
}
?>
