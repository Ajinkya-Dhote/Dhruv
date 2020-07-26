
// var express = require('express'),
//  httpProxy = require('http-proxy'),
//     fs = require('fs'),
//     proxy = new httpProxy.createProxyServer();

// const appRoute = {
//     target: 'http://localhost:8081'
// };
// debugger;
// const routing = JSON.parse(fs.readFileSync('./api.json'));
// console.log(routing);

// var allowCrossDomain = function(req, res) {
//     // res.header('Access-Control-Allow-Origin', '*');
//     // res.header('Access-Control-Allow-Credentials', 'true');
//     // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     // res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID');
// 	console.log(req.method);
// 	// intercept OPTIONS method
//     // if ('OPTIONS' === req.method) {
//     //     res.header(200);
//     //     console.log("In Options");
//     // } else {
//         // var dirname = req.url.replace(/^\/([^\/]*).*$/, '$1');
      
//         // var route = routing[dirname]  || appRoute;
//         // console.log(req.method + ': ' + route.target + req.url);
//         // proxy.web(req, res, route);
//         proxy.web(req, res, { target: 'http://52.66.212.18:8084/api/' });
//     // }
// };

// var app = express();
// app.use(allowCrossDomain);
// app.listen(8005);
// console.log("Proxy started on http://localhost:8005");


// // var cors_proxy = require('cors-anywhere');

// // // Listen on a specific IP Address
// // var host = 'localhost';

// // // Listen on a specific port, adjust if necessary
// // var port = 8081;

// // cors_proxy.createServer({
// // 	originWhitelist: [], // Allow all origins
// // 	requireHeader: ['origin', 'x-requested-with'],
// // 	removeHeaders: ['cookie', 'cookie2']
// // }).listen(port, host, function() {
// // 	console.log('Running CORS Anywhere on ' + host + ':' + port);
// // });



var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://52.66.212.18:8084/api/' });
});
console.log("listening on port 8005")
server.listen(8005);