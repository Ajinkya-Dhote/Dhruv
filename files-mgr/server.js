const express = require('express');
const app = express();

var swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI =  require('swagger-ui-express');


const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
 
global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
}); 

let router = require('./app/routers/file.router.js');

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Upload Service Node Swagger API',
    version: '1.0.0',
    description: 'Upload Service',
  },
  host: 'localhost:8080',
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
 
  let host = "localhost"; //server.address().address
  let port = "8089"; // server.address().port
  
  console.log("App listening at http://%s:%s", host, port); 
})

