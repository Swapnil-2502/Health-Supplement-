<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $cname = $_POST['cname'];
    $subject = $_POST['subject'];

    // Email details
    $to = 'hajareswapnil.2502@gmail.com';
    $subject = 'New Form Submission';
    $body = "fname: $fname\nlname: $lname\ncname: $cname\nsubject: $subject";

    // Send email
    if (mail($to, $subject, $body)) {
        echo 'Message sent successfully!';
    } else {
        echo 'Error sending message.';
    }
}

?>