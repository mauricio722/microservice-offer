/* eslint-disable no-undef */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const productRepositorie = require('../../app/repositories/productsRepositorie');
const Helper = require('../helper');

const api = '/api/offer-ms/products';
const api2 = '/api/offer-ms/productsname';
const api3 = '/api/offer-ms/offer/closeoffer';
const api4 = '/api/offer-ms/';
const api5 = '/api/offer-ms/paymentsReceived';
chai.use(chaiHttp);
describe('products crud', () => {
  before(() => Helper.migrate());

  it('register product  vaidation error', () => chai
    .request(app)
    .post(api)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('register product validation correct status 200', () => chai
    .request(app)
    .post(api)
    .send({
      nameProduct: 'oipro',
      characteristics: 'buen sonido',
      cost: 200,
      idcategory: 1,
    })
    .then((res) => {
      const {
        status,
      } = res;
      assert.equal(status, 200);
    }));

  it('get products by id estatus correct', () => chai
    .request(app)
    .get(`${api}/148`)
    .then((res) => {
      const {
        status,
      } = res;
      assert.equal(status, 200);
    }));


  it('get products status 200', () => chai
    .request(app)
    .get(api)
    .then((res) => {
      const {
        status,
      } = res;
      assert.equal(status, 200);
    }));


  it('get products by id validation error', () => chai
    .request(app)
    .get(`${api}/8000`)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('update product status 200', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .put(`${api}/${products.idProduct}`)
      .send({
        nameProduct: 'genius',
        characteristics: 'rapido',
        cost: 20000,
        idcategory: 4,
      })
      .then(async (Response) => {
        const {
          status,
        } = Response;
        assert.equal(status, 200);
      });
  });
  it('update project validation error', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .put(`${api}/${products.idProduct}`)
      .send({})
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 500);
      });
  });
  it('delete product validation correct', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
      idusuario: 2,
      idstate: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);
    console.log(products);

    return chai
      .request(app)
      .delete(`${api}/${products.idProduct}`)
      .then((res) => {
        assert.equal(res.status, 200);
      });
  });

  it('get products by name validation correct', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api2}/${products.nameProduct}`)
      .then((res) => {
        const {
          status,
        } = res;
        assert.equal(status, 200);
      });
  });
  it('closer offer validation correct', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .put(`${api3}/${products.idusuario}`)
      .send({
        idstate: 1,
      })
      .then((res) => {
        const {
          status,
        } = res;
        assert.equal(status, 200);
      });
  });
  it('close offer validation error', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .put(`${api3}/${products.idusuario}`)
      .send({})
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 404);
      });
  });
  it('find product active by user validation correct', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}productsUsers/${products.idusuario}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });
  it('find product active by user validation correct', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}productsUser/${products.idusuario}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });
  it('find product active by user validation error', () => chai
    .request(app)
    .get(`${api4}productsUsers/`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 404);
    }));
  it('find product active by user validation error', () => chai
    .request(app)
    .get(`${api4}productsUser/`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 404);
    }));
  it('get products by category validation correct', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}/productscategory/${products.idcategory}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });
  it('get products by name validation error ', async () => {
    const product = {
      nameProduct: 'genius',
      characteristics: 'comodo',
      cost: 20000,
      idcategory: 4,
      idusuario: 1,
    };
    await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}/prodcutsname/`)
      .then(assert.fail)
      .catch((error) => {
        assert.equal(error.status, 404);
      });
  });
  it('find product shopping by user validation correct', async () => {
    const product = {
      nameProduct: 'motorola',
      characteristics: 'g8 plus',
      cost: 820000,
      idcategory: 8,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}myshopping/${products.idusuario}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });
  it('find shopping by user validation error', () => chai
    .request(app)
    .get(`${api4}shopping/`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 404);
    }));
  it('find Shopping by user validation error', () => chai
    .request(app)
    .get(`${api4}shopping/`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 404);
    }));

  it('find product shopping by user validation correct', async () => {
    const product = {
      nameProduct: 'motorola',
      characteristics: 'g8 plus',
      cost: 820000,
      idcategory: 8,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}productsFavorite/${products.idusuario}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });
  it('find favorite by user validation error', () => chai
    .request(app)
    .get(`${api4}productsFavorite/`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 404);
    }));
  it('find favorite by user validation error', () => chai
    .request(app)
    .get(`${api4}productsFavorite/`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 404);
    }));

  it('find product navigation by user validation correct', async () => {
    const product = {
      nameProduct: 'motorola',
      characteristics: 'g8 plus',
      cost: 820000,
      idcategory: 8,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}navigation/${products.idusuario}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });
  it('find navigaiton by user validation error', () => chai
    .request(app)
    .get(`${api4}navigation/`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 404);
    }));
  it('find navigation by user validation error', () => chai
    .request(app)
    .get(`${api4}navigation/`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 404);
    }));

  it('find product sold by user validation correct', async () => {
    const product = {
      nameProduct: 'motorola',
      characteristics: 'g8 plus',
      cost: 820000,
      idcategory: 8,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}history/${products.idusuario}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });

  it('suggestions validation correct', async () => {
    const product = {
      nameProduct: 'motorola',
      characteristics: 'g8 plus',
      cost: 820000,
      idcategory: 8,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}/suggestions/${products.idusuario}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });

  it('suggestion validation error', async () => chai
    .request(app)
    .get(`${api4}/suggestions/`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 404);
    }));

  it('maxsuggestion validation correct', async () => {
    const product = {
      nameProduct: 'motorola',
      characteristics: 'g8 plus',
      cost: 820000,
      idcategory: 8,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .get(`${api4}/maxsuggestion/${products.idcategory}/cost/${products.cost}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });

  it('maxsuggestion validation error', async () => chai
    .request(app)
    .get(`${api4}/maxsuggestion/${200}/cost/${88888888}`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, undefined);
    }));

  it('max navigation validation correct ', async () => {
    const navigation = {
      idusuario: 31,
      idProduct: 2,
      idCategory: 8,
      cost: 20000,
    };
    const [navigations] = await productRepositorie.createNavigation(navigation);

    return chai
      .request(app)
      .get(`${api4}/maxnavigation/${navigations.idusuario}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });

  it('maxnavigation validation error', async () => chai
    .request(app)
    .get(`${api4}/maxnavigation/${100000000000}`)
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 500);
    }));

  it('register paymentsReceived vaidation error', () => chai
    .request(app)
    .post(api5)
    .send({})
    .then(assert.fail)
    .catch((error) => {
      assert.equal(error.status, 400);
    }));

  it('register paymentsReceived validation success', async () => {
    const product = {
      nameProduct: 'motorola',
      characteristics: 'g8 plus',
      cost: 820000,
      idcategory: 8,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);

    return chai
      .request(app)
      .post(api5)
      .send({
        idusuario: 7,
        idProduct: products.idProduct,
        value: 1000,
      })
      .then(async (res) => {
        const {
          body,
        } = res;
        assert.equal(body.lenght, body.lenght);
      });
  });

  it('There are not paymentsReceived to return', () => chai
    .request(app)
    .get(`${api5}/100`)
    .then((response) => {
      const {
        status,
      } = response;
      assert.equal(status, 200);
    }));
  it('find favoriteProduct  by idUser and idProduct validation correct', async () => {
    const product = {
      nameProduct: 'motorola',
      characteristics: 'g8 plus',
      cost: 820000,
      idcategory: 8,
      idusuario: 1,
    };
    const [products] = await productRepositorie.registerProduct(product);


    const favoriteProduct = {
      idusuario: 10,
      idProduct: products.idProduct,
    };


    const [favorite] = await productRepositorie.createFavoriteProducts(favoriteProduct);


    return chai
      .request(app)
      .get(`${api4}productsFavorite/user/${favorite.idusuario}/product/${favorite.idProduct}`)
      .then((resp) => {
        const {
          status,
        } = resp;
        assert.equal(status, 200);
      });
  });
});
