require("dotenv/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const database = require("./database/connection.js");
const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");
const commentRoutes = require("./routes/comment.js");

const vstack = express();

vstack.use(cors(), bodyParser.json());

try {
    vstack.use("/user", userRoutes);
    vstack.use("/question", postRoutes);
    vstack.use("/comment", commentRoutes);

    // const db = await database.sync();

    vstack.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
} catch (e) {
    console.log(e);
}
