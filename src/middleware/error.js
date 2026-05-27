import { validationResult } from "express-validator";

function verifyData(req,res){
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.render()
    }
}