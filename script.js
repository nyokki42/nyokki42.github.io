// ページが読み込まれたときにローカルストレージからToDoリストを取得して表示する
window.onload = function() {
    var savedTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    var savedDeadlines = JSON.parse(localStorage.getItem("todoDeadlines")) || [];
    var todoList = document.getElementById("todo-list");
    for (var i = 0; i < savedTasks.length; i++) {
        addTaskToList(savedTasks[i], savedDeadlines[i]);
    }
};

// 期限のフォーマットを変更する関数
function formatDeadline(deadline) {
    var date = new Date(deadline);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + "年" + month + "月" + day + "日";
}

// ToDoアイテムをリストに追加する関数
function addTaskToList(taskText, deadline) {
    var todoList = document.getElementById("todo-list");
    var newTask = document.createElement("li");
    newTask.innerHTML = taskText + " (期限: " + formatDeadline(deadline) + ")" +
        '<button class="delete-btn" onclick="deleteTask(this)">削除</button>';
    todoList.appendChild(newTask);
}

// ToDoアイテムを追加する関数
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var deadlineInput = document.getElementById("deadlineInput");
    var taskText = taskInput.value.trim();
    var deadline = deadlineInput.value;

    if (taskText !== "") {
        addTaskToList(taskText, deadline);
        taskInput.value = "";
        deadlineInput.value = "";

        // 新しいToDoと期限をローカルストレージに保存する
        var savedTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
        var savedDeadlines = JSON.parse(localStorage.getItem("todoDeadlines")) || [];
        savedTasks.push(taskText);
        savedDeadlines.push(deadline);
        localStorage.setItem("todoTasks", JSON.stringify(savedTasks));
        localStorage.setItem("todoDeadlines", JSON.stringify(savedDeadlines));
    }
}

// ToDoアイテムを削除する関数
function deleteTask(btn) {
    var taskText = btn.parentElement.textContent.split(" (")[0];
    var todoList = document.getElementById("todo-list");
    var taskItems = todoList.getElementsByTagName("li");
    for (var i = 0; i < taskItems.length; i++) {
        if (taskItems[i].textContent.includes(taskText)) {
            todoList.removeChild(taskItems[i]);
            break;
        }
    }

    // ローカルストレージから削除する
    var savedTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    var savedDeadlines = JSON.parse(localStorage.getItem("todoDeadlines")) || [];
    var taskIndex = savedTasks.indexOf(taskText);
    if (taskIndex !== -1) {
        savedTasks.splice(taskIndex, 1);
        savedDeadlines.splice(taskIndex, 1);
        localStorage.setItem("todoTasks", JSON.stringify(savedTasks));
        localStorage.setItem("todoDeadlines", JSON.stringify(savedDeadlines));
    }
}
