
var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI =  require('swagger-ui-express');
/**
 * @swagger
 * definitions:
 *   File:
 * 	   type: Object
 *     properties:
 *       Name:
 *         type: string
 *       EntityID:
 *         type: string
 *       City:
 *         type: string
 *       TransID:
 *         type: string
 *       FileType:
 *         type: string
 *       FileData:
 *         type: BLOB
 *       FolderPath:
 *         type: string
 *       Encoding:
 *         type: string
 *       Part:
 *         type: string
 *       Exec:
 *         type: string
 */


module.exports = (sequelize, Sequelize) => {
	const File = sequelize.define('file', {
		Name: {
			type: Sequelize.STRING
		},
		EntityID: {
			type: Sequelize.STRING
		},
		City: {
			type: Sequelize.STRING
		},
		TransID: {
			type: Sequelize.STRING
		},
		FileType: {
			type: Sequelize.STRING
	  	},
		FileData: {
			type: Sequelize.BLOB('long')
		},
		FolderPath : {
			type:  Sequelize.STRING
		},
		Encoding : {
			type:  Sequelize.STRING
		},
		Part : {
			type:  Sequelize.STRING
		},
		Exec : {
			type:  Sequelize.STRING
		}
	});

	return File;
}