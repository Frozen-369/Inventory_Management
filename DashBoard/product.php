<?php

include("../connection.php");

// Fetch products from the database
$sql = "SELECT * FROM products";
$result = mysqli_query($conn, $sql);

// Create an array to store product data
$products = array();

// Check if there are any results
if (mysqli_num_rows($result) > 0) {
    // Fetch each row and add it to the $products array
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }
}
// echo $products;
// Create a response array
$response = array();

// Check if products were found
if (!empty($products)) {
    $response['status'] = 'success';
    $response['products'] = $products;
} else {
    $response['status'] = 'error';
    $response['message'] = 'No products found.';
}

// Close the database connection
mysqli_close($conn);

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
