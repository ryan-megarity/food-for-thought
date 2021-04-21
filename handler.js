"use strict";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1",
});
const csv = require("csvtojson");

module.exports.s3Trigger = async (event) => {
  console.log("Incoming Event: ", event);
  const bucket = event.Records[0].s3.bucket.name;
  const filename = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const message = `File is uploaded in - ${bucket} -> ${filename}`;
  console.log("foodForThoughtS3TriggerLog: ", message);
  let S3 = new AWS.S3();

  if (filename === "generic-food.csv") {
    console.log("foodForThoughtS3TriggerLog: running database steps");

    const s3Params = {
      Bucket: bucket,
      Key: filename,
    };

    let data = async () => {
      // get csv file and create stream
      const stream = S3.getObject(s3Params).createReadStream();
      // convert csv file (stream) to JSON format data
      const json = await csv().fromStream(stream);
      return json;
    };

    let csvData = await data();
    console.log(csvData);

    const results = await Promise.all(
      csvData.map(async (foodObj) => {
        const tableParams = {
          TableName: "FoodForThought",
          Item: {
            "FOOD NAME": String(foodObj["FOOD NAME"]),
            "SCIENTIFIC NAME": String(foodObj["SCIENTIFIC NAME"]),
            "GROUP": String(foodObj["GROUP"]),
            "SUB GROUP": String(foodObj["SUB GROUP"]),
          },
        };
        return await docClient
          .put(tableParams)
          .promise()
          .catch((e) => console.log("failed to insert, error: ", e));
      })
    );
    console.log("database write complete, results: ", results)
  }
};
