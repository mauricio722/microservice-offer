module.exports = {
  title: 'product',
  type: 'object',
  properties: {

    nameProduct: {
      type: 'string',
    },
    image: {
      type: 'number',
    },
    characteristics: {
      type: 'string',
    },
    cost: {
      type: 'integer',
    },

    idstate: {
      type: 'number',
    },
    idcategory: {
      type: 'number',
    },

  },
  required: ['nameProduct', 'cost', 'characteristics', 'idcategory'],
};
