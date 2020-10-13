const deletebutton = document.getElementById("deleteButton");
const editbutton = document.getElementById("deleteButton");
const editform = document.getElementById("editForm");

const createForm = document.getElementById("createForm");

const getId = (classArray) => classArray[classArray.length - 1].split("_")[1];
const getTaskFromForm = (form) => ({
  title: form.title.value ? form.title.value : "",
  desc: form.desc.value ? form.desc.value : "",
  priority: form.priority.value ? form.priority.value : "",
});

if (deletebutton) {
  deletebutton.addEventListener("click", (e) => {
    const id = getId(e.target.className.split(" "));
    fetch(`/tasks/${id}`, { method: "delete" })
      .then((response) => {
        window.setTimeout(() => {
          location.assign("/");
        }, 1000);
      })
      .catch(console.log);
  });
}

if (editform) {
  editform.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = getTaskFromForm(e.target.elements);
    const id = getId(e.target.elements.editButton.className.split(" "));

    fetch(`/tasks/${id}`, {
      method: "put",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        window.setTimeout(() => {
          location.assign("/");
        }, 1000);
      })
      .catch(console.log);
  });
}

if (createForm) {
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = getTaskFromForm(e.target.elements);

    fetch(`/tasks`, { method: "post", body: JSON.stringify(task), headers: { "Content-Type": "application/json" } })
      .then((response) => {
        window.setTimeout(() => {
          location.assign("/");
        }, 1000);
      })
      .catch(console.log);
  });
}
