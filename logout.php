<?php
session_start();

// Destroy the session
session_destroy();

// Send a JSON response indicating success
$response = array('status' => 'success');
header('Content-Type: application/json');
echo json_encode($response);
?>
