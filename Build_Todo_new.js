const taskInput = document.querySelector('.inputs');
const prioritySelect = document.querySelector('.selector');
const form = document.getElementById('taskForm');
const filterButtons = document.querySelectorAll('.imp-buttons');
const taskContainer = document.getElementById('taskContainer');

let tasks = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let text = taskInput.value.trim();
    let priority = prioritySelect.value;

    if (text === '') {
        alert("Please enter a task.");
        return;
    }

    tasks.push({ text, priority });
    taskInput.value = '';
    showTasks();
});

function showTasks(filter = 'All') {
    let html = '';

    tasks.forEach((task, index) => {
        if (filter !== 'All' && task.priority !== filter) return;

        html += `
            <div class="task-box" style="margin: 10px; padding: 10px; border: 1px solid black; background-color: white; display: flex; justify-content: space-between;">
                <input type="text" id="task-${index}" value="${task.text}" disabled style="flex: 1; margin-right: 10px;" />
                <select id="priority-${index}" disabled>
                    <option value="Important" ${task.priority === 'Important' ? 'selected' : ''}>Important</option>
                    <option value="Urgent" ${task.priority === 'Urgent' ? 'selected' : ''}>Urgent</option>
                </select>
                <div>
                    <button onclick="toggleEdit(${index}, this)">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            </div>
        `;
    });

    taskContainer.innerHTML = html;
}


function toggleEdit(index, btn) {
   

    if (document.getElementById(`task-${index}`).disabled) {
        
        document.getElementById(`task-${index}`).disabled = false;
        document.getElementById(`priority-${index}`).disabled = false;
        btn.innerHTML = "Save";
    } else {
        
        tasks[index].text = document.getElementById(`task-${index}`).value.trim();
        tasks[index].priority = document.getElementById(`priority-${index}`).value;
        document.getElementById(`task-${index}`).disabled = true;
        document.getElementById(`priority-${index}`).disabled = true;
        btn.textContent = "Edit";
        showTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    showTasks();
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.textContent;
        showTasks(filter);
    });
});

showTasks();
