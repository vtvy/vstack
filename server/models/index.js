const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("database connected..");
    })
    .catch((err) => {
        console.log("Error" + err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, DataTypes);
db.posts = require("./post.js")(sequelize, DataTypes);
db.comments = require("./comment.js")(sequelize, DataTypes);
db.votes = require("./vote.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done!");
});

// user and post
db.users.hasMany(db.posts, {
    foreignKey: "userId",
    as: "post",
});

db.posts.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});

// post and comment
db.posts.hasMany(db.comments, {
    foreignKey: "postId",
    as: "comment",
});

db.comments.belongsTo(db.posts, {
    foreignKey: "postId",
    as: "post",
});

//user and comment
db.users.hasMany(db.comments, {
    foreignKey: "userId",
    as: "comment",
});

db.comments.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});

//post and vote
db.posts.hasMany(db.votes, {
    foreignKey: "postId",
    as: "vote",
});

db.votes.belongsTo(db.posts, {
    foreignKey: "postId",
    as: "post",
});

//user and vote
db.users.hasMany(db.votes, {
    foreignKey: "userId",
    as: "vote",
});

db.votes.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});

module.exports = db;
