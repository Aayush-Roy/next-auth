import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(req) {
    try{
        const reqBody = await req.json();
        const { token } = reqBody;
        console.log(token);
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if(!user) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400});
        }
        user.isVerified = true;
        user.verifyToken = undefined;   
        user.verifyTokenExpiry = undefined; 
        await user.save();
        return NextResponse.json({message: "Email verified successfully"}, {status: 200});
    }catch(err){
        return NextResponse.json({error:err.message}, {status:500});
    }
}
