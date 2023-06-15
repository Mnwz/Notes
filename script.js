const addBtn = document.querySelector("#newNote");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
  const note = document.createElement("div");

  note.classList.add("note");

  note.innerHTML = `
    <div class="options">
      <button class="edit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="delete">
        <i class="fas fa-trash-alt"></i>
      </button>
      <button class="save">
        <i class="fa-solid fa-check"></i>
      </button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class=${text ? "hidden" : ""}></textarea>
  `;

  const btnEdit = note.querySelector(".edit");
  const btnDelete = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  textarea.value = text;
  main.innerHTML = marked(text);

  btnDelete.addEventListener("click", () => {
    note.remove();
    storage();
  });

  btnEdit.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
    storage();
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = value;
    storage();
  });

  textarea.addEventListener("blur", (e) => {
    const { value } = e.target;

    main.classList.toggle("hidden");
    textarea.classList.toggle("hidden");

    main.innerHTML = value;
    storage();
  });

  document.body.appendChild(note);

  textarea.focus();
}

function storage() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}
