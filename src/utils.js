export function reversedWalk(data, groupData, breadcrumb = []) {
  if (!data) return breadcrumb;
  breadcrumb.unshift({ label: data.name, id: data.id });
  const parentId = data.parentId ?? data.folderId;
  const parentData = groupData.find((parent) => parent.id === parentId);
  return reversedWalk(parentData, groupData, breadcrumb);
}

// function walk(folder, data, fileGroup) {
//   if (!data) return "";
//   const children = data[String(folder.id)] ?? [];
//   const files = fileGroup[String(folder.id)] ?? [];
//   const items = children.concat(files);
//   if (items.length <= 0) return "";
//   let html = `<ul class="sub__list hide">`;

//   items.forEach((ele) => {
//     if (!ele.mimetype) {
//       html += `
//             <li class="folder__item" data-type="folder">
//                 <a href="/folders/${ele.id}">
//                     ${ele.name}
//                 </a>
//                 ${walk(ele, data, fileGroup)}
//             </li>`;
//     } else {
//       html += `
//             <li class="folder__item">
//                 <a href="/files/${ele.id}">
//                     ${ele.name}
//                 </a>

//             </li>`;
//     }
//   });
//   html += `</ul>`;
//   return html;
// }
