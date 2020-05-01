/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-throw-literal */
const Ajv = require('ajv');


const validator = module.exports;

const ajv = new Ajv();
validator.validate = (schema, data) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    throw new Error('no es valido el esquema');
  }

  return valid;
};
validator.validateExist = (sss) => {
  if (sss == null) {
    throw new Error('the id not exist');
  } else {
    return true;
  }
};

validator.istnumber = (id) => {
  if (!typeof id === 'number') {
    throw new Error('the id is not a nnumber');
  }
};
