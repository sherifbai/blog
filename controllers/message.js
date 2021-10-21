const Message = require('../models/message');

exports.createMessage = async (req, res) => {
    const { text } = req.body

    try {
        if (!req.file) {
            const message = new Message({
                text: text,
                author: req.userId
            });

            const savedMessage = await message.save();

            return res.status(201).json({
                'data': savedMessage,
                'success': true,
            });
        }

        const imageUrl = req.file.path.replace(/\\/g, '/');

        const message = new Message({
            text: text,
            author: req.userId,
            imageUrl: imageUrl
        });

        const savedMessage = await message.save();

        return res.status(201).json({
            'data': savedMessage,
            'success': true,
        });
    } catch (error) {
        return res.status(500).json({
            'data': null,
            'success': false,
            'message': error.message
        });
    }
}

exports.getMessages = async (req, res) => {
    try {
        const totalItems = await Message.find().count();
        const currentPage = req.query.page || 1;
        const perPage = 20;

        const messages = await Message.find().skip((currentPage -1) * perPage).limit(perPage);

        return res.status(200).json({
            'data': messages,
            'success': true,
            'totalItems': totalItems
        });
    } catch (error) {
        return res.status(500).json({
            'data': null,
            'success': false,
            'message': error.message
        });
    }
}

exports.getMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findOne({ _id: id });

        if (!message) {
            return res.status(404).json({
                'data': null,
                'success': false,
                'message': 'Message not found'
            });
        }

        return res.status(200).json({
            'data': message,
            'success': true
        });
    } catch (error) {
        return res.status(500).json({
            'data': null,
            'success': false,
            'message': error.message
        });
    }
}

exports.updateMessage = async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;

    try {
        const message = await Message.findOne({ _id: id });

        if (!message) {
            return res.status(404).json({
                'data': null,
                'success': false,
                'message': 'Message not found'
            });
        }

        if (req.file) {
            message.imageUrl = req.file.path.replace(/\\/g, '/');
            message.text = text;

            const savedMessage = await message.save();

            return res.status(200).json({
                'data': savedMessage,
                'success': true
            });
        }

        message.text = text

        const savedMessage = await message.save();

        return res.status(200).json({
            'data': savedMessage,
            'success': true
        });
    } catch (error) {
        return res.status(500).json({
            'data': null,
            'success': false,
            'message': error.message
        });
    }
}

exports.deleteMessage = async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findOne({ _id: id });

        if (!message) {
            return res.status(404).json({
                'data': null,
                'success': false,
                'message': 'Message not found'
            });
        }

        await Message.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            'data': null,
            'success': true
        });
    } catch (error) {
        return res.status(500).json({
            'data': null,
            'success': false,
            'message': error.message
        });
    }
}
