module.exports = {
  title: 'images',
  type: 'object',
  properties: {

    idimage: {
      type: 'integer',
    },
    url1: {
      type: 'string',
    },
    url2: {
      type: 'string',
    },
    url3: {
      type: 'string',
    },
  },
  required: ['url1', 'url2', 'url3'],
};
