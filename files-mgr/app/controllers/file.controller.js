var stream = require('stream');

// const logger = require(__basedir+"\\server.js");

// const s3UploadWorker = require('./controllers/s3upload.controller.js');
const db = require('../config/db.config.js');
const { Sequelize } = require('../config/db.config.js');
const sequelize = require('sequelize');
const File = db.files;

const { createLogger, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const logger = createLogger({
	transports: [
	  new transports.DailyRotateFile({ filename: "combined.log", dirname : __basedir+"//app//logging//",
	  datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '14d'
	}) 
	],
	exceptionHandlers: [
		new transports.DailyRotateFile({ filename: "exceptions.log", dirname : __basedir+"//app//logging//",
		datePattern: 'YYYY-MM-DD-HH',
		zippedArchive: true,
		maxSize: '5m',
		maxFiles: '14d' })
	]  
  });
// var Op = db.Op;

exports.uploadFile = (req, res) => {
	try{
exports.uploadFile = (req, res) => {

	// Need Header Parameter 'encoding'
	let sCity = req.query.City;
	let sEntityID = req.query.EntityID ;
	let sTransID = req.query.TransID ;
	let sEncoding = req.headers.encoding;	
	let sPart = req.query.Part;	
	let sExecutive = req.query.Exec;	
	let sFolder = sEntityID.split("_")[0];
	let sFolderPath = sCity+"/"+ sFolder + "/" + req.file.originalname;
	if(sFolder!="PRODUCT")
	{
		if(sTransID)
		sFolderPath = sCity+"/"+ sFolder + "/" +sEntityID.split("_")[1] +"/Transactions/"+  req.file.originalname;
		else
		sFolderPath = sCity+"/"+ sFolder + "/" +sEntityID.split("_")[1] +"/"+ req.file.originalname;
	}	

	File.create({
		FileType: req.file.mimetype,
		Name: req.file.originalname,
		FileData: req.file.buffer,
		City: sCity,
		Exec: sExecutive,
		EntityID: sEntityID, // Ex. PRODUCT_1, CONSUMER_2, MILL_3
		TransID : sTransID,
		FolderPath : sFolderPath,
		Encoding : sEncoding,
		Part : sPart
	}).then(() => {
		var sFileId;
		var sFileName = req.file.originalname ;
		let sPart = req.query.Part;
		let sEntityID = req.query.EntityID;
		

		db.sequelize.query("SELECT  \"id\" from files WHERE \"Part\"= :param1 AND \"EntityID\"= :param2",
{ replacements: { param1: sPart , param2: sEntityID  }, type: sequelize.QueryTypes.SELECT })
.then(file => {
	 	sFileId = file[0].id;
			res.json({msg:'File uploaded successfully! -> filename = ' +sFileName,
				URL : '/api/file/' + sFileId +''});
	}).catch(err => {

		logger.info(err);

		console.log(err);

		res.json({msg: 'Error', detail: err});
	});
		
	}).catch(err => {

	logger.info(err);
		res.json({msg: 'Error', detail: err});
	});
}
catch(err){
	logger.error(err.message+" "+err.stack);
	console.error(err);
	// res.json({msg: 'Error', detail: err});
}
}

		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}


exports.listAllFiles = (req, res) => {
	File.findAll({attributes: ['id', 'Name', 'City', 'EntityID','TransID','FileType', 'FolderPath','Part', 'Exec']
	}).then(files => {
	  res.json(files);
	}).catch(err => {

		logger.info(err);

		console.log(err);

		res.json({msg: 'Error', detail: err});
	});
}

exports.findFilesByFilters = (req, res) => {
	var sId = req.query.id === (null || undefined) ? "*" : req.query.id ;
	var sCity = req.query.City === (null || undefined) ? "*" : req.query.City ;
	var sEntityID = req.query.EntityID === (null || undefined) ? "*" :  req.query.EntityID ;
	var sTransID =  req.query.TransID === (null || undefined) ? "*" : req.query.TransID ;
	var query;
	if(sCity !=="*" && sEntityID !=="*" && sTransID !=="*")
	{
		query = { 
			text: "SELECT \"Name\", \"id\" ,\"City\", \"EntityID\", \"TransID\" ,\"Encoding\"  from files WHERE \"City\"= :param1 AND \"EntityID\"= :param2 AND \"TransID\"= :param3",
			values : { replacements: { param1: sCity , param2: sEntityID, param3:sTransID  }, type: sequelize.QueryTypes.SELECT }
			};
	}
	else
	{
		query = { 
			text: "SELECT \"Name\", \"id\" ,\"City\", \"EntityID\", \"TransID\" ,\"Encoding\"  from files WHERE \"City\"= :param1 AND \"EntityID\"= :param2 OR \"TransID\"= :param3",
			values : { replacements: { param1: sCity , param2: sEntityID, param3:sTransID  }, type: sequelize.QueryTypes.SELECT }
			};
	}
	
	// db.sequelize.query(query)

// id, Name, City, EntityID, TransID, Encoding
db.sequelize.query(query.text, query.values)
.then(files => {
	  res.json(files);
	}).catch(err => {

		logger.info(err);

		console.log(err);

		res.json({msg: 'Error', detail: err});
	});
}

exports.downloadFile = (req, res) => {
	File.findById(req.params.id).then(file => {
		if(file.dataValues) 
		{
			var fileContents = Buffer.from(file.dataValues.FileData, file.dataValues.Encoding);
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.Name);
		res.set('Content-Type', file.FileType);

		readStream.pipe(res);
		}
		else
		{
			res.json({msg: 'No such file in directory.', detail: ""});
		}
		
	}).catch(err => {

		logger.info(err);

		console.log(err);

		res.json({msg: 'Error', detail: err});
	});
}


exports.deleteFile = (req, res) => {
	let sRequestedID = req.params.id ;
	File.destroy({ 	where : { id : req.params.id }
	}).then(files => {
	  res.json( {msg:"File Deleted with Id - " + sRequestedID});
	}).catch(err => {

		logger.info(err);

		console.log(err);

		res.json({msg: 'Error', detail: err});
	});
}

exports.updateFile = (req, res) => {	
	var sEncoding = req.headers.encoding;	
	let sRequestedID = req.params.id ;
	File.update({
		FileType: req.file.mimetype,
		Name: req.file.originalname,
		FileData: req.file.buffer,		
		Encoding : sEncoding		
	},
	{ where : { id : req.params.id } }
	).then(files => {
	  res.json( {msg:"File Updated with Id - " + sRequestedID});
	}).catch(err => {

		logger.info(err);

		console.log(err);

		res.json({msg: 'Error', detail: err});
	});
}



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return "";
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}