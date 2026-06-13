export function uploadFile(req, res) {
  console.group(req.file, req.body);
  return res.redirect("/dashboard");
}
