$(document).ready(function () {
    // Fetch data from PHP file using AJAX
    $.ajax({
        type: 'GET',
        url: 'product.php',
        dataType: 'json',
        success: function (response) {
            // Check if the response status is success
            if (response.status === 'success') {
                // Clear existing content in the productContainer
                $('#productContainer').empty();

                // Loop through the products and append to the productContainer
                response.products.forEach(function (product) {
                    var id = Number(product.id);
                    var productHtml = `
                        <div class="card product">
                        <div class="productInfo">
                        <img src = "${product.product_image}" class = "img-thumbnail"> 
                        <h3>${product.product_name}</h3>
                        <p>Category: ${product.product_category}</p>
                        <p>Price: $${product.product_price}</p>
                        <p>Quantity in Stock: ${product.quantity_in_stock}</p>
                        <p>Supplier: ${product.supplier}</p>
                        </div>
                        <div class="error_edit"></div>
                    </div>`;

                    // Append the productHtml to the productContainer
                    $('#productContainer').append(productHtml);
                });
            } else {
                // Display an error message if the response status is not success
                console.error('Error fetching products:', response.message);
            }
        },
        error: function (error) {
            console.error('AJAX Error:', error);
        }
    });
});

function displaySearchResults(response) {
    // Clear existing content in the productContainer
    $('#productContainer').empty();


    // Loop through the search results and append to the productContainer
    response.results.forEach(function (product) {
        var id = Number(product.id);
        var productHtml = `
        <div class="card product">
        <div class="productInfo">
        <img src = "${product.product_image}" class = "img-thumbnail"> 
        <h3>${product.product_name}</h3>
        <p>Category: ${product.product_category}</p>
        <p>Price: $${product.product_price}</p>
        <p>Quantity in Stock: ${product.quantity_in_stock}</p>
        <p>Supplier: ${product.supplier}</p>
        </div>
        <div class="error_edit"></div>
    </div>`;

        // Append the productHtml to the productContainer
        $('#productContainer').append(productHtml);
    });
}





document.getElementById('search_btn').addEventListener('click', function (event) {
    event.preventDefault();
    $(document).ready(function () {
        // Get the search term from the input field
        var searchTerm = (document.getElementById('search_term')).value;
        var price = $('#price').val();
        var category = $('#category').val();

        // Fetch data from PHP file using AJAX
        $.ajax({
            type: 'POST',
            url: 'search.php',
            data: {
                search: searchTerm,
                price: price,
                category: category
            },
            dataType: 'json',
            success: function (response) {
                // Check if the response status is success
                if (response.status === 'success') {
                    displaySearchResults(response);
                } else {
                    // Display an error message if the response status is not success
                    $('#productContainer').empty();
                    displayErrorMessage(response.message, "productContainer");
                }
            },
            error: function (error) {
                console.error('AJAX Error:', error);
            }
        });
    });
});


