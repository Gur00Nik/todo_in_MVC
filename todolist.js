const model = {
  tasks: [],

  countNoCompletedTasks: 0,

  addTask(titleTask) {
    const newTask = {
      id: Date.now() + Math.floor(Math.random() + 1 * 10),
      title: titleTask,
      isDone: false,
    };

    this.tasks.push(newTask);

    view.renderTasks(this.tasks);
    this.calcNoCompletedTasks();
  },

  deleteTask(id) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    view.renderTasks(this.tasks);
    this.calcNoCompletedTasks();
  },

  deleteAll() {
    this.tasks = [];
    view.renderTasks(this.tasks);
    this.calcNoCompletedTasks();
  },

  calcNoCompletedTasks() {
    this.countNoCompletedTasks = 0;
    this.tasks.forEach((task) => {
      if (!task.isDone) {
        this.countNoCompletedTasks += 1;
      }
    });
    // console.log(
    //   `Вызвана функция увеличивающая счетчик, знаечние счетчика ${this.countNoCompletedTasks} `
    // );

    view.renderCount(this.countNoCompletedTasks);
  },

  toggleStatus(id) {
    this.tasks = this.tasks.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });

    this.calcNoCompletedTasks();

    // const findItem = this.tasks.find((item) => item.id === id);

    // findItem.isDone = !findItem.isDone;

    view.renderTasks(this.tasks);
  },
};

const view = {
  list: document.querySelector(".list"),

  countNoCompletedTasks: document.querySelector(".not-completed-count"),

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

  renderCount(count) {
    this.countNoCompletedTasks.textContent = count;
  },

  init() {
    this.renderTasks(model.tasks);
    this.renderCount(model.countNoCompletedTasks);

    const FORM = document.querySelector(".form");
    const INPUT = document.querySelector(".input");
    const DELETE_ALL_BTN = document.querySelector(".delete-all");
    const ADD_TASK_BTN = document.querySelector(".add-button");

    FORM.addEventListener("click", (event) => {
      event.preventDefault();
    });

    ADD_TASK_BTN.addEventListener("click", (event) => {
      const titleTask = INPUT.value;

      controller.addTask(titleTask);

      INPUT.value = "";
    });

    DELETE_ALL_BTN.addEventListener("click", (event) => {
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

document.addEventListener("DOMContentLoaded", init());
