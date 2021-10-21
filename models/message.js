const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const messageSchema = new Schema(
    {
        text: {
            type: String
        },
        imageUrl: {
            type: String,
            required: false
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Message', messageSchema);
