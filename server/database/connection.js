import { Sequelize } from "sequelize";

const sequelize = new Sequelize("vstack", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

export default sequelize;
