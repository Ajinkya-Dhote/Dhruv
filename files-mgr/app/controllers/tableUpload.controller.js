const multer = require('multer');
const db = require('../config/db.config.js');
const {Sequelize} = require('../config/db.config.js');
const sequelize = require('sequelize');

const tablestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "\\uploads\\")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

exports.tableupload = multer({ storage: tablestorage });

exports.uploadFile = (req, res) => {
  
  var oRowsJson = ExceltoJSON(req.file.originalname);
  var oKeys = Object.keys(oRowsJson[0]); 
  var oModelSchemaStr = '{', oCreateTblMdlStr = '{';
  
  for (var each in oKeys) {
    if (oKeys[each] !== "__rowNum__") {      
      oCreateTblMdlStr += '"'+ oKeys[each] + '":"",';      
    }

  }
  oModelSchemaStr = oModelSchemaStr.slice(0, -1);
  oCreateTblMdlStr = oCreateTblMdlStr.slice(0, -1); 
  oCreateTblMdlStr += '}';
  var oCreateTblJSONMdl = JSON.parse(oCreateTblMdlStr);
  var oCreateTblMdl = Object.assign(oCreateTblJSONMdl);

  var oModelSchemaMdl = oCreateTblMdl;
  for (var each in oKeys) {  
    oModelSchemaMdl[oKeys[each]] =  Object.assign({ type: sequelize.STRING });
  }
   
    
  db.Table =  db.sequelize.define(req.file.originalname.split(".")[0], oModelSchemaMdl) ;
  const Table = db.Table;

    var oTblMdl = [];
    for (var eachRow = 0; eachRow < oRowsJson.length; eachRow++) {
      for (var each in oKeys) {            
        oCreateTblMdl[oKeys[each]] = oRowsJson[eachRow][oKeys[each]];       
      }
      oTblMdl[eachRow] = JSON.parse(JSON.stringify(oCreateTblMdl));
    }
    db.Table.sync({force: false}).then(() => {
      console.log('Drop and Resync with { force: false }');    
      var sFileName = req.file.originalname.split(".")[0];
      CreateSingleTableRecords(Table,sFileName,oTblMdl,0,oTblMdl.length,req, res,oRowsJson);

    });
    }

function CreateSingleTableRecords (Table,sFileName,oTblMdl,strIndex,len,req, res,oRowsJson)
{
  if(strIndex < len)
  {
    Table.create(oTblMdl[strIndex]).then(table => {
      if(strIndex === (len-1))
          res.json({msg:'Table Data Created/Updated successfully with Name - ' + sFileName,
                sentJSON : oRowsJson});
      else return CreateSingleTableRecords(Table, sFileName, oTblMdl, ++strIndex ,len,req, res,oRowsJson);
    }).catch(err => {
      console.log(err);
      res.json({ msg: 'Error', detail: err });
    });
  }
  else return;
}
 
function ExceltoJSON(fileName) {
  var XLSX = require('xlsx')
  var workbook = XLSX.readFile(__basedir + '\\uploads\\' + fileName);
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData;
}    
