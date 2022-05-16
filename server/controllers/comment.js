const db = require("../models");

const User = db.users;
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
        const postId = req.params.id;
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
            .then(async (result) => {
                if (result) {
                    await Comment.update(
                        { reply },
                        {
                            where: { id: commentId, postId, userId },
                        }
                    );
                    res.json({ status: true });
                } else {
                    res.json({ status: false, error: "the post is not exist" });
                }
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },

    delete: async (req, res) => {
        const commentId = req.params.cmtId;
        const { userId } = req.body;

        await Comment.findOne({
            where: { id: commentId, userId },
        })
            .then(async (result) => {
                if (result) {
                    await Comment.destroy({
                        where: { id: commentId, userId },
                    });
                    res.json({ status: true });
                } else {
                    res.json({ status: false, error: "the post is not exist" });
                }
            })
            .then(async (result) => {
                if (result) {
                }
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },
};

module.exports = commentController;
