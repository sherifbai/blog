const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {

        const existingUser = await User.findOne({ username: username });

        console.log(existingUser);

        if (existingUser) {
            return res.status(500).json({
                'data': null,
                'success': false,
                'message': 'User already exist'
            });
        }

        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            username: username,
            password: hashedPw
        });

        const savedUser = await user.save();

        savedUser.password = null;

        return res.status(201).json({
            'data': savedUser,
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

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({
                'data': null,
                'success': false,
                'message': 'User not found'
            });
        }

        const isEqualPw = await bcrypt.compare(password, user.password);

        if (!isEqualPw) {
            return res.status(401).json({
                'data': null,
                'success': false,
                'message': 'Passwords do not match'
            });
        }

        user.password = null;

        const token = jwt.sign(
            {
                username: user.username,
                userId: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        return res.status(200).json({
            'data': user,
            'success': true,
            'token': token
        });
    } catch (error) {
        return res.status(500).json({
            'data': null,
            'success': false,
            'message': error.message
        });
    }
}
