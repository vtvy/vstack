const db = require("../models");

const User = db.users;
const Post = db.posts;
const Comment = db.comments;
const Vote = db.votes;

const postController = {
    create: async (req, res) => {
        const { question, language, userId } = req.body;
        await Post.create({
            question,
            language,
            userId,
        })
            .then((result) => {
                res.json({
                    status: true,
                    post: result,
                });
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
                {
                    model: Comment,
                    as: "comment",
                    attributes: ["id"],
                },
                {
                    model: Vote,
                    as: "vote",
                    attributes: ["id", "upVote", "userId"],
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
        const { userId, question, language, id } = req.body;
        if (!question || !language) {
            res.json({
                status: false,
                error: "you must provide question and language",
            });
        } else {
            await Post.findOne({
                where: { id, userId },
            })
                .then(async (result) => {
                    if (result) {
                        await Post.update(
                            { question, language },
                            {
                                where: { id, userId },
                            }
                        );
                        let newPost = await Post.findOne({
                            include: [
                                {
                                    model: User,
                                    as: "user",
                                    attributes: ["id", "username"],
                                },
                                {
                                    model: Comment,
                                    as: "comment",
                                    attributes: ["id"],
                                },
                                {
                                    model: Vote,
                                    as: "vote",
                                    attributes: ["id", "upVote", "userId"],
                                },
                            ],
                            where: { id },
                        });
                        res.json({
                            status: true,
                            post: newPost.dataValues,
                        });
                    } else {
                        res.json({
                            status: false,
                            error: "the post is not exist",
                        });
                    }
                })

                .catch((e) => {
                    res.json({
                        status: false,
                        error: "you must provide valid question and language",
                    });
                });
        }
    },

    delete: async (req, res) => {
        const postId = req.params.id;
        const { userId } = req.body;

        await Post.findOne({
            where: { id: postId, userId },
        })
            .then(async (result) => {
                if (result) {
                    await Comment.destroy({
                        where: {
                            postId,
                        },
                    });
                    await Vote.destroy({
                        where: {
                            postId,
                        },
                    });

                    await Post.destroy({
                        where: { id: postId, userId },
                    });
                    res.json({ status: true });
                } else {
                    res.json({ status: false, error: "the post is not exist" });
                }
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },

    vote: async (req, res) => {
        const upvote = 1,
            devote = -1;
        const { vote, userId, postId } = req.body;
        if (vote !== upvote && vote !== devote) {
            res.json({
                status: false,
                error: "you need to provide valid vote value",
            });
        } else {
            var upVoteValue = vote === upvote;
            await Vote.findOrCreate({
                where: { userId, postId },
                defaults: {
                    upVote: upVoteValue,
                },
            })
                .then(async ([result, created]) => {
                    if (created) {
                        res.json({ status: true, vote });
                    } else if (result.dataValues.upVote == upVoteValue) {
                        await Vote.destroy({
                            where: { userId, postId },
                        });
                        res.json({ status: true, vote: 0 });
                    } else {
                        await Vote.update(
                            { upVote: upVoteValue },
                            {
                                where: { userId, postId },
                            }
                        );
                        res.json({ status: true, vote });
                    }
                })
                .catch((e) => {
                    res.json({ status: false, error: "something went wrong" });
                });
        }
    },
};

module.exports = postController;
