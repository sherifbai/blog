const mongoose = require('mongoose');
const {use} = require("express/lib/router");

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = model('User',  userSchema);
