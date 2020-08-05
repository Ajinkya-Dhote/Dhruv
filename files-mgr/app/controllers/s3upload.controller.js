const AWS = require("aws-sdk");
const ID = "";
const SECRETKEY = "";
const BUCKET_NAME = "pratideen-2020";
const s3 = new AWS.S3({
    accessKeyId : ID,
    secretAccessKey : SECRETKEY
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "ap-south-1a"
    }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});