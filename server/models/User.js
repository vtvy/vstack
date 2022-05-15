module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                min: 4,
            },
        },
        password: { type: DataTypes.STRING, allowNull: false },
    });

    return User;
};
