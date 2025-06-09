const model = {
  tasks: [],

  addTask(titleTask) {
    const newTask = {
      id: Date.now() + Math.floor(Math.random() + 1 * 10),
      title: titleTask,
      isDone: false,
    };

    this.tasks.push(newTask);

    view.renderTasks(this.tasks);
  },

  deleteTask(id) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    view.renderTasks(this.tasks);
  },

  deleteAll() {
    this.tasks = [];
    view.renderTasks(this.tasks);
  },

  toggleStatus(id) {
    this.tasks = this.tasks.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });

    // const findItem = this.tasks.find((item) => item.id === id);

    // findItem.isDone = !findItem.isDone;

    view.renderTasks(this.tasks);
  },
};

const view = {
  list: document.querySelector(".list"),

  renderTasks(tasks) {
    let taskHTML = "";

    this.list.innerHTML = "";

    tasks.forEach((taskItem) => {
      taskHTML = `<li id="${taskItem.id}" class="${
        taskItem.isDone ? "done" : ""
      }">
          <b class="task-title">${taskItem.title}</b>
          <button class="delete-button" type="button">Удалить 🗑</button>
        </li>
      `;
      this.list.innerHTML += taskHTML;
    });
  },

  init() {
    this.renderTasks(model.tasks);

    const INPUT = document.querySelector(".input");
    const DELETE_ALL_BTN = document.querySelector(".delete-all");
    const ADD_TASK_BTN = document.querySelector(".add-button");

    ADD_TASK_BTN.addEventListener("click", (event) => {
      event.preventDefault();
      const titleTask = INPUT.value;

      controller.addTask(titleTask);

      INPUT.value = "";
    });

    DELETE_ALL_BTN.addEventListener("click", () => {
      controller.deleteAll();
    }),
      view.list.addEventListener("click", (event) => {
        const eventTarget = event.target;

        if (eventTarget.childNodes.length === 1) {
          const idItem = +eventTarget.parentElement.id;

          eventTarget.classList.contains("delete-button")
            ? controller.deleteTask(idItem)
            : controller.toggleStatus(idItem);
        }
      });
  },
};

const controller = {
  addTask(title) {
    title.trim()
      ? model.addTask(title)
      : alert("Вы хотите добавить задачу без названия");
  },
  deleteTask(idItem) {
    model.deleteTask(idItem);
  },
  toggleStatus(idItem) {
    model.toggleStatus(idItem);
  },
  deleteAll() {
    model.deleteAll();
  },
};

function init() {
  view.init();
}

init();
