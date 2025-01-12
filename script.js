function loadChecklist() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'README.md', true); // Asynchronous request
    xhr.onload = function () {
        if (xhr.status === 200) {
            var checklist = xhr.responseText; 

            var listContainer = document.getElementById('everyday');
            var items = checklist.split('\n');
                // Iterate through each line
                for (var i = 0; i < items.length; i++) {
                    var listItem = document.createElement('li');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'everyday';
                
                    var item = items[i].replace('- ', '');

                    checkbox.id = item;

                    var label = document.createElement('label');
                    label.textContent = item;

                    listItem.appendChild(checkbox);
                    listItem.appendChild(label);
                    listContainer.appendChild(listItem);
                }
        }
        loadCheckboxState();
    }
    xhr.send(); // Send the request
}

// Save the state of the checkboxes to localStorage
function saveCheckboxState() {
    const checkboxes = document.querySelectorAll('.everyday');

    for (i = 0; i < checkboxes.length; i++) {
        localStorage.setItem(checkboxes[i].id, checkboxes[i].checked.toString());
    }
}

// Load the state of the checkboxes from localStorage
function loadCheckboxState() {
    const checkboxes = document.querySelectorAll('.everyday');

    for (i = 0; i < checkboxes.length; i++) {
        const checked = localStorage.getItem(checkboxes[i].id);
        checkboxes[i].checked = (checked === 'true'); // Set the checkbox checked state based on the stored value
    }
}



//Clear the checklist with the button

// Get the button element
var clearButton = document.getElementById('clearList');
// Add a click event listener to the button

clearButton.addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.everyday');
    for (i = 0; i < checkboxes.length; i++) {
        localStorage.setItem(checkboxes[i].id, 'false');
        checkboxes[i].checked = false;
    }
});

//Toggle tasmota light with the button

// Get the button element
var lightButton = document.getElementById('lightSwitch');

// Add a click event listener to the button
lightButton.addEventListener('click', function() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure the GET request
    xhr.open('GET', 'http://192.168.1.106/?m=1&o=1', true);

    // Define what to do when the request is successful
    xhr.onload = function () {
        if (xhr.status === 200) {
            // If the request was successful, handle the response here
            console.log('Response:', xhr.responseText);
        } else {
            // If the request failed, log the status
            console.error('Request failed with status:', xhr.status);
        }
    };

    // Define what to do if there's an error with the request
    xhr.onerror = function () {
        console.error('Network error or invalid URL');
    };

    // Send the request
    xhr.send();
});

document.addEventListener('DOMContentLoaded', loadChecklist);
window.addEventListener('beforeunload', saveCheckboxState);
