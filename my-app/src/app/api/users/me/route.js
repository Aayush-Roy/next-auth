
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig.js";
import { NextResponse } from "next/server";
connect();

export async function GET(req){
    try{
      const userId = await  getDataFromToken(req);
      const user = await User.findOne({_id:userId}).select("-password")  ;
      return NextResponse.json({
        message:"User Found",
        data:user
      })
    }catch(err){
        return NextResponse.json({error:err.message},{status:400})
    }
}

