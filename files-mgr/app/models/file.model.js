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
		}
	});

	return File;
}