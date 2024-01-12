<?php

$response = array('status' => 'error');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $p_name = trim($_POST["productName"]);
    $p_category = trim($_POST["productCategory"]);
    $p_price = trim($_POST["productPrice"]);
    $p_quantity = trim($_POST["productQuantity"]);
    $p_supplier = trim($_POST["supplier"]);
    


    if (empty($p_name)) {
        $response['message'] = 'Please fill out Product name field.';
    } elseif ($_FILES["productImage"]["error"] == 4) {
        $response['message'] = 'Please choose an image.';
    } elseif (empty($p_category)) {
        $response['message'] = 'Please fill out Product category field.';
    } elseif (empty($p_price)) {
        $response['message'] = 'Please fill out Product price field.';
    } elseif (empty($p_quantity)) {
        $response['message'] = 'Please fill out Product quantity field.';
    } elseif (empty($p_supplier)) {
        $response['message'] = 'Please fill out Product supplier field.';
    } else {
        // File Upload Handling
        $targetDir = "../Image/";
        $p_image = basename($_FILES["productImage"]["name"]);
        $targetFilePath = $targetDir . $p_image;
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

        // Check if the file is an actual image
        $check = getimagesize($_FILES["productImage"]["tmp_name"]);
        if ($check !== false) {
            // Check file size (in bytes)
            $maxFileSize = 5 * 1024 * 1024; // 5 MB
            if ($_FILES["productImage"]["size"] > $maxFileSize) {
                $response['message'] = 'File is too large. Please choose a smaller image.';
            } else {
                // Allow certain file formats
                $allowedFileTypes = array("jpg", "jpeg", "png", "gif");
                if (in_array($fileType, $allowedFileTypes)) {
                    if (move_uploaded_file($_FILES["productImage"]["tmp_name"], $targetFilePath)) {
                        // Insert statement
                        $sql = "INSERT INTO products (product_name, product_image, product_category, product_price, quantity_in_stock, supplier)
                            VALUES ('$p_name', '$targetFilePath', '$p_category', '$p_price', '$p_quantity', '$p_supplier')";

                        // Connection to db
                        include("../connection.php");

                        // Execute the query
                        $qry = mysqli_query($conn, $sql);
                        if ($qry) {
                            $response['status'] = 'success';
                            $response['message'] = 'Product Added Successfully';
                        } else {
                            $response['message'] = 'Error inserting data into database.';
                        }
                    } else {
                        $response['message'] = 'Error moving the uploaded file.';
                    }
                } else {
                    $response['message'] = 'Invalid file format. Please choose a valid image file.';
                }
            }
        } else {
            $response['message'] = 'File is not an image. Please choose a valid image file.';
        }
    }
    header('Content-Type: application/json');

    echo json_encode($response);
}
?>
