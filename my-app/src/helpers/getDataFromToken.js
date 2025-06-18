import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req)=>{
    try{
        const token = req.cookies.get('token')?.value;
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);
        return decodedToken.id;
    }catch(err){
        throw new Error(err.message)
    }
}