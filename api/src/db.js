require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  //`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
  process.env.DATABASE_URL,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Product,
  Category,
  Lineorder,
  Shoppingcart,
  User,
  Review,
  Question,
  Questionproduct,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Product.belongsToMany(Category, { through: "productcategories" });
Category.belongsToMany(Product, { through: "productcategories" });

//Muchos productos <---> Muchos carritos.
Product.belongsToMany(Shoppingcart, { through: Lineorder });
//Muchos carritos <---> Muchos productos.
Shoppingcart.belongsToMany(Product, { through: Lineorder });

User.hasMany(Shoppingcart);
//un usuario <----->mucho carritos
Shoppingcart.belongsTo(User);

User.hasMany(Review);
//un usuario <-----> muchas reviews
Review.belongsTo(User);

Product.hasMany(Review);
//un producto <-----> muchas reviews
Review.belongsTo(Product);

Question.belongsToMany(Product, { through: Questionproduct });

Product.belongsToMany(Question, { through: Questionproduct });

// --------------------------HASH y SALT PASSWORD------------------------
// Genera la una salt	random
User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};
// crea y hashea la password y la pasa a texto plano
User.encryptPassword = function (plainText, salt) {
  return crypto.createHash("sha1").update(plainText).update(salt).digest("hex");
};
// En esta funcion se va a comenzar a crear y hashear la contraseña
const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};
// antes de que el usuario se guarde en la base de datos  va a usar las funciones anteriores para poder crear la salt y hashear la password
User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
// Creamos un prototype para poder comparar la contraseña ingresada con la contraseñan que se ingreso(login)
User.prototype.correctPassword = function (enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password();
};

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
