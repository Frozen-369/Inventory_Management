<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    include('connection.php');

    $username = trim($_POST["username"]);
    $upassword = trim($_POST["upassword"]);
    $cpassword = trim($_POST["cpassword"]);
    $email = trim($_POST["email"]);
    $phone_number = trim($_POST["phoneNum"]);


    if(empty($username)) {
        echo "Please fill out username field.";
    }

    elseif(strlen($username) <6) {
        echo "Username must have at least 6 characters.";
    }

    elseif(empty($upassword)) {
        echo "Please fill out password field.";
    }

    elseif(empty($cpassword)) {
        echo "Please confirm the password.";
    }

    elseif($upassword != $cpassword){
        echo "Please enter the same password in both field.";
    }

    elseif(empty($email)) {
        echo "Please fill out email field.";
    }
    
    elseif (!isset($_POST['ageRange'])) {
        echo "Please select an Age Range.";
    } 

    elseif(empty($phone_number)) {
        echo "Please fill out Phone number field.";
    }

    elseif(!isset($_POST["acceptTerms"])) {
        echo "Please check the terms and conditions box.";
    }

    else {
        
        $password = md5($cpassword);
        $age_range = $_POST['ageRange'];
      
      
        // Check if the email already exists in the database
        $check_email = "SELECT * FROM register WHERE email = '$email'";
        $check_user = "SELECT * FROM register WHERE username = '$username'";
        $Result_email = mysqli_query($conn, $check_email);
        $Result_user = mysqli_query($conn, $check_user);
        
        if (mysqli_num_rows($Result_email) > 0) {
            echo "Email address already exists. Please use a different email.";
        }
        elseif(mysqli_num_rows($Result_user) > 0){
            echo "Username already exists. Please use a different Username.";
        }

        else{
        $sql = "INSERT INTO register(email, username, password, ageRange, phoneNum) 
        VALUES('$email','$username','$password','$age_range','$phone_number')";

        $qry = mysqli_query($conn,$sql) or die(mysqli_error($conn));
        if($qry) {

            echo "Registered Successfully";
        }
        else {
            header("Location: Register.php");
        }
    }
 
    }
}

?>