const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");

const User = db.users;
const Post = db.posts;
const Comment = db.comments;
const Vote = db.votes;
const saltRounds = 10;

const userController = {
    signup: async (req, res) => {
        const { username, passwd } = req.body;
        const password = bcrypt.hashSync(passwd, saltRounds);
        await User.create({
            username,
            password,
        })
            .then((result) => {
                let token = jwt.sign(
                    { id: result.id },
                    process.env.ACCESS_TOKEN_CODE
                );
                res.json({
                    status: true,
                    user: {
                        id: result.id,
                        username: result.username,
                    },
                    token,
                });
            })
            .catch((e) => {
                res.json({ status: false, error: "username exist" });
            });
    },

    login: async (req, res) => {
        const { username, passwd } = req.body;
        await User.findOne({
            where: {
                username,
            },
        })
            .then((result) => {
                if (result) {
                    const match = bcrypt.compareSync(
                        passwd,
                        result.dataValues.password
                    );
                    if (match) {
                        let token = jwt.sign(
                            { id: result.dataValues.id },
                            process.env.ACCESS_TOKEN_CODE
                        );
                        res.json({
                            status: true,
                            user: {
                                id: result.dataValues.id,
                                username: result.dataValues.username,
                            },
                            token,
                        });
                    } else {
                        res.json({
                            status: false,
                            error: "wrong username or password",
                        });
                    }
                } else {
                    res.json({
                        status: false,
                        error: "wrong username or password",
                    });
                }
            })
            .catch((e) => {
                res.json({ status: false, error: "username is invalid" });
            });
    },

    validate: async (req, res) => {
        const { userId } = req.body;
        await User.findOne({
            where: {
                id: userId,
            },
            attributes: ["username"],
        })
            .then((result) => {
                if (result) {
                    let token = jwt.sign(
                        { id: userId },
                        process.env.ACCESS_TOKEN_CODE
                    );
                    res.json({
                        status: true,
                        user: {
                            id: userId,
                            username: result.dataValues.username,
                        },
                        token,
                    });
                } else {
                    res.json({
                        status: false,
                        error: "invalid user",
                    });
                }
            })
            .catch((e) => {
                res.json({ status: false, error: "invalid user" });
            });
    },

    getProfile: async (req, res) => {
        const userId = req.params.id;
        return await User.findOne({
            where: {
                id: userId,
            },
            attributes: ["username"],
            include: [
                {
                    model: Post,
                    as: "post",
                    attributes: ["id", "question", "language", "updatedAt"],
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
                },
            ],
        })
            .then((result) => {
                res.json({
                    status: true,
                    profile: result.dataValues,
                });
            })
            .catch((e) => {
                res.json({ status: false, error: "invalid user" });
            });
    },

    // update: async (req, res) => {
    //     const { userId, passwd, newPasswd } = req.body;
    //     await User.findByPk(userId)
    //         .then((result) => {
    //             if (result) {
    //                 const match = bcrypt.compareSync(
    //                     passwd,
    //                     result.dataValues.password
    //                 );
    //                 return match;
    //             } else {
    //                 res.json({
    //                     status: false,
    //                     error: "wrong username or password",
    //                 });
    //             }
    //         })
    //         .then(async (match) => {
    //             if (match) {
    //                 const password = bcrypt.hashSync(newPasswd, saltRounds);
    //                 const changeResult = await User.update(
    //                     { password },
    //                     {
    //                         where: {
    //                             id: userId,
    //                         },
    //                     }
    //                 );
    //                 return changeResult;
    //             } else {
    //                 res.json({
    //                     status: false,
    //                     error: "wrong username or password",
    //                 });
    //             }
    //         })
    //         .then(() => {
    //             res.json({ status: true });
    //         })
    //         .catch((e) => {
    //             res.json({ status: false, error: "username is invalid" });
    //         });
    // },
};

module.exports = userController;
