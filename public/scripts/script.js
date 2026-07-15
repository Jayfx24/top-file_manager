const folders = document.querySelector(".main-list");
const tableDialogs = document.querySelector(".table");

const collapse = (event) => {
  const target = event.target.closest("li");
  console.log(target.tagName);
  if (target.dataset.type !== "folder") return;

  target.dataset.collapse = target.dataset.collapse === "true" ? false : true;

  const closestList = target.querySelector("ul");
  const dropdown = target.querySelector(".dropdown");
  dropdown.classList.toggle("open")
  if (!closestList) return;
  closestList.classList.toggle("hide");
  //   console.log(closestList.tagName, closestList.className)
};
const populateDialog = (event) => {
  const target = event.target;
  console.log("here", target.dataset.id);
  if (!["folder", "file"].includes(target.dataset.type)) return;

  if (target.dataset.func === "share") {
    (document.querySelector("#shareId").value = target.dataset.id);
    return
  }
  
  document.querySelector("#originalName").value = target.dataset.name;
  document.querySelector("#fileName").value =
    target.dataset.name.split(/\.\w+$/i)?.[0];
  document.querySelector("#fileId").value = target.dataset.id;
  document.querySelector("#parentId").value = target.dataset.parent;
  document.querySelector("#fileType").value = target.dataset.type;
};

folders.addEventListener("click", collapse);
tableDialogs.addEventListener("click", populateDialog);

// const displayFile = (fileType, url) => {
//   switch (fileType) {
//     case "pdf":
//       return <iframe className="" src={url} width="100%"></iframe>;
//       break;

//     case "text":
//       return <pre className="" src={url} width="100%"></pre>;
//       break;

//     default:
//       return <img src=""></img>;
//   }
// };
