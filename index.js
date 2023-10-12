'use strict'

const dynamoose = require('dynamoose');
 
// define our schema
const peopleSchema = new dynamoose.Schema({
  'id': Number,
  'name': String,
  'email': String,
});

let results = null;
// create our Model
let personModel = dynamoose.model('cf-lambda-crud', peopleSchema); // first argument is the name of the table

exports.handler = async (event) => {
  console.log('crudGET 1.3');
  console.log('HERE IS THE EVENT OBJECT', event)
  // console.log('Here are the path parameters: ', event.pathParameters)

  if (event.pathParameters.id) {
    results = await personModel.query('id').eq(event.pathParameters.id).exec();
  } else {
    try {
      results = await personModel.scan().exec();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(results),
  };
  return response;
};
