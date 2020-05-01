const { Router } = require('express');

const router = Router();
const productsControllers = require('./controllers/products.controller');

router.post('/products', productsControllers.registerproducts);

router.get('/products', productsControllers.getproducts);

router.get('/products/:id', productsControllers.getproductsByid);

router.delete('/products/:id', productsControllers.deleteproduct);

router.post('/images', productsControllers.registerimages);

router.put('/products/:id', productsControllers.updateproduct);

// find product active by user
router.get('/productsUser/:idUser', productsControllers.getUser);

// find product inactive by user
router.get('/productsUsers/:idUser', productsControllers.getUsers);

router.get('/productsname/:name', productsControllers.getproductsByname);

router.get('/productscategory/:idcategory', productsControllers.getproductBycategory);

router.get('/products/imagesbyuser/:image', productsControllers.getimages);

router.get('/productss/:id', productsControllers.getproductss);

router.put('/offer/closeoffer/:id', productsControllers.closeoffer);

router.get('/productsFavorite/:idUser', productsControllers.getFavoriteProducts);

router.post('/productsFavorite', productsControllers.createFavoriteProducts);

router.get('/myshopping/:idUser', productsControllers.getShoppingProducts);

router.post('/myshopping/create', productsControllers.createShoppingProducts);

router.delete('/productsFavorite/:id', productsControllers.deleteFavoriteProducts);

router.get('/productsFavorite/product/:idProduct', productsControllers.getFavoriteProductsByProducts);

router.put('/images/:id', productsControllers.updateimage);

router.get('/navigation/:idUser', productsControllers.getNavigation);

router.post('/navigation/create', productsControllers.createNavigation);

router.get('/Navigation/product/:idProduct', productsControllers.getNavigationByProducts);

router.delete('/deleteNavigation/:id', productsControllers.deleteNavigation);

// get shopping product
router.get('/shopping/product/:idProduct', productsControllers.getShoppingByProducts);

// DELETE SHOPPING
router.delete('/deleteShopping/:id', productsControllers.deleteShopping);

router.get('/productsFavorite/product/:idProduct', productsControllers.getFavoriteProductsByProducts);

router.delete('/productsFavorite/:id', productsControllers.deleteFavoriteProducts);

router.get('/history/:idusuario', productsControllers.getSoldProducts);

router.get('/productsFavorite/user/:idusuario/product/:idProduct', productsControllers.getFavoriteProductsByIdUserAndIdProducts);


// suggestions
router.get('/suggestions/:iduser', productsControllers.suggestions);

// max suggestion
router.get('/maxsuggestion/:idCategory/cost/:cost', productsControllers.maxsuggestion);

// max navigation
router.get('/maxnavigation/:idUser', productsControllers.maxNavigation);

router.post('/paymentsReceived', productsControllers.paymentsReceived);

router.get('/paymentsReceived/:idDealer', productsControllers.getPaymentsReceived);

router.delete('/paymentsReceived/:id', productsControllers.deletePaymentsReceived);


module.exports = router;
