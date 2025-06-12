import { connect } from "@/dbConfig/dbConfig.js";
// import User from "@/models/userModel.js";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/models/userModel.js";

connect();

export async function POST(request) {
    try{
        const reqBody = await request.json();
        console.log(reqBody);
        const {username,email,password} = reqBody;

        //check the user
        const user = await User.findOne({email});
        if(user) return NextResponse.json({error:"User already exist"},{status:400});

        //hashing pasword
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            email,
            username,
            password:hashedPassword
        });

      const saveduser =  await newUser.save();
      console.log(saveduser);

      return NextResponse.json({
        msg:"User created succesfully",
        success:true,
        saveduser,
      })

    }catch(err){
      console.error("Error in signup route:", err); // log full error
        return NextResponse.json({err:err.message},{status:500})
    }
}