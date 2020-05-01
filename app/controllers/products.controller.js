/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const productsController = module.exports;
const validator = require('../validators/validator');
const schema = require('../validators/controller.schema');
const schemaimage = require('../validators/images.eschema');
const productservice = require('../services/productsService');
const {
  BaseError,
} = require('../utils/ErrorHandlerMiddleware');
const paymentsReceivedSchema = require('../validators/paymentsReceivedSchema');
const log4j = require('../utils/logger');
const LogUtils = require('../utils/LogUtils');
const Validators = require('../validators/Validators');


// REGISTER PRODUCT
productsController.registerproducts = async (req, res) => {
  const logName = 'RegisterProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    body,
  } = req;
  logger.info(`Starts ProductsController.registerproducts: params ${JSON.stringify(body)}`);
  try {
    validator.validate(schema, body);
    const rsp = await productservice.create(body, {
      logger,
      logName,
    });

    return res.status(200).json(rsp);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
productsController.getproductss = async (req, res) => {
  const logName = 'getProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    id,
  } = req.params;
  logger.info(`Starts ProductsController.getProducts: params ${JSON.stringify(id)}`);
  const getProductss = await productservice.getproductss(id, {
    logger,
    logName,
  });
  res.status(200).json(getProductss);
};

// GET PRODUCTS
productsController.getproducts = async (req, res) => {
  const logName = 'getProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  logger.info('Starts ProductsController.getProducts');

  const getproducts = await productservice.getproducts({
    logger,
    logName,
  });
  res.status(200).json(getproducts);
};

