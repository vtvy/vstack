import User from "../models/User.js";

const userController = {
    user: async (req, res) => {
        const result = await User.create({
            username: "huhu",
        });
        res.json({ hi: "success" });
    },
};

export default userController;
