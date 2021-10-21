const { Router } = require('express');

const messageController = require('../controllers/message');
const isAuth = require('../middleware/isAuth');

const route = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Message:
 *          type: object
 *          properties:
 *              text:
 *                  type: string
 *                  description: Text of the book
 *              image:
 *                  type: file
 *                  format: binary
 *                  description: ImageUrl of the book (if it has the image)
 *          example:
 *              text: da eto norma
 *              author: 6170399c2c29b2c57c46de20
 */

/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: The messages managing api
 */


/**
 * @swagger
 * /api/message/create:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Create a new message
 *      consumes:
 *           - multipart/form-data
 *      tags: [Messages]
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: array
 *                      $ref: '#/components/schemas/Message'
 *      responses:
 *          '201':
 *              description: The message created
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Message'
 *
 * /api/message:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Returns the list of all the messages
 *      tags: [Messages]
 *      responses:
 *          '200':
 *              description: The list of al the books
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Message'
 *
 * /api/message/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Return the message by ID
 *      tags: [Messages]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The message ID
 *      responses:
 *          200:
 *              description: The message by ID
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         items:
 *                          $ref: '#/components/schemas/Message'
 *
 * /api/message/update/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Return updated message
 *      tags: [Messages]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The message ID
 *      requestBody:
 *          required: false
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: array
 *                      $ref: '#/components/schemas/Message'
 *      responses:
 *          200:
 *              description: update the message by ID
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         items:
 *                          $ref: '#/components/schemas/Message'
 *
 * /api/message/delete/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Delete message
 *      tags: [Messages]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The message ID
 *      responses:
 *          200:
 *              description: update the message by ID
 */

route.post('/create', isAuth, messageController.createMessage);
route.get('/', isAuth, messageController.getMessages);
route.get('/:id', isAuth, messageController.getMessage);
route.put('/update/:id', isAuth, messageController.updateMessage);
route.delete('/delete/:id', isAuth, messageController.deleteMessage);

module.exports = route;
