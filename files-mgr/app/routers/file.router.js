let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI =  require('swagger-ui-express');
const fileWorker = require('../controllers/file.controller.js');
const tableUploadWorker = require('../controllers/tableUpload.controller.js');

/**
* @swagger
* /api/file/info:
*   get:
*     tags:
*       - Files
*     description: Returns all Files 
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of Files
*         schema:
*           $ref: '#/definitions/File'
*/

router.get('/api/file/info', fileWorker.listAllFiles);

/**
 * @swagger
 * /api/file/upload?City=NGP&EntityID=MILL_232&TransID=435&Part=2:
 *   post:
 *     tags:
 *       - File
 *     description: Creates a new File
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *       - name: upfile
 *       - type: file
 *       - City: string
 *       - EntityID: string
 *       - TransID: string
 *       - file: Upload File
 *     headers:
 *       - Encoding: encoding  
 *     responses:
 *       200:
 *         description: Successfully uploaded
 */

router.post('/api/file/upload', upload.single("file"), fileWorker.uploadFile);

/**
* @swagger
* /api/file/infoFilters?City=NGP&EntityID=MILL_232&TransID=435:
*   get:
*     tags:
*       - Files
*     description: Returns all Files 
*     produces:
*       - application/json
*     parameters:
*       - City: string
*       - EntityID: string
*       - TransID: string       
*         schema:
 *           $ref: '#/definitions/File'
*     responses:
*       200:
*         description: An array of Files
*         schema:
*           $ref: '#/definitions/File'
*/
 
router.get('/api/file/infoFilters', fileWorker.findFilesByFilters);

/**
* @swagger
* /api/file/{id}:
*   get:
*     tags:
*       - Files
*     description: Returns all Files 
*     parameters:
*       - id: int
*     responses:
*       200:
*         description: Download File
*/
 
router.get('/api/file/:id', fileWorker.downloadFile);


/**
* @swagger
* /api/file/delete/{id}:
*   delete:
*     tags:
*       - Files
*     description: Delete file with given ID 
*     parameters:
*       - id: int
*     responses:
*       200:
*         description: Successful confirmation
*/
 
router.delete('/api/file/delete/:id', fileWorker.deleteFile);

/**
* @swagger
* /api/file/update/{id}:
*   put:
*     tags:
*       - Files
*     description: update file with given ID 
*     parameters:
*       - id: int
*     responses:
*       200:
*         description: Successful confirmation
*/

router.put('/api/file/update/:id', upload.single("file"), fileWorker.updateFile);
 
/**
 * @swagger
 * /api/file/tableupload:
 *   post:
 *     tags:
 *       - Table
 *     description: Creates a new Table
 *     consumes:
 *       - multipart/form-data
 *     responses:
 *       200:
 *         description: Successfully uploaded
 */
router.post('/api/file/tableupload', tableUploadWorker.tableupload.single("file"), tableUploadWorker.uploadFile);

module.exports = router;