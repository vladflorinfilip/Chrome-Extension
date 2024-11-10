// Sends message to the background to fetch data and then display it in the tab
document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ action: "fetchData"}, function(response) {
        if (response) {
            // Check if the application is running
            if (response.success){
                // Toggle display
                document.getElementById('todoapp').style.display = 'block';
                document.getElementById('notloaded').style.display = 'none';

                generateTableRows(response.outstanding, "outstandingTasks");
                generateTableRows(response.completed, "completedTasks");
            
                // Select all elements with both 'button' and 'button-red' classes
                const buttonsRemove = document.querySelectorAll('.button.button-red');
                const buttonsTick = document.querySelectorAll('.button.button-green');

                // Iterate over each button and add an event listener
                buttonsRemove.forEach(button => {
                    button.addEventListener('click', function() {
                        const task = button.getAttribute('data-task');
                        const category = button.getAttribute('data-category');
                        fetch('http://localhost:4444/removetask', {
                            method: 'POST', 
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: new URLSearchParams({
                                tasktoRemove: `${task}_${category}`
                            })
                        })
                        .then(response => {
                            if(response.ok) {
                                // Send message to refresh the specific tab and the popup
                                chrome.runtime.sendMessage({ action: "refreshTabAndPopup" }, function () {
                                    window.location.reload();
                                });
                            } else {
                                console.log('Error (400) Bad Request when loading remove button fetch response.')
                            }
                        }).catch(error => {
                            console.log('error');
                        })
                    });
                });

                // Iterate over each button and add an event listener
                buttonsTick.forEach(button => {
                    button.addEventListener('click', function() {
                        const task = button.getAttribute('data-task');
                        const category = button.getAttribute('data-category');
                        console.log('Clicked');
                        fetch('http://localhost:4444/ticktask', {
                            method: 'POST', 
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: new URLSearchParams({
                                check: `${task}_${category}`
                            })
                        })
                        .then(response => {
                            if(response.ok) {
                                // Send message to refresh the specific tab and the popup
                                chrome.runtime.sendMessage({ action: "refreshTabAndPopup" }, function () {
                                    window.location.reload();
                                });
                            } else {
                                console.log('Error (400) Bad Request when loading tick button fetch response.')
                            }
                        }).catch(error => {
                            console.log('error');
                        })
                    });
                });

            // Iterate over each button and add an event listener
            buttonsTick.forEach(button => {
                button.addEventListener('click', function() {
                
                });
            });
            } else {
            // Toggle display
            document.getElementById('todoapp').style.display = 'none';
            document.getElementById('notloaded').style.display = 'block';
            }         
        } else {
            document.getElementById('content').innerText = 'Error: ' + response.error;
        }
    })
})

// Function to generate table rows
function generateTableRows(tasks, id) {
    const tbody = document.getElementById(id);
    if (!tbody) {
        console.error(`Element with id ${id} not found.`);
        return;
    }

    // Clear the existing contents of the tbody
    tbody.innerHTML = '';

    // Iterate over the tasks and append rows
    tasks.forEach(taskObj => {
        const row = document.createElement('tr');

        const taskCell = document.createElement('td');
        taskCell.textContent = taskObj.task;
        row.appendChild(taskCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = taskObj.category;
        row.appendChild(categoryCell);

        const button = document.createElement('button');
        button.setAttribute('data-task', taskObj.task);
        button.setAttribute('data-category', taskObj.category);
        if (id === 'outstandingTasks') {
            button.className = 'button button-green';
            button.innerHTML = '&#10004;'; // Unicode for checkmark
        } else if (id === 'completedTasks') {
            button.innerHTML = '&#10006;'; // Unicode for cross
            button.className = 'button button-red';
        }
        row.appendChild(button);

        tbody.appendChild(row);
    });
}