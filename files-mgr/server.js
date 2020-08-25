const express = require('express');

const fs = require("fs")

const app = express();

var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI =  require('swagger-ui-express');


// const cors = require('cors')
// const corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
}); 

let router = require('./app/routers/file.router.js');


const { createLogger, transports } = require('winston');

// Enable exception handling when you create your logger.
const logger = createLogger({
  transports: [
    new transports.File({ filename: 'combined.log' }) 
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ]  
});


// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Upload Service Node Swagger API',
    version: '1.0.0',
    description: 'Upload Service',
  },
  host: process.env.HOSTNAME+':'+process.env.HOSTPORT,
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./app/routers/file.router.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
router.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/api-uploadDocs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/', router);


// console.log(process.env);
// Create a Server
const server = app.listen(8089, function () {
 
  let host = process.env.HOSTNAME; //server.address().address
  let port = process.env.HOSTPORT; // server.address().port
  
  console.log("App listening at http://%s:%s", host, port); 

  logger.info("App listening at http://%s:%s", host, port);
})

process.on("uncaughtException", function(err)
{
// fs.appendFileSync("exceptions.log", "Exception - "+new Date()+ " - "+err.message)
console.log("Exception - "+new Date()+ " - "+err.message)
setTimeout(function() { process.exit(1) }, 1000);

})

})