// GET PRODUCTS BY ID
productsController.getproductsByid = async (req, res) => {
  const logName = 'getProductsbyId: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const recived = req.params.id;

  logger.info(`Starts ProductsController.getProductsbyId: params ${JSON.stringify(recived)}`);

  try {
    const object = await productservice.getproductById(recived, {
      logger,
      logName,
    });

    return res.status(200).json(object);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// DELETE Product
productsController.deleteproduct = async (req, res) => {
  const logName = 'deleteProduct: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    id,
  } = req.params;

  logger.info(`Starts ProductsController.deleteProduct: params ${JSON.stringify(id)}`);

  try {
    return productservice.deleteproduct(id, {
      logger,
      logName,
    })
      .then((response) => res.send(response));
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// UPDATE Product
productsController.updateproduct = async (req, res, next) => {
  const logName = 'updateProduct: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const ids = req.params.id;
  const {
    body,
  } = req;

  logger.info(`Starts ProductsController.updateProduct: params ${JSON.stringify(ids)}`);
  logger.info(`Starts ProductsController.updateProduct: params ${JSON.stringify(body)}`);

  try {
    return productservice.updateproduct(ids, body, {
      logger,
      logName,
    })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(console.error(error.message))));
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// GET PRODUCTS BY NAME
productsController.getproductsByname = async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const logName = 'getproductsbyname: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const name = req.params;

  logger.info(`Starts ProductsController.getproductsbyname: params ${JSON.stringify(name)}`);
  try {
    const Data = await productservice.getproductsByname(name, {
      logger,
      logName,
    });

    return res.status(200).json(Data);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};


// GET PRODUCTS BY ID CATEGORY
productsController.getproductBycategory = async (req, res) => {
  const logName = 'getproductsbycategory: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const idCategory = req.params.idcategory;

  logger.info(`Starts ProductsController.getproductsbycategory: params ${JSON.stringify(idCategory)}`);

  try {
    const response = await productservice.getproductsbycategory(idCategory, {
      logger,
      logName,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

// GET PRODUCTS WITH IMAGES
productsController.getimages = async (req, res) => {
  const logName = 'getprodutswithimages: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const id = req.params.image;

  logger.info(`Starts ProductsController.getproductswithimages: params ${JSON.stringify(id)}`);

  try {
    const response = await productservice.getimages(id, {
      logger,
      logName,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

// REGISTER IMAGES
productsController.registerimages = async (req, res) => {
  const logName = 'registerimages: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    body,
  } = req;

  logger.info(`Starts ProductsController.registerimages: params ${JSON.stringify(body)}`);

  try {
    validator.validate(schemaimage, body);

    return await productservice.registerimages(body, {
      logger,
      logName,
    })
      .then((response) => res.status(200).json(response));
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

// find product active by user
productsController.getUser = async (req, res) => {
  const logName = 'getUser: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idUser,
  } = req.params;

  logger.info(`Starts ProductsController.getuser: params ${JSON.stringify(idUser)}`);

  return productservice.getUser(idUser, {
    logger,
    logName,
  })
    .then((response) => res.send(response));
};

// find product inactive by user
productsController.getUsers = async (req, res) => {
  const logName = 'getUserInactive: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idUser,
  } = req.params;

  logger.info(`Starts ProductsController.getuserInactive: params ${JSON.stringify(idUser)}`);

  return productservice.getUsers(idUser, {
    logger,
    logName,
  })
    .then((response) => res.send(response))
    .catch((error) => res.status(404).json({
      status: 'error',
      message: error.message,
    }));
};


// CLOSE OFFER
productsController.closeoffer = async (req, res) => {
  const logName = 'closeOffer: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    id,
  } = req.params;
  const {
    body,
  } = req;

  logger.info(`Starts ProductsController.closeOffer: params ${JSON.stringify(id)}`);

  await productservice.closeoffer(id, body, {
    logger,
    logName,
  })
    .then((resp) => res.send(resp))
    .catch((error) => res.status(404).json({
      status: 'error',
      message: error.message,
    }));
};


// get favorites products
productsController.getFavoriteProducts = async (req, res) => {
  const logName = 'closeOffer: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idUser,
  } = req.params;

  logger.info(`Starts ProductsController.closeOffer: params ${JSON.stringify(idUser)}`);

  return productservice.getFavoriteProducts(idUser, {
    logger,
    logName,
  }).then((response) => res.send(response));
};

// create favorites products

productsController.createFavoriteProducts = async (req, res) => {
  const logName = 'createFavoriteProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    body,
  } = req;

  logger.info(`Starts ProductsController.createFavoriteProducts: params ${JSON.stringify(body)}`);
  try {
    const rsp = await productservice.createFavoriteProducts(body, {
      logger,
      logName,
    });

    return res.status(200).json(rsp);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};


// get my shopping
productsController.getShoppingProducts = async (req, res) => {
  const logName = 'getShoppingProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idUser,
  } = req.params;

  logger.info(`Starts ProductsController.getShoppingProducts: params ${JSON.stringify(idUser)}`);

  return productservice.getShoppingProducts(idUser, {
    logger,
    logName,
  }).then((response) => res.send(response));
};

// create my shopping
productsController.createShoppingProducts = async (req, res) => {
  const logName = 'createShoppingProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    body,
  } = req;

  logger.info(`Starts ProductsController.createShoppingProducts: params ${JSON.stringify(body)}`);

  try {
    const rsp = await productservice.createShoppingProducts(body, {
      logger,
      logName,
    });

    return res.status(200).json(rsp);
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

productsController.deleteFavoriteProducts = async (req, res) => {
  const logName = 'deleteFavoriteProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    id,
  } = req.params;

  logger.info(`Starts ProductsController.deleteFavoriteProducts: params ${JSON.stringify(id)}`);

  return productservice.deleteFavoriteProducts(id, {
    logger,
    logName,
  })
    .then((response) => res.send(response));
};

productsController.getFavoriteProductsByProducts = async (req, res) => {
  const logName = 'getFavoriteProductsByProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idProduct,
  } = req.params;

  logger.info(`Starts ProductsController.getFavoriteProductsByProducts: params ${JSON.stringify(idProduct)}`);
  try {
    const response = await productservice.getFavoriteProductsByProducts(idProduct, {
      logger,
      logName,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

productsController.updateimage = async (req, res) => {
  const logName = 'updateimage: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const idimage = req.params.id;
  const {
    body,
  } = req;

  logger.info(`Starts ProductsController.updateimage: params ${JSON.stringify(idimage)}`);

  await productservice.updateimage(idimage, body, {
    logger,
    logName,
  })
    .then((resp) => res.send(resp))
    .catch((error) => res.status(404).json({
      status: 'error',
      message: error.message,
    }));
};

// get product history viewed
productsController.getNavigation = async (req, res) => {
  const logName = 'getNavigation: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idUser,
  } = req.params;

  logger.info(`Starts ProductsController.getNavigation: params ${JSON.stringify(idUser)}`);


  return productservice.getNavigation(idUser, {
    logger,
    logName,
  }).then((response) => res.send(response));
};

// create navigation
productsController.createNavigation = async (req, res, next) => {
  const logName = 'createNavigation: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    body,
  } = req;

  logger.info(`Starts ProductsController.createNavigation: params ${JSON.stringify(body)}`);


  return productservice.createNavigation(body, {
    logger,
    logName,
  })
    .then((response) => res.send(response))
    .catch((error) => next(new BaseError(error.message)));
};

// navigation
productsController.getNavigationByProducts = async (req, res) => {
  const logName = 'getNavigationByProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idProduct,
  } = req.params;

  logger.info(`Starts ProductsController.getNavigationByProducts: params ${JSON.stringify(idProduct)}`);

  try {
    const response = await productservice.getNavigationByProducts(idProduct, {
      logger,
      logName,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

// navigation
productsController.deleteNavigation = async (req, res) => {
  const logName = 'deleteNavigation: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    id,
  } = req.params;

  logger.info(`Starts ProductsController.deleteNavigation: params ${JSON.stringify(id)}`);

  return productservice.deleteNavigation(id)
    .then((response) => res.send(response));
};

// shopping
productsController.deleteShopping = async (req, res) => {
  const logName = 'deleteShopping: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    id,
  } = req.params;

  logger.info(`Starts ProductsController.deleteShopping: params ${JSON.stringify(id)}`);

  return productservice.deleteShopping(id, {
    logger,
    logName,
  })
    .then((response) => res.send(response));
};

// navigation
productsController.getShoppingByProducts = async (req, res) => {
  const logName = 'getShoppingByProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idProduct,
  } = req.params;

  logger.info(`Starts ProductsController.getShoppingByProducts: params ${JSON.stringify(idProduct)}`);

  try {
    const response = await productservice.getShoppingByProducts(idProduct, {
      logger,
      logName,
    });

    return res.status(200).json(response);
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

productsController.deleteFavoriteProducts = async (req, res) => {
  const logName = 'deleteFavoriteProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    id,
  } = req.params;

  logger.info(`Starts ProductsController.deleteFavoriteProducts: params ${JSON.stringify(id)}`);

  return productservice.deleteFavoriteProducts(id, {
    logger,
    logName,
  })
    .then((response) => res.send(response));
};

productsController.getSoldProducts = async (req, res) => {
  const logName = 'getSoldProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idusuario,
  } = req.params;
  console.log(idusuario);

  logger.info(`Starts ProductsController.getSoldProducts: params ${JSON.stringify(idusuario)}`);

  await productservice.getSoldProducts(idusuario, {
    logger,
    logName,
  })
    .then((resp) => res.send(resp));
};


productsController.suggestions = async (req, res, next) => {
  const logName = 'suggestions: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    iduser,
  } = req.params;

  logger.info(`Starts ProductsController.suggestions: params ${JSON.stringify(iduser)}`);

  await productservice.suggestions(iduser, {
    logger,
    logName,
  })
    .then((resp) => res.send(resp))
    .catch((error) => next(new BaseError(console.error(error.message))));
};

productsController.maxsuggestion = async (req, res) => {
  const logName = 'maxsuggestion: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idCategory,
  } = req.params;
  const {
    cost,
  } = req.params;

  logger.info(`Starts ProductsController.maxsuggestion: params ${JSON.stringify(idCategory)}`);

  await productservice.maxsuggestions(idCategory, cost, {
    logger,
    logName,
  })
    .then((resp) => res.send(resp))
    .catch((error) => next(new BaseError(console.error(error.message))));
};

productsController.maxNavigation = async (req, res, next) => {
  const logName = 'maxNavigation: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idUser,
  } = req.params;

  logger.info(`Starts ProductsController.maxNavigation: params ${JSON.stringify(idUser)}`);

  await productservice.maxNavigation(idUser, {
    logger,
    logName,
  })
    .then((resp) => res.send(resp))
    .catch((error) => next(new BaseError(console.error(error.message))));
};

productsController.paymentsReceived = async (req, res, next) => {
  const logName = 'paymentsReceived: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    body,
  } = req;

  logger.info(`Starts ProductsController.paymentsReceived: params ${JSON.stringify(body)}`);

  try {
    Validators(paymentsReceivedSchema).validateRequest(body);

    return productservice.paymentsReceived(body, {
      logger,
      logName,
    })
      .then((response) => res.send(response))
      .catch((error) => next(new BaseError(error.message)));
  } catch (error) {
    return next(error);
  }
};

productsController.getPaymentsReceived = async (req, res) => {
  const logName = 'getPaymentsReceived: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idDealer,
  } = req.params;

  logger.info(`Starts ProductsController.getPaymentsReceived: params ${JSON.stringify(idDealer)}`);

  await productservice.getPaymentsReceived(idDealer, {
    logger,
    logName,
  })
    .then((resp) => res.send(resp));
};

productsController.deletePaymentsReceived = async (req, res) => {
  const logName = 'deletePaymentsReceived: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    id,
  } = req.params;

  logger.info(`Starts ProductsController.deletePaymentsReceived: params ${JSON.stringify(id)}`);

  try {
    return productservice.deletePaymentsReceived(id, {
      logger,
      logName,
    })
      .then((response) => res.send(response));
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

productsController.getFavoriteProductsByIdUserAndIdProducts = async (req, res) => {
  const logName = 'getFavoriteProductsByIdUserAndIdProducts: ';
  const logger = LogUtils.getLoggerWithId(log4j, logName);
  const {
    idProduct,
  } = req.params;
  const {
    idusuario,
  } = req.params;


  logger.info(`Starts ProductsController.getFavoriteProductsByIdUserAndIdProducts: params idProduct: ${JSON.stringify(idProduct)}
  idUser :${JSON.stringify(idusuario)}`);

  return productservice.getFavoriteProductsByIdUserAndIdProducts(idProduct, idusuario, {
    logger,
    logName,
  })
    .then((resp) => res.send(resp));
};
