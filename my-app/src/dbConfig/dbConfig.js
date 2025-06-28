// import mongoose from "mongoose";

// export const connect=async()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log(process.env.MONGO_URI)
//         const connection = mongoose.connection;
//         connection.on('connected',()=>{
//             console.log('MongoDB connected successfully!');
//         })
//         connection.on('error',(err)=>{
//             console.log('MongoDB connection error'+err);
//             process.exit();
//         })

//     }catch(err){
//         console.log("Something went wrong!!");
//         console.log(err);
//     }
// }
// lib/dbConnect.ts
// dbConfig.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// 🔄 global cache so the connection survives across Vercel function invocations
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
  // Already connected?
  if (cached.conn) return cached.conn;

  // Create the connection promise once
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "nextauth",   // optional if db name already in URI
      bufferCommands: false // avoid command buffering timeouts
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null; // reset so next attempt can retry
    throw err;
  }
}
