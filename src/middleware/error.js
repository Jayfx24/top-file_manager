import { validationResult } from "express-validator";
import { authSchema, registerSchema } from "../config/validation";


function verifyAuth(req,res){
    const {error, value} = authSchema.validate(req)
    if (error){
        return res.render()
    }
}