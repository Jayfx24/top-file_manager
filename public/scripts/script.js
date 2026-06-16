const folders = document.querySelector(".main-list");

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

folders.addEventListener("click", collapse);
