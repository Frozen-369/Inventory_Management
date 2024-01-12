function handleFormSubmission(formId, url, ContainerID, path, modalID) {
    $(formId).on('submit', function(event) {
        // Clear any previous error messages
        event.preventDefault();
        $('#' + ContainerID).empty();


        // Perform AJAX request to check for errors on the server
        $.ajax({
            url: url,
            type: 'POST',
            data: new FormData($(formId)[0]),
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function(response) {
                if (response.status === 'success') {
                    // No errors, proceed to fetch data from the database

                    $(formId)[0].reset();
                    $(modalID).modal('hide');
                    displaySuccessMessage(response.message);
                    setTimeout(function () {
                        window.location.href = path;
                    }, 2000);
                } else {
                    // Display error messages
                    displayErrorMessage(response.message, ContainerID);
                }
            },
            error: function() {
                console.log('Error fetching product data');
            }
        });
    });
}


handleFormSubmission('#add_product', 'inventory.php', 'error_productContainer', 'inventory.html', '#inventory');
handleFormSubmission('#edit_product', 'update_process.php', 'error_editProductContainer', 'inventory.html', '#edit_form');

function displayErrorMessage(message, containerID) {
    var errorContainer = document.getElementById(containerID);
    errorContainer.innerHTML = `<div class="alert alert-danger custom-danger" role="alert">${message}</div>`;
    // Show the error container
    errorContainer.style.display = 'block';
}

function displaySuccessMessage(message) {
    // Update the modal content with the success message
    $('#successModalBody').html(`<div class="alert alert-success" role="alert">${message}</div>`);
    // Show the success modal
    $('#successModal').modal('show');

}






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
                        <img src = "${product.product_image}" class="img-thumbnail" height="100px" width="200px"> 
                        <h3>${product.product_name}</h3>
                        <p>Category: ${product.product_category}</p>
                        <p>Price: $${product.product_price}</p>
                        <p>Quantity in Stock: ${product.quantity_in_stock}</p>
                        <p>Supplier: ${product.supplier}</p>
                        </div>
                        <div class="error_edit"></div>
                        <div class="edit_section">
                            <a href="editdeleteProduct.php?id=${id}&action=edit">
                                <button type="button" class="btn btn-info custom-btn editBtn" data-id="${id}">Edit</button>
                            </a>
                            <a href="editdeleteProduct.php?id=${id}&action=delete">
                                <button type="button" class="btn btn-danger custom-btn deleteBtn" data-id="${id}">Delete</button>
                            </a>
                        </div>
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



// function fetchProductData() {
//     // Perform AJAX request to fetch data from the database
//     $.ajax({
//         url: 'product.php',
//         type: 'GET',
//         success: function(response) {
//             if (response.status === 'success') {
//                 // Process and display fetched data
//                 $('#productContainer').empty();

//                     // Loop through the products and append to the productContainer
//                     response.products.forEach(function (product) {
//                         var id = Number(product.id);
//                         var productHtml = `
//                     <div class="card product">
//                         <img src = "${product.product_image}"> 
//                         <p>Product: ${product.product_name}<p>
//                         <p>Category: ${product.product_category}</p>
//                         <p>Price: $${product.product_price}</p>
//                         <p>Quantity in Stock: ${product.quantity_in_stock}</p>
//                         <p>Supplier: ${product.supplier}</p>
//                         <div class="error_edit"></div>
//                         <div class="edit_section">
//                             <a href="editdeleteProduct.php?id=${id}&action=edit">
//                                 <button type="button" class="btn btn-info custom-btn editBtn" data-id="${id}">Edit</button>
//                             </a>
//                             <a href="editdeleteProduct.php?id=${id}&action=delete">
//                                 <button type="button" class="btn btn-danger custom-btn deleteBtn" data-id="${id}">Delete</button>
//                             </a>
//                         </div>
//                     </div>`;

//                         // Append the productHtml to the productContainer
//                         $('#productContainer').append(productHtml);
//                     });
//             } else {
//                 console.log('No products found: '. response.message);
//             }
//         },
//         error: function() {
//             console.log('Error fetching product data');
//         }
//     });
// }


