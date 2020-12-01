const { Product, Category } = require("../../db.js");
const { Op } = require("sequelize");

//Get --> Mostrar todos los productos
const getAllProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
};

//Get --> Mostrar un solo producto
const getSingleProduct = (req, res, next) => {
  let { id } = req.params;
  Product.findByPk(id)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch(next);
};

//Get --> Devuelve las categorías asociadas a X producto

const getCategoriesByProduct = (req, res) => {
  const { nombreProducto } = req.params;

  Product.findAll({
    where: {
      name: nombreProducto,
    },
    //filtramos
    include: [{ model: Category }],
    //incluimos datos de las categorías
  }).then((categories) => res.json(categories));
};

//Post --> Crear producto
const createProduct = (req, res, next) => {
  const { name, description, price, stock, image } = req.body;
  if (!name || !description || price === null || stock === null || !image) {
    return res.status(400).send("Faltan campos requeridos");
  }

  Product.create({
    name,
    description,
    price,
    stock,
    image,
  })
    .then(function (product) {
      res.status(201);
      res.send(product);
    })
    .catch((err) => res.send(err));
  //.catch(next);
};

//Delete --> Eliminar un producto
const deleteProduct = (req, res, next) => {
  /*if(!req.params.id){
      res.status(400).send("No existe el producto");
  }*/
  Product.findByPk(req.params.id)
    .then((p) => p.destroy())
    .then((p) => res.status(200).send(p))

    .catch(next);
};

//Put --> Modificar un producto
const modifyProduct = (req, res, next) => {
  Product.findByPk(req.params.id)
    .then((p) => {
      if (req.body.name) {
        p.name = req.body.name;
        p.save();
      }
      if (req.body.description) {
        p.description = req.body.description;
        p.save();
      }
      if (req.body.price !== null && req.body.price !== undefined) {
        p.price = parseInt(req.body.price);
        p.save();
      }
      if (req.body.stock !== null && req.body.stock !== undefined) {
        p.stock = req.body.stock;
        if (p.stock < 0) p.stock = 0;
        p.save();
      }
      if (req.body.image) {
        p.image = req.body.image;
        p.save();
      }
      return p.save();
    })
    .then((p) => res.status(200).send(p))
    .catch(next);
};

const modifyStock = (req, res, next) => {
  Product.findByPk(req.params.id)
    .then((p) => {
      if (req.body.stock !== null && req.body.stock !== undefined) {
        p.stock = p.stock - req.body.stock;
        p.save();
      }
      return p.save();
    })
    .then((p) => res.status(200).send(p))
    .catch(next);
};

// server.put('/:id', (req, res, next) => {
// 	if (!Object.keys(req.body).length)
// 		return res.status(400).send('No se modificó nada');

// 	let { name, description, price, stock, image } = req.body;

// 	let { id } = req.params;

// 	Product.findByPk(id)
// 		.then((product) => {
// 			Object.keys(product).forEach((key) => {
// 				if (!req.body[key]) key = product.key;
// 			});
// 			product.update({ name, description, price, stock, image }, { where: id });
// 		})
// 		.then((product) => res.status(200).send(product))
// 		.catch(next);
// });

//Get --> Devuelve resultados de búsqueda
const searchByKeyword = (req, res, next) => {
  const value = req.query.search;
  if (value) {
    Product.findAll({
      where: {
        [Op.or]: [
          //o antes o despues
          {
            name: {
              [Op.iLike]: `%${value}%`, //el nombre que entro en el searchBar
            },
          },
          {
            description: {
              [Op.iLike]: `%${value}%`, //o que aparezca en la descripcion
            },
          },
        ],
      },
    })
      .then((product) => {
        if (product) {
          res.send(product);
        } else {
          res.status(404).send("No hay resultados para tu búsqueda");
        }
      })
      .catch(next);
  }
};

//Get --> Mostrar todas las categorias
const getAllCategories = (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      res.send(categories);
    })
    .catch(next);
};

//Post --> Crear categoria
const createCategory = (req, res, next) => {
  const { name, description } = req.body;
  Category.create({
    name,
    description,
  })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => res.send(err));
};

//Put --> Modificar categoria
const modifyCategory = (req, res) => {
  let { id } = req.params;
  let { name, description } = req.body;
  Category.findByPk(id)
    .then((category) => {
      if (!category)
        return res.status(400).send("No se encuentral tal categoria");
      category.update({ name, description }, { where: id });
      return res.send(category);
    })
    .catch((err) => res.status(400).send(err.message));
};

//Delete --> Borrar categoria
const deleteCategory = (req, res, next) => {
  const { id } = req.params;
  Category.destroy({
    where: { id },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.send(err));
};

//Get --> Obtener productos de una categoría en base al nombre
const getProductsByCategory = (req, res) => {
  const { nombreCat } = req.params;
  Category.findAll({
    where: {
      name: nombreCat,
    },
    //filtramos
    include: [{ model: Product }],
    //incluimos datos de los productos
  })
    .then((products) => res.json(products))
    .catch((err) => res.send(err));
};

//Delete --> Borrar asociación entre un producto y una categoría
const removeCategoryFromProduct = (req, res, next) => {
  const { idProducto, idCategoria } = req.params;

  Product.findOne({ where: { id: idProducto } })
    .then((product) => {
      product.removeCategory(idCategoria).then(res.status(200).json(product));
    })
    .catch((err) => res.send(err));
};

//Post --> Crear asociación entre un producto y una categoría
const addCategoryToProduct = (req, res) => {
  const { idProducto, idCategoria } = req.params;

  let prod;

  Product.findOne({ where: { id: idProducto } })
    .then((product) => {
      prod = product;
      return product.hasCategory(idCategoria);
    })
    .then((res) => {
      if (res) return res.status(200).json(prod);
      prod.addCategory(idCategoria).then(res.status(201).json(prod));
    })
    .catch((err) => res.send(err));
};

const addCategoryToProductByName = (req, res) => {
  const { nombreProducto, idCategoria } = req.params;

  Product.findOne({ where: { name: nombreProducto } })
    .then((product) =>
      product.addCategory(idCategoria).then(res.status(201).json(product))
    )
    .catch((err) => res.send(err));
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getCategoriesByProduct,
  createProduct,
  deleteProduct,
  modifyProduct,
  modifyStock,
  searchByKeyword,
  getAllCategories,
  createCategory,
  modifyCategory,
  deleteCategory,
  getProductsByCategory,
  removeCategoryFromProduct,
  addCategoryToProduct,
  addCategoryToProductByName,
};
