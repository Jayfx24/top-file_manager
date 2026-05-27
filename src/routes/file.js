import { Router } from "express";

const fileRouter = Router()

fileRouter.get("/", files)
fileRouter.post("/share/:id",shareFile)
fileRouter.get("/:file",viewFile)



export default fileRouter