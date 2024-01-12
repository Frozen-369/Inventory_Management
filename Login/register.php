<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include('../connection.php');



    $username = trim($_POST["username"]);
    $upassword = trim($_POST["upassword"]);
    $cpassword = trim($_POST["cpassword"]);
    $email = trim($_POST["email"]);
    $phone_number = trim($_POST["phoneNum"]);

    $response['status'] = 'error';
    if (empty($username)) {
        $response['message'] = 'Please fill out Username field.';
    } elseif (strlen($username) < 6) {
        $response['message'] = 'Username must have at least 6 characters.';
    } elseif (empty($upassword)) {
        $response['message'] = 'Please fill out password field.';
    } elseif (!preg_match('/(?=.*[A-Z])/', $upassword)) {
        $response['message'] = 'The password must contain one uppercase letter.';
    } elseif (!preg_match('/(?=.*[a-z])/', $upassword)) {
        $response['message'] = 'The password must contain one lowercase letter.';
    } elseif (!preg_match('/(?=.*\d)/', $upassword)) {
        $response['message'] = 'The password must contain one number.';
    } elseif (empty($cpassword)) {
        $response['message'] = 'Please confirm the password.';
    } elseif ($upassword != $cpassword) {
        $response['message'] = 'Please enter the same password in both field.';
    } elseif (empty($email)) {
        $response['message'] = 'Please fill out email field.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email address.';
    } elseif (!isset($_POST['ageRange'])) {
        $response['message'] = 'Please select an Age Range.';
    } elseif (empty($phone_number)) {
        $response['message'] = 'Please fill out Phone number field.';
    } elseif (!isset($_POST["acceptTerms"])) {
        $response['message'] = 'Please check the terms and conditions box.';
    } else {

        // Check if the email already exists in the database
        $check_email = "SELECT * FROM register WHERE email = '$email'";
        $check_user = "SELECT * FROM register WHERE username = '$username'";
        $Result_email = mysqli_query($conn, $check_email);
        $Result_user = mysqli_query($conn, $check_user);

        if (mysqli_num_rows($Result_email) > 0) {
            $response['message'] = 'Email address already exists. Please use a different email.';
        } elseif (mysqli_num_rows($Result_user) > 0) {
            $response['message'] = 'Username already exists. Please use a different Username.';
        } else {

            $password = password_hash($cpassword, PASSWORD_DEFAULT);
            $age_range = $_POST['ageRange'];
            $sql = "INSERT INTO register(email, username, password, ageRange, phoneNum) 
            VALUES('$email','$username','$password','$age_range','$phone_number')";

            $qry = mysqli_query($conn, $sql) or die(mysqli_error($conn));
            if ($qry) {

                $response['status'] = 'success';
                $response['message'] = 'Registered Successfully';

            } else {
                header("Location: register.php");
            }
        }

    }
    echo json_encode($response);
}


?>