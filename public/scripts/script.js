function walk(folder, data) {
  const children = data[String(folder.id)] ?? [];
  if (children.length <= 0) return "";
  let html = `<ul class="sub__list">`;

  children.forEach((ele) => {
    html += `
     <li class="folder__item">
        <a href="/folders/=${ele?.id}">
            ${ele.name}
        </a>
        ${walk(ele, data)}
    </li>`;
    html += `<ul></ul>`;
});
return html;
}
