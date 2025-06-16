const { NextResponse } = require("next/server");

export async function GET(){
    try{
        const response = NextResponse.json(
        {
            message:"Logout Successfully",
            success:true,
        }
        
    )
    response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
    return response;
    }catch(err){
        return NextResponse.json({
            err:err.message
        },{status:500})
    }
}