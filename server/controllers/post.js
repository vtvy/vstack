const db = require("../models");

const User = db.users;
const Post = db.posts;

const postController = {
    create: async (req, res) => {
        const { question, language, userId } = req.body;
        await Post.create({
            question,
            language,
            userId,
        })
            .then((result) => {
                res.json({ status: true, id: result.id });
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },

    get: async (req, res) => {
        await Post.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "username"],
                },
            ],
        })
            .then((result) => {
                res.json({ status: true, posts: result });
            })
            .catch((e) => {
                console.log(e);
                res.json({ status: false, error: "something went wrong" });
            });
    },

    getOne: async (req, res) => {
        const id = req.params.id;
        await Post.findOne({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "username"],
                },
            ],
            where: { id },
        })
            .then((result) => {
                if (result) {
                    res.json({ status: true, post: result });
                } else {
                    res.json({ status: false, error: "the post is not exist" });
                }
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },
};

module.exports = postController;
