// import { connect } from "@/dbConfig/dbConfig.js";
// // import User from "@/models/userModel.js";
// import { NextRequest,NextResponse } from "next/server";
// import bcryptjs from "bcryptjs"
// import User from "@/models/userModel.js";
// import { SendEmail } from "@/helpers/mailer";

// connect();

// export async function POST(request) {
//     try{
//         const reqBody = await request.json();
//         console.log(reqBody);
//         const {username,email,password} = reqBody;

//         //check the user
//         const user = await User.findOne({email});
//         if(user) return NextResponse.json({error:"User already exist"},{status:400});

//         //hashing pasword
//         const salt = await bcryptjs.genSalt(10)
//         const hashedPassword = await bcryptjs.hash(password,salt)

//         const newUser = new User({
//             email,
//             username,
//             password:hashedPassword
//         });

//       const saveduser =  await newUser.save();
//       console.log(saveduser);

//       // Send verification email

//       await SendEmail({email, emailType:"VERIFY", userId:saveduser._id});
//       return NextResponse.json({
//         msg:"User created succesfully",
//         success:true,
//         saveduser,
//       })

//     }catch(err){
//       console.error("Error in signup route:", err); // log full error
//         return NextResponse.json({err:err.message},{status:500})
//     }
// }
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { SendEmail } from "@/helpers/mailer";

// ensure DB ready before first query
await connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // Password strength validation
    // if (typeof password !== 'string' || password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    //   return NextResponse.json({ success: false, error: "Password must be at least 8 characters and include upper, lower, and number." }, { status: 400 });
    // }


    // hash
    const hashedPassword = await bcryptjs.hash(password, 10);

    // save
    const savedUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // try-send email, but don’t abort signup if it fails
    try {
      await SendEmail({ email, emailType:"VERIFY", userId: savedUser._id });
    } catch (mailErr) {
      console.error("Email error:", mailErr);
    }

    return NextResponse.json(
      {
        success: true,
        user: { id: savedUser._id, username: savedUser.username, email: savedUser.email },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup route error:", err);
    return NextResponse.json({ success:false, error: err.message }, { status: 500 });
  }
}
