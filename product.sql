SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `products` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `product_name` VARCHAR(255) NOT NULL,
    `product_image` VARCHAR(400) NOT NULL,
    `product_category` VARCHAR(100),
    `product_price` DECIMAL(10, 2) NOT NULL,
    `quantity_in_stock` INT NOT NULL,
    `supplier` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
