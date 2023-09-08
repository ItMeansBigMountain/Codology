// highscore.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Highscore = sequelize.define('Highscore', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Highscore;
