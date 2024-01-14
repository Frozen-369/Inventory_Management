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


function displayErrorMessage(message, containerID) {
    var errorContainer = document.getElementById(containerID);
    errorContainer.innerHTML = `<div class="alert alert-danger custom-danger" role="alert">${message}</div>`;
    // Show the error container
    errorContainer.style.display = 'block';
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


$(document).ready(function () {
    $.ajax({
        url: 'session.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                // User is logged in
                $('.user').empty();
                $('.user').text(response.username);
            } else {
                // User is not logged in, redirect to login page
                window.location.href = 'adminLogin.html';
            }
        },
        error: function () {
            window.location.href = 'adminLogin.html';
        }
    });
});

$(document).ready(function () {
    $('.logoutBtn').on('click', function () {
        // Make an AJAX request to the logout PHP script
        $.ajax({
            url: 'logout.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    // Redirect to the login page
                    window.location.href = 'adminLogin.html';
                } else {
                    // Handle any errors (optional)
                    console.error('Logout failed: ' + response.message);
                }
            },
            error: function () {
                console.error('Error during logout AJAX request.');
            }
        });
    });
});


$(document).ready(function () {
    $('.roleBasedRedirect').on('click', function (event) {
        event.preventDefault();

        // Make an AJAX request to the PHP script that checks the role
        $.ajax({
            url: 'checkRole.php',
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    // Redirect based on the user's role
                    if (response.role === 'admin') {
                        window.location.href = 'inventory.html';
                    } else if (response.role === 'employee') {
                        window.location.href = 'inventoryUser.html';
                    } else {
                        console.error('Unknown role: ' + response.role);
                    }
                } else {
                    // Handle any errors (optional)
                    console.error('Role check failed: ' + response.message);
                }
            },
            error: function () {
                console.error('Error during role check AJAX request.');
            }
        });
    });
});


