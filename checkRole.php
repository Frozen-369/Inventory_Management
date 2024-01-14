<?php
session_start();

$response = array('status' => 'error');

if (isset($_SESSION['role'])) {
    $response['status'] = 'success';
    $response['role'] = $_SESSION['role'];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
