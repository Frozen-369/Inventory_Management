<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //capturing thedata
    $id = trim($_POST["editProductId"]);
    $p_name = trim($_POST["editProductName"]);
    $p_category = trim($_POST["editProductCategory"]);
    $p_price = trim($_POST["editProductPrice"]);
    $p_quantity = trim($_POST["editProductQuantity"]);
    $p_supplier = trim($_POST["editSupplier"]);



    $response['status'] = 'error';
    if (empty($p_name)) {
        $response['message'] = 'Please fill out Product name field.';
    }
     elseif (empty($p_category)) {
        $response['message'] = 'Please fill out Product category field.';
    } elseif (empty($p_price)) {
        $response['message'] = 'Please fill out Product price field.';
    } elseif (empty($p_quantity)) {
        $response['message'] = 'Please fill out Product quantity field.';
    } elseif (empty($p_supplier)) {
        $response['message'] = 'Please fill out Product supplier field.';
    } else {

    include("connection.php");
    if(!empty($_FILES["editProductImage"]["name"])){
        // File Upload Handling
        $targetDir = "Image/";
        $p_image = basename($_FILES["editProductImage"]["name"]);
        $targetFilePath = $targetDir . $p_image;
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

        // Check if the file is an actual image
        $check = getimagesize($_FILES["editProductImage"]["tmp_name"]);
        if ($check !== false) {
            // Check file size (in bytes)
            $maxFileSize = 5 * 1024 * 1024; // 5 MB
            if ($_FILES["editProductImage"]["size"] > $maxFileSize) {
                $response['message'] = 'File is too large. Please choose a smaller image.';
            } else {
                // Allow certain file formats
                $allowedFileTypes = array("jpg", "jpeg", "png", "gif");
                if (in_array($fileType, $allowedFileTypes)) {
                    if (move_uploaded_file($_FILES["editProductImage"]["tmp_name"], $targetFilePath)) {
                        
                        $sql = "UPDATE products SET product_name = '$p_name', product_image = '$targetFilePath', product_category = '$p_category', product_price = '$p_price',
                        quantity_in_stock = '$p_quantity', supplier = '$p_supplier' WHERE id='$id'";


                        // Execute the query
                        $qry = mysqli_query($conn, $sql);
                        if ($qry) {
                            $response['status'] = 'success';
                            $response['message'] = 'Update Successful.';
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
    }else{
               //Insert statement
               $sql = "UPDATE products SET product_name = '$p_name',product_category = '$p_category', product_price = '$p_price',
               quantity_in_stock = '$p_quantity', supplier = '$p_supplier' WHERE id='$id'";
      
      
              //executing the query
              $qry = mysqli_query($conn, $sql) or die(mysqli_error($conn));
              if ($qry) {
                  $response['status'] = 'success';
                  $response['message'] = 'Update Successful.';
      
              }
              else {
                  $response['message'] = 'Error inserting data';
              }
    }
        
 
    }
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>