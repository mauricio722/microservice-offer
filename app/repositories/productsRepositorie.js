/* eslint-disable no-var */
const productsRepositories = module.exports;
const DB = require('../utils/DB');

productsRepositories.registerProduct = (products) => DB('product')
  .insert(products).returning('*');


productsRepositories.getproducts = () => DB('product')
  .select('*').from('product');

productsRepositories.getproductsById = (idProduct) => DB('product')
  .select('*').where({
    idProduct,
    idstate: 1,
  }).returning('*');

productsRepositories.productsbyname = (name) => DB('product as p')
  .select('p.*', 'i.url1 as url1')
  .join('images as i ', function () {
    this.on('i.idimage', '=', 'p.image');
  })
  .where('p.nameProduct', 'like', `%${name.name}%`)
  .returning();

productsRepositories.deleteproduct = (id) => DB('product')
  .delete('*').where({
    idProduct: id,
  });

productsRepositories.deleteNavigationByIdProduct = (id) => DB('navigation')
  .delete('*').where({
    idProduct: id,
  });

productsRepositories.updateproduct = (id, body) => DB('product')
  .update(body).where({
    idProduct: id,
  });


productsRepositories.productsbycategory = (idcategorys) => DB('product as p')
  .select('p.*', 'i.idimage as idimage', 'i.url1 as Url1')
  .join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  })
  .where({
    idcategory: idcategorys,
    idstate: 1,
  });


productsRepositories.getproductByUsers = (idUser) => DB('product as p')
  .select('p.*', 'i.idimage as idimage', 'i.url1 as Url1')
  .join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  })
  .where({
    idusuario: idUser,
    idstate: 2,
  });

productsRepositories.getimages = (idProduct) => DB('product as p')
  .select('p.*', 'i.idimage as idImage', 'i.url1 as Url1', 'i.url2 as Url2', 'i.url3 as Url3',
    's.idstate as idState', 's.state as State')
  .join('state as s', function () {
    this.on('p.idstate', '=', 's.idstate');
  }).join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  })
  .where('p.idProduct', '=', idProduct);

this.getimagess = (idimage) => DB('images')
  .where('idimage', idimage).returning('*');


// find product active by user
productsRepositories.getproductByUser = (idUser) => DB('product as p')
  .select('p.*', 'i.idimage as idimage', 'i.url1 as Url1')
  .join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  })
  .where({
    idusuario: idUser,
    idstate: 1,
  });


// find product inactive by user
productsRepositories.getproductByUsers = (idUser) => DB('product as p')
  .select('p.*', 'i.idimage as idimage', 'i.url1 as Url1')
  .join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  })
  .where({
    idusuario: idUser,
    idstate: 2,
  });

productsRepositories.registerimages = (body) => DB('images')
  .insert(body).returning('*');


productsRepositories.closeoffer = (body, id) => DB('product')
  .where({
    idProduct: id,
  }).update(body).returning('*');


// favorite products
productsRepositories.getFavoriteProducts = (idUser) => DB('myFavorites as m').select('p.*', 'i.url1', 'm.idusuario', 'm.idProduct')
  .join('product as p', function () {
    this.on('m.idProduct', '=', 'p.idProduct');
  }).join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  })
  .where('m.idusuario', '=', idUser, 'and', 'idstate', '=', 1)
  .returning('*');

// create favorite products
productsRepositories.createFavoriteProducts = (products) => DB('myFavorites').insert(products).returning('*');
// my shopping
productsRepositories.getShoppingProducts = (idUser) => DB('myShopping as m')
  .select('p.*', 'i.url1', 'm.idusuario', 'm.idProduct')
  .join('product as p', function () {
    this.on('m.idProduct', '=', 'p.idProduct');
  }).join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  })
  .where('m.idusuario', '=', idUser)
  .returning('*');

// my shopping
productsRepositories.createShoppingProducts = (products) => DB('myShopping').insert(products).returning('*');

productsRepositories.getFavoriteProductsByProducts = (idProduct) => DB('myFavorites')
  .select('*').where('idProduct', '=', idProduct);

productsRepositories.deleteFavoriteProducts = (id) => DB('myFavorites')
  .delete('*').where({
    id,
  }).returning('*');

