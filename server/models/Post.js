module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Post;
};
