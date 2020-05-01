/* eslint-disable no-else-return */
/* eslint-disable eqeqeq */
/* eslint-disable newline-before-return */
const productsService = module.exports;
const Promise = require('bluebird');
const Service = require('../repositories/productsRepositorie');
const log4j = require('../utils/logger');

const defaultLogger = log4j.getLogger('productsService');

productsService.create = async (products, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.create with ${JSON.stringify(products)}`);
  const product = await Service.registerProduct(products);

  return product;
};

productsService.getproducts = async (options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info('productsService.getproducts with ');
  const data = await Service.getproducts();

  return data;
};

productsService.getproductById = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getproductById with ${JSON.stringify(id)}`);
  const resp = await Service.getproductsById(id);

  console.log(resp);


  return resp;
};

productsService.deleteproduct = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.deleteproduct with ${JSON.stringify(id)}`);
  await Service.deleteNavigationByIdProduct(id);
  await Service.deleteproduct(id);
};

productsService.updateproduct = async (id, body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.updateproduct with ${JSON.stringify(body)}`);
  await Service.updateproduct(id, body);
};

productsService.getproductsByname = async (name, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getproductsByname with ${JSON.stringify(name)}`);
  const resp = await Service.productsbyname(name);

  return resp;
};

productsService.getproductsbycategory = async (idcategory, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getproductsbycategory with ${JSON.stringify(idcategory)}`);
  const resp = await Service.productsbycategory(idcategory);

  return resp;
};


productsService.getimages = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getimages with ${JSON.stringify(id)}`);
  const resp = await Service.getimages(id);

  return resp;
};

productsService.registerimages = async (body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.registerimages with ${JSON.stringify(body)}`);
  const resp = await Service.registerimages(body);

  return resp;
};


productsService.getproductss = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getproductss with ${JSON.stringify(id)}`);
  const projects = Service.getproductsById(id);

  const productsUser = await Promise.mapSeries(projects, async (project) => {
    const images = await Service.getimagess(project.idProduct);

    const projectImages = await Promise.mapSeries(images, async (imagess) => imagess.url1);

    // eslint-disable-next-line no-param-reassign
    project.image = projectImages;

    return project;
  });

  return productsUser;
};

// find products actives by user
productsService.getUser = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getUser with ${JSON.stringify(idUser)}`);
  const resp = Service.getproductByUser(idUser);

  return resp;
};

// find products inactives by user
productsService.getUsers = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getUsers with ${JSON.stringify(idUser)}`);
  const resp = Service.getproductByUsers(idUser);

  return resp;
};

productsService.closeoffer = async (id, body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.closeoffer with ${JSON.stringify(id)}`);
  const resp = await Service.closeoffer(body, id);

  return resp;
};

// favorites prducts
productsService.getFavoriteProducts = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getFavoriteProducts with ${JSON.stringify(idUser)}`);
  const resp = Service.getFavoriteProducts(idUser);

  return resp;
};

// create favorites product
productsService.createFavoriteProducts = async (products, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.createFavoriteProducts with ${JSON.stringify(products)}`);
  const product = await Service.createFavoriteProducts(products);

  return product;
};

// favorites prducts
productsService.getShoppingProducts = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getShoppingProducts with ${JSON.stringify(idUser)}`);
  const resp = Service.getShoppingProducts(idUser);

  return resp;
};
// create favorites product
productsService.createShoppingProducts = async (products, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.createShoppingProducts with ${JSON.stringify(products)}`);
  const product = await Service.createShoppingProducts(products);


  return product;
};


productsService.deleteFavoriteProducts = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.deleteFavoriteProducts with ${JSON.stringify(id)}`);
  await Service.deleteFavoriteProducts(id);
};

productsService.getFavoriteProductsByProducts = async (idProduct, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getFavoriteProductsByProducts with ${JSON.stringify(idProduct)}`);
  const resp = await Service.getFavoriteProductsByProducts(idProduct);

  return resp;
};

