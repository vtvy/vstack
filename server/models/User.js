import { Sequelize } from "sequelize";
import sequelize from "../database/connection.js";

const User = sequelize.define("user", {
    username: { type: Sequelize.STRING(100), allowNull: false },
});

export default User;
