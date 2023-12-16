
<?php  


try{
$con = new PDO("mysql:host=localhost;dbname=ecomweb","root","");
}catch (PDOException $e){

    echo "error message : " . $e->getMessage();
}



?>