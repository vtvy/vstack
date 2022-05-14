import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import database from "./database/connection.js";
import userRoutes from "./routes/user.js";

const vstack = express();

vstack.use(cors(), bodyParser.json());

try {
    vstack.use("/user", userRoutes);

    const db = await database.sync();

    vstack.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
} catch (e) {
    console.log(e);
}
