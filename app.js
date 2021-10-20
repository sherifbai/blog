const express = require('express');
const multer = require('multer');

const authRoute = require('./routes/auth');
const messageRoute = require('./routes/message');

require('dotenv').config();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if ( file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const app = express();

require('./connections/database.connection');

app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static('images'));

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);

const port = process.env.PORT || 3000;

app.listen({port});
