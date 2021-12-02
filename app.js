const express = require('express');
const multer = require('multer');
const fs = require('fs');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoute = require('./routes/auth');
const messageRoute = require('./routes/message');

require('dotenv').config();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'Simple blog API'
        },
        servers: [{
            url: 'http://localhost:3000'
        }]
    },
    apis: ['./routes/*.js']
}

const specs = swaggerJsDoc(swaggerOptions);

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

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static('images'));

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);

const port = process.env.PORT || 3000;
fs.writeFileSync('./swagger.json', JSON.stringify(specs));

app.listen({port});
