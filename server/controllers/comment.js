const db = require("../models");

const User = db.users;
const Post = db.posts;
const Comment = db.comments;

const commentController = {
    create: async (req, res) => {
        const { reply, userId, postId } = req.body;
        await Comment.create({
            reply,
            userId,
            postId,
        })
            .then((result) => {
                res.json({ status: true, id: result.id });
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },

    get: async (req, res) => {
        const { postId } = req.body;
        await Comment.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "username"],
                },
            ],
            where: {
                postId,
            },
        })
            .then((result) => {
                res.json({ status: true, comments: result });
            })
            .catch((e) => {
                console.log(e);
                res.json({ status: false, error: "something went wrong" });
            });
    },

    update: async (req, res) => {
        const { userId, reply, postId, commentId } = req.body;

        await Comment.findOne({
            where: { id: commentId, postId, userId },
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
                    // await Comment.update(
                    //     { reply },
                    //     {
                    //         where: { id: commentId, postId, userId },
                    //     }
                    // );
                }
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },

    delete: async (req, res) => {
        const { userId, commentId, postId } = req.body;

        await Comment.findOne({
            where: { id: commentId, postId, userId },
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
                    // await Comment.delete(
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

module.exports = commentController;
