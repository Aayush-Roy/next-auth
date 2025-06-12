import { connect } from "@/dbConfig/dbConfig.js";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/models/userModel.js";


connect();
export async function login(request) {
    try{
        const reqBody = await request.json();
        const{email,password} = reqBody;
        const user = await User.findOne({email});

        //check if user exist
        if(!user) return NextResponse.json({error:"User does'nt exist"},{status:400})

        //check password
        const validatePassword = await bcryptjs.compare(password,user.password);
        if(!validatePassword) {
            return NextResponse.json({error:"Invalid Password"},{status:400})            
        }

        //create token data
        const tokenData={
            id:user._id,
            email:user.email,
            username:user.username,
        }
    }catch(err){
        return NextResponse.json({err:err.message},{status:500});
    }
}