module.exports = {
  title: 'paymentsReceived',
  type: 'object',
  properties: {

    id: {
      type: 'integer',
    },
    idusuario: {
      type: 'integer',
    },
    idProduct: {
      type: 'integer',
    },
    value: {
      type: 'integer',
    },
  },
  required: ['idusuario', 'idProduct', 'value'],
};
