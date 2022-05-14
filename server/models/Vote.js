module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define("vote", {
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Vote;
};
