<?php
// Include PHPMailer library files
require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Create an instance of PHPMailer
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();                                        // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';                         // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                                 // Enable SMTP authentication
    $mail->Username = 'moon95636@gmail.com';               // SMTP username (your Gmail address)
    $mail->Password = 'vichu@001';                // SMTP password (your Gmail app password)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;     // Enable TLS encryption
    $mail->Port = 587;                                      // TCP port to connect to

    // Recipients
    $mail->setFrom($_REQUEST['email'], $_REQUEST['name']);
    $mail->addAddress('amudharvichu93@gmail.com');           // Add a recipient

    // Content
    $mail->isHTML(true);                                     // Set email format to HTML
    $mail->Subject = $_REQUEST['subject'];
    $mail->Body    = "
        <p><strong>Name:</strong> {$_REQUEST['name']}</p>
        <p><strong>Email:</strong> {$_REQUEST['email']}</p>
        <p><strong>Subject:</strong> {$_REQUEST['subject']}</p>
        <p><strong>Message:</strong><br>{$_REQUEST['message']}</p>
    ";

    // Send email
    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
