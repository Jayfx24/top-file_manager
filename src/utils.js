export function reversedWalk(data, groupData, baseUrl = "", breadcrumb = []) {
  if (!data) return breadcrumb;
  const base = data.mimetype ? "/files" : "/folders";
  breadcrumb.unshift({
    label: data.name,
    id: data.id,
    base,
  });
  const parentId = data.parentId ?? data.folderId;
  const parentData = groupData.find((parent) => parent.id === parentId);
  return reversedWalk(parentData, groupData, base, breadcrumb);
}

function walkFolder(folder, folderGroup, fileGroup){
  if (!folder) return ""
  const childrenFolder = folderGroup[String(folder.id)]
      // get child


}


