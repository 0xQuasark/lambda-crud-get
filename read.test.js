'use strict';

const { handler } = require('./index.js');

const test = { pathParameters: { id: 1 } }

describe('Testing the crudPost lambda', () => {
  it('Should return a list of people', async () => {
    let response = await handler(test);

    expect(response.statusCode).toEqual(200);
    // console.log(response.body)
    // console.log('response:',  responseBody)
    // expect(responseBody[0].name).toBeTruthy();
  });

  it('should return a single person', async () => {
    test.pathParameters = { id: 1 };
    let response = await handler(test);

    expect(response.statusCode).toEqual(200);
    let responseBody = JSON.parse(response.body);
    expect(responseBody.name).toBeTruthy();

    // expect(response.statusCode).toEqual(200);
    // console.log(response.body)
    // console.log('response:',  responseBody)
    // expect(responseBody[0].name).toBeTruthy();
  });
});