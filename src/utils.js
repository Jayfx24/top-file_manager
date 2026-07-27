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
export function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GiB', ]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}



