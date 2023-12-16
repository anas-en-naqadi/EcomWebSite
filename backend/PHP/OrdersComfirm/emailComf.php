<?php
// Generate a unique token
session_start();
include"../dbConnect.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


if(isset($_GET['id'])){
$id = $_GET['id'];

$sql = "SELECT email From users WHERE id_user = :id";
$res = $con->prepare($sql);
$res->execute([':id'=>$id]);


if ($res){
$row = $res->fetch(PDO::FETCH_ASSOC);
$email = $row['email'];

require __DIR__ . "/../vendor/autoload.php";



// Create a PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Enable SMTP debugging (optional)
    $mail->SMTPDebug = SMTP::DEBUG_OFF;

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Set up SMTP configuration for Gmail
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->Host = "smtp.gmail.com"; // Gmail SMTP server
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587; // Use 587 for TLS
    $mail->Username = "invoicegen23@gmail.com"; // Your Gmail email address
    $mail->Password = "xaiehquremzjbygd"; // Your Gmail app password

    // Set email attributes
    $mail->addCustomHeader("List-Unsubscribe: <mailto:invoicegen23@gmail.com?subject=Unsubscribe>");
    $mail->setFrom("invoicegen23@gmail.com", "invoiceGen");
    $mail->addAddress($email);
    $mail->Subject = "Order Confirmation";
    $mail->isHtml(true);
    $emailBody = "
    <p>Dear Customer,</p>
    <p>Thank you for your order!</p>
    <p>Your order has been confirmed. To view the order details, click the button below:</p>
    <a href='http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/orderDetails.html' style='display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;'>View Order Details</a>
    <p>If the button above doesn't work, you can also copy and paste the following URL into your browser's address bar:</p>
    <p><a href='http://localhost:3000/EcomWebSite-main2/Site%20Web%20Ecommerce/Frontend/Html/orderDetails.html'>https://store.com/order-details</a></p>
    <p>Thank you,</p>
    <p>Your Company Name</p>
";
    // Email content with the reset token
    $mail->Body = $emailBody;
   

    // Send the email
    if ($mail->send()) {
        echo "Comfirmation  email sent. Please check your inbox.";
        
    }

   
} catch (Exception $e) {
    echo "Message could not be sent. Mailer error: {$mail->ErrorInfo}";
}
}else{
    echo "no email was found";
}}else{
    echo "no id sent";
}