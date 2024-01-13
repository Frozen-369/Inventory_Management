<?php
if (isset($_GET['id'])) {
    // Include the connection file
    include("connection.php");

    // Sanitize the input to prevent SQL injection
    $id = mysqli_real_escape_string($conn, $_GET['id']);

    // Fetch products from the database
    $sql = "SELECT * FROM products WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    // Create an array to store product data
    $product = array();

    // Check if there are any results
    if ($result && mysqli_num_rows($result) > 0) {
        // Fetch each row and add it to the $products array
        while ($row = mysqli_fetch_assoc($result)) {
            $product[] = $row;
        }
    }

    // Create a response array
    $response = array();

    // Check if products were found
    if (!empty($product)) {
        $response['status'] = 'success';
        $response['products'] = $product;
    } else {
        $response['status'] = 'error';
        $response['message'] = 'No products found.';
    }

    // Close the database connection
    mysqli_close($conn);

    // Return the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
