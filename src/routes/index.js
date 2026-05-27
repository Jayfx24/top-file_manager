import { Router } from "express";
// import folderRouter from "./folder.js";
// import fileRouter from "./file.js";

const router = Router()

router.get("/",(req,res)=>{
    res.send("We are live")
})
router.get("/login",loginGet)
// router.get("/register",registerGet)

// router.use("/folders",folderRouter)
// router.use("/files",folderRouter)



export default router

