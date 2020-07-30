// include fs-extra package
var fs = require("fs-extra");
 
var source = '/ElseScope/Dhruv/ui5-admin/resources/'
var destination = '/ElseScope/Dhruv/ui5-admin/dist/resources/'
 
// copy source folder to destination
fs.copy(source, destination, function (err) {
    if (err){
        console.log('An error occured while copying the folder.');
        return console.error(err);
    }
    console.log('Copy completed!');
});