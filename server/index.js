import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";

const vstack = express();

vstack.use(cors(), express.json(), bodyParser.json());

vstack.use("/user", userRoutes);

vstack.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
