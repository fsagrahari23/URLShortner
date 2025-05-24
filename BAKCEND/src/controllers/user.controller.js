import { getUrlById } from "../dao/short_url.js";



export const getAllUserUrl =async (req,res,next)=>{
    try{

        const userId = req.user.id;
        const urls = await getUrlById(userId);

        res.status(201).json({
            urls
        })
    }catch(err){
        next(err)
    }
}