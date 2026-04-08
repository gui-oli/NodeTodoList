
let dragged = null;

function save() {
    const data = {
        a_fazer: document.getElementById("a_fazer").innerHTML,
        fazendo: document.getElementById("fazendo").innerHTML,
        feito: document.getElementById("feito").innerHTML
    };
    localStorage.setItem("tasks", JSON.stringify(data));
}

function load() {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (!data) return;

    document.getElementById("a_fazer").innerHTML = data.a_fazer;
    document.getElementById("fazendo").innerHTML = data.fazendo;
    document.getElementById("feito").innerHTML = data.feito;

    addDragEvents();
    addDeleteEvents();
}

function addTask() {
    const input = document.getElementById("input");
    if (!input.value) return;

    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;

    task.innerHTML = `
        <span>${input.value}</span>
        <button class="delete"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 32 32">
<path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
</svg></button>
    `;

    document.getElementById("a_fazer").appendChild(task);

    input.value = "";

    addDragEvents();
    addDeleteEvents();
    save();
}

function addDeleteEvents() {
    const deletes = document.querySelectorAll(".delete");

    deletes.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            btn.parentElement.remove();
            save();
        };
    });
}

function addDragEvents() {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {
        task.addEventListener("dragstart", () => {
            dragged = task;
            task.classList.add("dragging");
        });

        task.addEventListener("dragend", () => {
            task.classList.remove("dragging");
            save();
        });
    });
}

const lists = document.querySelectorAll(".list");

lists.forEach(list => {
    list.addEventListener("dragover", e => {
        e.preventDefault();
    });

    list.addEventListener("drop", () => {
        if (dragged) {
            list.appendChild(dragged);
            save();
        }
    });
});

document.getElementById("CLEAR").onclick = () => {
    if (confirm("Tem certeza que quer apagar tudo?")) {
        document.getElementById("a_fazer").innerHTML = "";
        document.getElementById("fazendo").innerHTML = "";
        document.getElementById("feito").innerHTML = "";

        localStorage.removeItem("tasks");
    }
};

load();