/* eslint-disable no-undef */
const asser = require('assert');
const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../../index');
const schema = require('../../app/validators/controller.schema');
const validators = require('../../app/validators/validator');
// const helper = require('../helper');

const api = '/api/offer-ms/products';
const object = {
  nameProduct: 'acer', characteristics: 'buen sonido', cost: 12000, idcategory: 2,
};
chai.use(chaihttp);
describe('checkin validator', () => {
  it('chekin validator is correct', () => chai
    .request(app)
    .post(api)
    .send(object)
    .then(async () => {
      const valid = await validators.validate(object, schema);
      asser.equal(valid, valid);
    }));
});
