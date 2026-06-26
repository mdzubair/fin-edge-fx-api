// import dotenv from "dotenv";
// dotenv.config({ debug: true,  override: true, quiet: true, path:[".env"]});
import app from "../src/configs/app";
import connectDB from "../src/configs/database";
connectDB().catch(console.error);
export default app;