productsRepositories.getFavoriteProductsByProducts = (idProduct) => DB('myFavorites')
  .select('*').where('idProduct', '=', idProduct);


productsRepositories.updateimage = (idimage, body) => DB('images').where({
  idimage,
})
  .update(body).returning('*');

// navigation
productsRepositories.getNavigation = (idUser) => DB('navigation as n')
  .select('n.id', 'p.*', 'i.url1', 'n.idusuario', 'n.idProduct')
  .join('product as p', function () {
    this.on('n.idProduct', '=', 'p.idProduct');
  }).join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  })
  .where('n.idusuario', '=', idUser)
  .orderBy('n.id');

// navigation
productsRepositories.createNavigation = (products) => DB('navigation').insert(products).returning('*');

// navigation
productsRepositories.getNavigationByProducts = (idProduct, idUser) => DB('navigation')
  .select('*').where('idusuario', '=', idUser).andWhere('idProduct', '=', idProduct)
  .returning('*');

// navigation
productsRepositories.deleteNavigation = (idusuario) => DB('navigation')
  .delete('*').where({
    idusuario,
  }).returning('*');

// get shopping by products
productsRepositories.getShoppingByProducts = (idProduct) => DB('myshopping').select('*')
  .where('idProduct', '=', idProduct);


// navigation
productsRepositories.deleteShopping = (id) => DB('myShopping')
  .delete('*').where({
    id,
  }).returning('*');

// Sold history products
productsRepositories.getSoldProducts = (idusuario) => DB('product as p').select('p.*', 'i.url1')
  .join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  }).where('idstate', '=', '3')
  .andWhere({
    idusuario,
  });

// suggestions
productsRepositories.suggestions = (idcategorys, cost) => DB('navigation as n ')
  .select('p.*', 'n.idusuario', 'i.url1')
  .join('product as p ', function () {
    this.on('p.idProduct', '=', 'n.idProduct');
  })
  .join('images as i', function () {
    this.on('p.image', '=', 'i.idimage');
  })
  .where({
    idcategory: idcategorys,
  })
  .andWhere('p.cost', '<=', cost)
  .andWhere('p.idstate', '=', 1);

// max suggestion

productsRepositories.getmaxsuggestions = async (idcategorys, cost) => {
  var [query] = await DB('navigation').max('id').as('Maxímo');

  return DB('navigation as n')
    .select('p.*', 'n.idusuario', 'i.url1', 'n.id')
    .join('product as p ', function () {
      this.on('p.idProduct', '=', 'n.idProduct');
    })
    .join('images as i', function () {
      this.on('p.image', '=', 'i.idimage');
    })
    // .groupBy('p.idProduct', 'n.idusuario', 'i.url1')
    .where({
      idcategory: idcategorys,
    })
    .andWhere('p.cost', '<=', cost)
    .andWhere('n.id', '=', query.max);
};

productsRepositories.getmaxNavigation = async (idUser) => {
  var [query] = await DB('navigation').max('id').as('Maxímo').where({
    idusuario: idUser,
  });

  return DB('navigation as n')
    .select('p.*', 'i.url1', 'n.id')
    .join('product as p ', function () {
      this.on('p.idProduct', '=', 'n.idProduct');
    })
    .join('images as i', function () {
      this.on('p.image', '=', 'i.idimage');
    })
    // .groupBy('p.idProduct', 'n.idusuario', 'i.url1')
    .where('n.idusuario', '=', idUser)
    .andWhere('n.id', '=', query.max);
};

productsRepositories.paymentsReceived = (data) => DB('paymentsReceived')
  .insert(data).returning('*');

productsRepositories.getPaymentsReceived = (idDealer) => DB('paymentsReceived as pr')
  .select('pr.*', 'p.nameProduct').join('product as p ', function () {
    this.on('p.idProduct', '=', 'pr.idProduct');
  }).where('pr.idusuario', '=', idDealer);

productsRepositories.deletePaymentsReceived = (id) => DB('paymentsReceived')
  .delete('*').where('id', '=', id).returning('*');

productsRepositories.getFavoriteProductsByIdUserAndIdProducts = (idProduct, idusuario) => DB('myFavorites')
  .select('*').where({
    idProduct,
    idusuario,
  });
