"use strict";

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-1" });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// Function to Create an Item to DB
module.exports.addItem = async (data, table) => {
  //console.log(data, table);
  try {
    let params = {
      TableName: table,
      Item: {
        "FOOD NAME": { S: data["FOOD NAME"] },
        "SCIENTIFIC NAME": { S: data["SCIENTIFIC NAME"] },
        "GROUP": { S: data["GROUP"] },
        "SUB GROUP": { S: data["SUB GROUP"] },
      },
    };

    console.log(params);

    ddb.putItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
    
  } catch (error) {
    console.log(error);
    return error;
  }
  return `write completed for ${data}`;
};

// Function to getAllItems from DB
module.exports.getAllItem = async () => {
  let foodName = "FOOD NAME";
  let scientificName = "SCIENTIFIC NAME";
  let group = "GROUP";
  let subgroup = "SUB GROUP";

  let params = {
    TableName: table,
    Key: {
      "FOOD NAME": foodName,
      "SCIENTIFIC NAME": scientificName,
    },
  };

  try {
    let result = await docClient.get(params).promise();

    console.log(result);

    return {
      body: JSON.stringify({
        message: "Executed succesfully",
        data: result,
      }),
    };
  } catch (error) {
    console.log(error);
  }
};
