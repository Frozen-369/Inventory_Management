<?php
session_start();
$response = array('status' => 'error');

if ($_SESSION['username'] != null ) {
    $response['status'] = 'success';
    $response['username'] = $_SESSION['username'];
}

header('Content-Type: application/json');
echo json_encode($response);

?>