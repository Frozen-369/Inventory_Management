<?php
    $host = "localhost:3306";
    $u= "root";
    $p ="";
    $db = "inventory_management";
    $conn = mysqli_connect($host, $u, $p, $db);

    if(!$conn){
        echo"Unable to connect to database";
    }

?>