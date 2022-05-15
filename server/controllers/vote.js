const db = require("../models");

const User = db.users;
const Post = db.posts;
const Comment = db.comments;
const Vote = db.votes;

const voteController = {
    vote: async (req, res) => {
        const upvote = 1,
            devote = -1;
        const { value, userId, postId } = req.body;
        console.log("11 vote", value);
        if (value !== upvote || value !== devote) {
            res.json({
                status: false,
                error: "you need to provide valid voted value",
            });
        }

        await Vote.findOrCreate({
            where: { username: "sdepold" },
            defaults: {
                job: "Technical Lead JavaScript",
            },
        })
            .then(async (vote, created) => {
                console.log("28 vote", vote);
                console.log("29 vote", created);

                // res.json({ status: true, id: result.id });
            })
            .catch((e) => {
                res.json({ status: false, error: "something went wrong" });
            });
    },
};

module.exports = voteController;
