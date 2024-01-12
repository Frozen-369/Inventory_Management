<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include("../connection.php");
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    $response['status'] = 'error';
    if (empty($username)) {
        $response['message'] = 'Empty Username Field.';
    } else if (empty($password)) {
        $response['message'] = 'Empty Password Field';
    } else {
        $check = "SELECT username, password FROM admin WHERE username = '$username'";
        $Result = mysqli_query($conn, $check);


        if ($Result && mysqli_num_rows($Result) > 0) {
            $row = mysqli_fetch_assoc($Result);
            $storedHashedPassword = $row['password'];

            // Verify the entered password against the stored hashed password
            if (password_verify($password, $storedHashedPassword)) {
                $response['status'] = 'success';
                $response['message'] = 'Login successful!';
            } else {
                $response['message'] = 'Invalid password!';
            }
        } else {
            $response['message'] = 'User not found!';
        }
    }

    echo json_encode($response);
}

?>