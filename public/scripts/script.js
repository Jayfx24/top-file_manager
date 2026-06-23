const folders = document.querySelector(".main-list");
const updateDialogs = document.querySelector(".table");

const collapse = (event) => {
  const target = event.target;
  console.log(target.tagName);
  if (target.dataset.type !== "folder") return;

  target.dataset.collapse = target.dataset.collapse === "true" ? false : true;

  const closestList = target.querySelector("ul");
  if (!closestList) return;
  closestList.classList.toggle("hide");
  //   console.log(closestList.tagName, closestList.className)
};
const populateDialog = (event) => {
  const target = event.target;
  console.log("here")
  if (!["folder", "file"].includes(target.dataset.type)) return;
  console.log("pass")
  document.querySelector("#fileName").value = target.dataset.name.split(/\.\w+$/i)?.[0];
  document.querySelector("#fileId").value = target.dataset.id;
  document.querySelector("#parentId").value = target.dataset.parent;
  console.log(target.dataset.name);
  console.log(target.dataset.id);
};

folders.addEventListener("click", collapse);
updateDialogs.addEventListener("click", populateDialog);

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
