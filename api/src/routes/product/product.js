const server = require("express").Router();
const {
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
} = require("./utils.js");

// ------------------- ROUTE PRODUCTOS ------------------

//Get --> Mostrar todos los productos
server.get("/", getAllProducts);

//Get --> Devuelve resultados de búsqueda
server.get("/search", searchByKeyword);

//Get --> Devuelve las categorías asociadas a X producto
server.get("/categoriesof/:nombreProducto", getCategoriesByProduct);

//Get --> Mostrar un solo producto
server.get("/:id", getSingleProduct);

//Post --> Crear producto
server.post("/", createProduct);

//Delete --> Eliminar un producto
server.delete("/:id", deleteProduct);

//Put --> Modificar un producto
server.put("/:id", modifyProduct);

server.put("/modifystock/:id", modifyStock);

// ------------------- ROUTE CATEGORIAS ------------------

//Get --> Mostrar todas las categorias
server.get("/api/category", getAllCategories);

//Post --> Crear categoria
server.post("/category", createCategory);

//Put --> Modificar categoria
server.put("/category/:id", modifyCategory);

//Delete --> Borrar categoria
server.delete("/category/:id", deleteCategory);

//Get --> Devuelve productos de X categoría
server.get("/category/:nombreCat", getProductsByCategory);

//Delete --> Elimina asociación entre un producto y una categoría
server.delete("/:idProducto/category/:idCategoria", removeCategoryFromProduct);

//Post --> Crea asociación entre un producto y una categoría
server.post("/:idProducto/category/:idCategoria", addCategoryToProduct);

//Post --> Crea asociación entre un producto y una categoría
server.post(
  "/:nombreProducto/addcategory/:idCategoria",
  addCategoryToProductByName
);

module.exports = server;