productsService.updateimage = async (idimage, body, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.updateimage with ${JSON.stringify(body)}`);
  const resp = await Service.updateimage(idimage, body);

  return resp;
};


// navigation
productsService.getNavigation = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getNavigation with ${JSON.stringify(idUser)}`);
  const resp = await Service.getNavigation(idUser);

  const total = resp.reverse();


  return total.slice(0, 10);
};

// navigation
productsService.createNavigation = async (products, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.createNavigation with ${JSON.stringify(products)}`);
  const {
    idProduct, idusuario,
  } = products;

  const resp = await Service.getNavigationByProducts(idProduct, idusuario);

  if (resp.idProduct != idProduct && resp.length <= 0) {
    const newResponse = await Service.createNavigation(products);
    console.log(newResponse);
    return newResponse;
  } else {
    return [];
  }
};

// navigation
productsService.getNavigationByProducts = async (idProduct, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getNavigationByProducts with ${JSON.stringify(idProduct)}`);
  const resp = await Service.getNavigationByProducts(idProduct);


  return resp;
};
productsService.deleteFavoriteProducts = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.deleteFavoriteProducts with ${JSON.stringify(id)}`);
  await Service.deleteFavoriteProducts(id);
};
// find sold products
productsService.getSoldProducts = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getSoldProducts with ${JSON.stringify(idUser)}`);
  const resp = Service.getSoldProducts(idUser);

  return resp;
};

// navigation
productsService.deleteNavigation = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.deleteNavigation with ${JSON.stringify(id)}`);
  await Service.deleteNavigation(id);
};


// get shopping by product
productsService.getShoppingByProducts = async (idProduct, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getShoppingByProducts with ${JSON.stringify(idProduct)}`);
  const resp = await Service.getShoppingByProducts(idProduct);

  return resp;
};

// delete shopping
productsService.deleteShopping = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.deleteShopping with ${JSON.stringify(id)}`);
  await Service.deleteShopping(id);
};

productsService.getSoldProducts = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getSoldProducts with ${JSON.stringify(idUser)}`);
  const resp = Service.getSoldProducts(idUser);

  return resp;
};

productsService.suggestions = async (iduser, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.suggestions with ${JSON.stringify(iduser)}`);

  try {
    const [data] = await Service.getmaxNavigation(iduser);

    const { cost } = data;
    const { idcategory } = data;
    console.log(cost);
    console.log(idcategory);
    const resp = await Service.suggestions(idcategory, cost);
    return resp;
  } catch (error) {
    return error;
  }
};

productsService.maxsuggestions = async (idcategory, cost, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.maxsuggestions with ${JSON.stringify(idcategory, cost)}`);
  const resp = await Service.getmaxsuggestions(idcategory, cost);

  return resp;
};

productsService.maxNavigation = async (idUser, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.maxNavigation with ${JSON.stringify(idUser)}`);
  const resp = await Service.getmaxNavigation(idUser);

  return resp;
};

productsService.paymentsReceived = async (data, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.paymentsReceived with ${JSON.stringify(data)}`);
  const paymentsReceived = await Service.paymentsReceived(data);

  return paymentsReceived;
};

productsService.getPaymentsReceived = async (idDealer, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.getPaymentsReceived with ${JSON.stringify(idDealer)}`);
  const resp = await Service.getPaymentsReceived(idDealer);

  return resp;
};

productsService.deletePaymentsReceived = async (id, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`productsService.deletePaymentsReceived with ${JSON.stringify(id)}`);
  await Service.deletePaymentsReceived(id);
};

productsService.getFavoriteProductsByIdUserAndIdProducts = async (idProduct, idusuario, options = {}) => {
  const { logger = defaultLogger } = options;
  logger.info(`Starts productsService.getFavoriteProductsByIdUserAndIdProducts: params idProduct: ${JSON.stringify(idProduct)}
  idUser :${JSON.stringify(idusuario)}`);
  const [resp] = await Service.getFavoriteProductsByIdUserAndIdProducts(idProduct, idusuario);

  return resp;
};
