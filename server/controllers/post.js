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

    update: async (req, res) => {
        const { userId, question, language, postId } = req.body;
        if (question || language) {
            res.json({
                status: false,
                error: "you must provide question and language",
            });
        }

        await Post.findOne({
            where: { id: postId, userId },
        })
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    res.json({ status: false, error: "the post is not exist" });
                }
            })
            .then(async (result) => {
                console.log(result);
                if (result) {
                    // await Post.update(
                    //     { question, language },
                    //     {
                    //         where: { id: postId, userId },
                    //     }
                    // );
                }
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },

    delete: async (req, res) => {
        const { userId, postId } = req.body;

        await Post.findOne({
            where: { id: postId, userId },
        })
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    res.json({ status: false, error: "the post is not exist" });
                }
            })
            .then(async (result) => {
                console.log(result);
                if (result) {
                    // await Post.delete(
                    //     {
                    //         where: { id: postId, userId },
                    //     }
                    // );
                }
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },
};

module.exports = postController;
