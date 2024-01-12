<?php

$response = array('status' => 'error');
include("../connection.php");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Include your database connection

    $searchTerm = trim($_POST['search']);
    // $price = trim($_POST['price']);
    // $category = trim($_POST['category']);

    // Query your database based on the search term
    $sql = "SELECT * FROM products WHERE
     product_name LIKE '%$searchTerm%'
     OR product_category LIKE '%$searchTerm%'
     OR product_price LIKE '%$searchTerm%'
     OR quantity_in_stock LIKE '%$searchTerm%'
     OR supplier LIKE '%$searchTerm%'";

    // if (!empty($price)) {

    //         $sql .= " ORDER BY product_price '$price'";
    // }

    // if (!empty($category)) {
    //     if ($category == "Mobile") {

    //     } elseif ($category == "Laptop") {
    //     } elseif ($category == "Console") {
    //     }
    // }


    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $response['status'] = 'success';
        $response['results'] = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $response['results'][] = $row;
        }
    } else {
        $response['message'] = 'Data not found.';
    }
} else {
    $response['message'] = 'Search term not provided.';
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);

// Close the database connection if needed
mysqli_close($conn);
?>