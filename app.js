document.addEventListener('DOMContentLoaded', function () {
    const tasksList = document.getElementById('tasks').querySelector('ul');
    
    // Mark task as completed using the checkbox button
    tasksList.addEventListener('click', function (event) {
        // Check if the clicked element is the checkbox button or its child image
        if (event.target.closest('.checkbox')) {
            const taskItem = event.target.closest('li');
            taskItem.classList.toggle('completed');
        }
    });

    // Delete task using the delete button
    tasksList.addEventListener('click', function (event) {
        // Check if the clicked element is the delete button or its child image
        if (event.target.closest('.delete')) {
            const taskItem = event.target.closest('li');
            taskItem.classList.add('deleted');
            setTimeout(() => {
                taskItem.remove();
            }, 500); // Wait for the fade-out animation to finish
        }
    });

    // Add new task
    const addButton = document.getElementById('add');
    const newItemInput = document.getElementById('new-item');

    addButton.addEventListener('click', addNewTask);
    
    // Allow adding task with Enter key
    newItemInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addNewTask();
        }
    });

    function addNewTask() {
        const taskText = newItemInput.value.trim();
        if (taskText) {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <span>${taskText}</span>
                <button class="checkbox"><img src="svgs/done-all-svgrepo-com.svg" class="checked"></button>
                <button class="delete"><img src="svgs/delete-1-svgrepo-com.svg" class="deleted"></button>
            `;
            tasksList.appendChild(newTask);
            newItemInput.value = '';
        }
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    darkModeToggle.addEventListener('change', function () {
        body.classList.toggle('dark-mode');
        // Store preference in localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Make categories functional
    const categories = document.getElementById('categories').querySelectorAll('li');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            categories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Filter tasks (when we have category functionality)
            // For now, just highlight the selected category
        });
    });
});