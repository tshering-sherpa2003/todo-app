document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const addButton = document.getElementById("add-button");
  const deleteAllButton = document.getElementById("delete");
  const todoList = document.getElementById("todo-list");

  // Add a new to-do item
  addButton.addEventListener("click", addTodo);

  // Add a new to-do item when Enter is pressed
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  });

  // Delete all tasks
  deleteAllButton.addEventListener("click", () => {
    todoList.innerHTML = ""; // Clear all list items
  });

  function addTodo() {
    const taskText = input.value.trim();
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    const li = document.createElement("li");
    li.classList.add("todo-item");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Add time input for reminder
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.classList.add("reminder-time");
    timeInput.title = "Set reminder time";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      todoList.removeChild(li);
    });

    li.appendChild(taskSpan);
    li.appendChild(timeInput);
    li.appendChild(deleteButton);

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    todoList.appendChild(li);
    input.value = ""; // Clear input after adding the task

    // Start reminder checker for this task
    startReminderChecker(taskText, timeInput);
  }

  function startReminderChecker(taskText, timeInput) {
    const reminderInterval = setInterval(() => {
      const currentTime = new Date();
      const [hours, minutes] = timeInput.value.split(":").map(Number);

      if (hours === currentTime.getHours() && minutes === currentTime.getMinutes()) {
        alert(`Reminder: It's time to complete the task - "${taskText}"!`);
        clearInterval(reminderInterval); // Stop checking after notifying
      }
    }, 1000); // Check every second
  }
  function startReminderChecker(taskText, timeInput) {
    const reminderInterval = setInterval(() => {
      const currentTime = new Date();
      const [hours, minutes] = timeInput.value.split(":").map(Number);
  
      if (hours === currentTime.getHours() && minutes === currentTime.getMinutes()) {
        const audio = document.getElementById("reminder-sound");
        audio.play(); // Play the reminder sound
  
        alert(`Reminder: It's time to complete the task - "${taskText}"!`);
        clearInterval(reminderInterval); // Stop checking after notifying
      }
    }, 1000); // Check every second
  }
  /* to save on local storage  */
    saveToLocalStorage(todoText);

  
});
