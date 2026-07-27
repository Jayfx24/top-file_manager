const folders = document.querySelector(".main-list");
const tableDialogs = document.querySelector(".table");

const collapse = (event) => {
  const target = event.target.closest("li");
  if (target.dataset.type !== "folder") return;

  target.dataset.collapse = target.dataset.collapse === "true" ? false : true;

  const closestList = target.querySelector("ul");
  const dropdown = target.querySelector(".dropdown");
  dropdown.classList.toggle("open");
  if (!closestList) return;
  closestList.classList.toggle("hide");
  //   console.log(closestList.tagName, closestList.className)
};
const populateDialog = (event) => {
  const target = event.target.closest("button");
  // console.log(target.tagName);

  // console.log("here", target.dataset.id);
  if (!["folder", "file"].includes(target.dataset.type)) return;

  const share = document.querySelector("#shareId");
  const id = target.dataset.id;

  // console.log("Folder id reached: ", id);
  if (target.dataset.func === "share") {
    share.value = id;
    // console.log("share dom reached: ", share.value);

    return;
  }

  document.querySelector("#originalName").value = target.dataset.name;
  document.querySelector("#fileName").value =
    target.dataset.name.split(/\.\w+$/i)?.[0];
  document.querySelector("#fileId").value = id;
  document.querySelector("#parentId").value = target.dataset.parent;
  document.querySelector("#fileType").value = target.dataset.type;
};

folders.addEventListener("click", collapse);
tableDialogs.addEventListener("click", populateDialog);


