import { Router } from "express";
import { dashboard } from "../controllers/user.controller.js";

const router = Router()

router.get('/dashboard',dashboard)

export  {router}