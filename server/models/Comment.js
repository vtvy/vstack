module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
        reply: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Comment;
};
