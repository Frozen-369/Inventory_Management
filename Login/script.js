document.getElementById('registrationForm').addEventListener('submit', function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Collect form data
    var formData = $('#registrationForm').serialize();

    // Make an AJAX request to the PHP file
    $.ajax({
        type: 'POST',
        url: 'register.php',
        data: formData,
        success: function(response) {
            // Update the content of the "error-container" div with the response (error messages)
            $('#error_container').html(response);
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
});

