<?php
if (isset($_GET['id']) && isset($_GET['action'])) {
    include("../connection.php");
    $id = $_GET['id'];
    $action = $_GET['action'];
    switch ($action) {
        case 'edit': {
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
                break;
            }
        case 'delete': {
                // echo "You are going to delete the record";
                $sql = "DELETE from products WHERE id=$id";
                //connection to db

                //executing the query
                $qry = mysqli_query($conn, $sql) or die(mysqli_error($conn));
                if ($qry) {
                    $response['status'] = 'success';
                    $response['message'] = 'Product Deleted Successfully.';
                }
                break;
            }
        default: {
                $response['status'] = 'error';
                $response['message'] = 'Product couldnot be deleted.';
                break;
            }
    }
} else {
    header("Location:inventory.html");
}

echo json_encode($response);

?>