$(document).on('click', '.deleteBtn', function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor element
    var productId = $(this).data('id');
    deleteProduct(productId);
});

function deleteProduct(id) {
    $.ajax({
        type: 'GET',
        url: 'editdeleteProduct.php',
        data: { id: id, action: 'delete' },
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                displaySuccessMessage(response.message);
                setTimeout(function () {
                    window.location.href = 'inventory.html';
                }, 2000);
            } else {
                displayErrorMessage(response.message, 'edit_section');
            }
        },
        error: function (error) {
            console.error('AJAX Error:', error);
        }
    });
}

$(document).on('click', '.editBtn', function (event) {
    event.preventDefault();
    var productId = $(this).data('id');
    editProduct(productId);
});

function editProduct(id) {
    // Make an AJAX request to fetch product details
    $.ajax({
        type: 'GET',
        url: 'editdeleteProduct.php',
        data: { id: id, action: 'edit' },
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {

                var product = response.products[0];

                // Populate the modal fields with retrieved data
                $('#editProductName').val(product.product_name);
                $('#imageContainer').append(`<img src = "${product.product_image}" class = "img-thumbnail">`);
                $('#editProductCategory').val(product.product_category);
                $('#editProductPrice').val(product.product_price);
                $('#editQuantityInStock').val(product.quantity_in_stock);
                $('#editSupplier').val(product.supplier);

                // Set the id in a hidden field or data attribute
                $('#editProductId').val(id);

                // Show the edit_form modal
                $('#edit_form').modal('show');
            } else {
                // Handle error response
                displayErrorMessage(response.message, 'error_editProductContainer');
            }
        },
        error: function (error) {
            console.error('AJAX Error:', error);
            displayErrorMessage('An error occurred while fetching product details.', 'error_editProductContainer');
        }
    });
}





// function searchQuery() {
//     // Fetch data from PHP file using AJAX
//     var searchTerm = document.getElementById('search_term').value;

//     $.ajax({
//         type: 'GET',
//         url: 'search.php',
//         data: { search: searchTerm },
//         dataType: 'json',
//         success: function (response) {
//             // Check if the response status is success
//             if (response.status === 'success') {
//                 // Call the displaySearchResults function with the search results
//                 displaySearchResults(response.results);
//             } else {
//                 // Display an error message if the response status is not success
//                 displayErrorMessage(response.message, '#productContainer')
//                 console.error('Error fetching products:', response.message);
//             }
//         },
//         error: function (error) {
//             console.error('AJAX Error:', error);
//         }
//     });
// }

// Function to display search results in the productContainer
function displaySearchResults(response) {
    // Clear existing content in the productContainer
    $('#productContainer').empty();


    // Loop through the search results and append to the productContainer
    response.results.forEach(function (product) {
        var id = Number(product.id);
        var productHtml = `
        <div class="card product">
        <div class="productInfo">
        <img src = "${product.product_image}" class="img-thumbnail" height="100px" width="200px"> 
        <h3>${product.product_name}</h3>
        <p>Category: ${product.product_category}</p>
        <p>Price: $${product.product_price}</p>
        <p>Quantity in Stock: ${product.quantity_in_stock}</p>
        <p>Supplier: ${product.supplier}</p>
        </div>
        <div class="error_edit"></div>
        <div class="edit_section">
            <a href="editdeleteProduct.php?id=${id}&action=edit">
                <button type="button" class="btn btn-info custom-btn editBtn" data-id="${id}">Edit</button>
            </a>
            <a href="editdeleteProduct.php?id=${id}&action=delete">
                <button type="button" class="btn btn-danger custom-btn deleteBtn" data-id="${id}">Delete</button>
            </a>
        </div>
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
        // var sortPrice = (document.getElementById('search_term')).value;
        // var sortCategory = (document.getElementById('search_term')).value;

        // Fetch data from PHP file using AJAX
        $.ajax({
            type: 'POST',
            url: 'search.php',
            data: { search: searchTerm},
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

