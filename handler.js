"use strict";

const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

// Function to Create an Item to DB
module.exports.addItem = async (event) => {
  try {
    let table = "Food";

    let foodName = 'FOOD NAME'
    let scientificName= 'SCIENTIFIC NAME'
    let group = 'GROUP'
    let subgroup = 'SUB GROUP'

    let params = {
      TableName: table,
      Item: {
        'FOOD NAME': foodName,
        'SCIENTIFIC NAME': scientificName,
        'GROUP': group,
        'SUBGROUP': subgroup
      },
    };

    let result = await docClient.put(params).promise();
    if (result) {
      console.log(">>>>>>>>>", result);
    }

    console.log("hello world");
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Go Serverless v1.0! Your function executed successfully!",
        data: result,
      }),
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Function to getAllItems from DB
module.exports.getAllItem = async () => {
  let foodName = 'FOOD NAME'
  let scientificName= 'SCIENTIFIC NAME'
  let group = 'GROUP'
  let subgroup = 'SUB GROUP'

  let params = {
    TableName: table,
    Key: {
      'FOOD NAME': foodName,
      'SCIENTIFIC NAME': scientificName,
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
