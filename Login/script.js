
function handleFormSubmission(formId, url, ContainerID, path) {
    $(formId).on('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Collect form data
        var formData = $(formId).serialize();

        // Make an AJAX request to the PHP file
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            dataType: 'json', // Expecting JSON response
            success: function (response) {
                if (response.status === 'success') {
                    $(formId)[0].reset();
                    displaySuccessMessage(response.message, ContainerID);
                    if (path) {
                        setTimeout(function () {
                            window.location.href = path;
                        }, 1000);
                    }
                } else {
                    displayErrorMessage(response.message, ContainerID);
                }
            },
            error: function (error) {
                console.log('Error:', error);
                displayErrorMessage('An error occurred during form submission.', ContainerID);
            }
        });
    });
}

handleFormSubmission('#registrationForm', 'register.php', 'error_container', 'adminLogin.html');
handleFormSubmission('#employeeLogin', 'employeeLogin.php', 'error_employeeLogin', '../dashboard.html');
handleFormSubmission('#adminLogin', 'adminLogin.php', 'error_adminLogin', '../dashboard.html');

function displayErrorMessage(message, containerID) {
    var errorContainer = document.getElementById(containerID);
    errorContainer.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    // Show the error container
    errorContainer.style.display = 'block';
}

function displaySuccessMessage(message, containerID) {
    var successContainer = document.getElementById(containerID);
    successContainer.innerHTML = `<div class="alert alert-success" role="alert">${message}</div>`;
    // Show the success container
    successContainer.style.display = 'block';
}
