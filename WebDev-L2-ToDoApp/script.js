const input = document.querySelector('.add-task input');
const addButton = document.querySelector('.add-task button');
const completedCount = document.querySelector('#completed-count');
const pendingCount = document.querySelector('#pending-count');
const pendingTasksContainer = document.querySelector('.pending-tasks');
const completedTasksContainer = document.querySelector('.completed-tasks');
const emptymsg=document.querySelectorAll('.empty-message');
console.log(emptymsg);

function updateCounts() {
    pendingCount.textContent = `${pendingTasksContainer.children.length} pending`;
    completedCount.textContent = `${completedTasksContainer.children.length} completed`;
}

function checkboxChangeHandler(event) {
    const taskItem = event.target.parentElement;
    if (event.target.checked) {
        completedTasksContainer.appendChild(taskItem);

    } else {
        pendingTasksContainer.appendChild(taskItem);
    }
    updateCounts();
    emptyMsgHandler();
    saveTasks();


}

function emptyMsgHandler() {
if (pendingTasksContainer.children.length === 0) {
        emptymsg[0].style.display = 'block';
    } else {
        emptymsg[0].style.display = 'none';
    }

    if (completedTasksContainer.children.length === 0) {
        emptymsg[1].style.display = 'block';
    } else {
        emptymsg[1].style.display = 'none';
    }

}


function editTask(event) {
    const taskItem = event.target.parentElement;
    const taskText = taskItem.querySelector('span');

    const originalText = taskText.textContent;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = originalText;

    const saveButton = document.createElement('button');
    saveButton.textContent = '✅';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = '❌';

    cancelButton.classList.add('cancel-btn');

    taskText.replaceWith(editInput);

    event.target.replaceWith(saveButton);
    saveButton.after(cancelButton);

    saveButton.addEventListener('click', () => {
        const newText = editInput.value.trim();

        if (newText === '') {
            alert('Task cannot be empty.');
            return;
        }

        const newSpan = document.createElement('span');
        newSpan.textContent = newText;

        editInput.replaceWith(newSpan);

        saveButton.replaceWith(event.target);
        cancelButton.remove();

        saveTasks();
    });

    cancelButton.addEventListener('click', () => {
        const originalSpan = document.createElement('span');
        originalSpan.textContent = originalText;

        editInput.replaceWith(originalSpan);

        saveButton.replaceWith(event.target);
        cancelButton.remove();
    });

    editInput.focus();
    editInput.select();
}


function deleteTask(e) {
 const taskItem=e.target.parentElement;
 console.log(taskItem);
 taskItem.remove();
 updateCounts();
 emptyMsgHandler();
 saveTasks();
}


function loadTasks() {
    try{
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}/>
            <span>${task.text}</span>
            <button class="Edit-btn">Edit</button>
            <button class="delete-btn">Delete</button> 
        `;
        if (task.completed) {
            completedTasksContainer.appendChild(taskItem);
        } else {
            pendingTasksContainer.appendChild(taskItem);
        }

        const checkbox = taskItem.querySelector('.task-checkbox');
        const editButton = taskItem.querySelector('.Edit-btn');
        const deleteButton = taskItem.querySelector('.delete-btn');

        checkbox.addEventListener('change', checkboxChangeHandler);
        editButton.addEventListener('click', editTask);
        deleteButton.addEventListener('click', deleteTask);

    });
}catch(error){
    console.error('Error loading tasks from localStorage:', error);
}
    updateCounts();
    emptyMsgHandler();  
    
}



const addTask=()=>{
    const inputValue = input.value.trim();
    if (inputValue === '') {
        alert('Please enter a task.');
        return;
    }
    const timestamp = new Date().toString().slice(4, 24);
    console.log(`Task added at timestamp: ${timestamp}`);

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.innerHTML=`
        <input type="checkbox" class="task-checkbox"/>
        <span>${inputValue}</span>
        <small class="task-time">${timestamp}</small>
        <button class="Edit-btn">Edit</button>
        <button class="delete-btn">Delete</button> 
    `
    pendingTasksContainer.appendChild(taskItem);
    input.value = '';
  emptyMsgHandler();
    updateCounts();
    saveTasks();


    const checkbox = taskItem.querySelector('.task-checkbox');
    const editButton = taskItem.querySelector('.Edit-btn');
    const deleteButton = taskItem.querySelector('.delete-btn');

    checkbox.addEventListener('change',checkboxChangeHandler);
    editButton.addEventListener('click', editTask);
    deleteButton.addEventListener('click', deleteTask);

}

addButton.addEventListener('click', addTask);


function saveTasks() {
    let tasks=[];
pendingTasksContainer.querySelectorAll('.task-item').forEach((item)=>{
    const text = item.querySelector('span').textContent;
    const completed = item.querySelector('.task-checkbox').checked;
    tasks.push({text, completed})
})
completedTasksContainer.querySelectorAll('.task-item').forEach((item)=>{
    const text = item.querySelector('span').textContent;
    const completed = item.querySelector('.task-checkbox').checked;
    tasks.push({text, completed})
})

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadTasks();

