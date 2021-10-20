const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const authHeader = req.get('authorization');

    if (!authHeader) {
        return res.status(401).json({
           'data': null,
           'success': false,
           'message': 'Not authenticated'
        });
    }

    const token = authHeader.split(' ')[1];

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(500).json({
            'data': null,
            'success': false,
            'message': error.message
        });
    }

    if (!decodedToken) {
        return res.status(401).json({
            'data': null,
            'success': false,
            'message': 'Not authenticated'
        });
    }

    req.userId = decodedToken.userId;
    next();
}
