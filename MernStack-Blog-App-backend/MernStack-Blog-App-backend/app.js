import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
const connectDb= async()=>{
  try {
   const conn= await mongoose.connect("mongodb+srv://shubham:${process.env.MONGODB_PASSWORD}@cluster0.qvt2fgu.mongodb.net/?retryWrites=true&w=majority", {
     useUnifiedTopology: true,
     useNewUrlParser: true,
   })
   console.log("connected"+conn.connection.host);
  } catch (error) {
   console.log(error.message);
      }
 }
connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("app listning on " + PORT);
});

