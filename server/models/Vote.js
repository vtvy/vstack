module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define("vote", {
        upVote: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
    return Vote;
};
