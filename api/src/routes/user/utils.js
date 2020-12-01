const { User, Shoppingcart, Lineorder, Product } = require("../../db.js");
const { Op } = require("sequelize");
var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
const sgMail = require("@sendgrid/mail");
// Muestra un JSON con todos los usuarios registrados
const getAllUser = (req, res) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch((err) => res.send(err));
};
// Muestra los datos de un solo user
const getOnlyUser = (req, res) => {
  let { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => res.send(err));
};

// Crea un nuevo user y lo guarda en la base de datos
const createUser = (req, res) => {
  console.log("llega el user nuevo");
  const { name, username, email, password } = req.body;
  User.create({
    name,
    username,
    email,
    password,
  })
    .then((user) => {
      Shoppingcart.create({
        status: "vacio",
        userId: user.id,
      });
      return user;
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.send(err));
};
// Modifica un user segun si id

const modifyQuantityItem = (req, res) => {
  const { idUser } = req.params;
  const { quantity, product } = req.body;
  Shoppingcart.findOne({
    where: {
      userId: idUser,
    },
  })
    .then((shoppingcart) =>
      Lineorder.findOne({
        where: {
          shoppingcartId: shoppingcart.id,
          productId: product.productId,
        },
      })
    )
    .then((lineorder) => {
      if (quantity) {
        line.quantity = quantity;
        line.save();
        line.price = quantity * product.price;
        line.save();
      }
      return line.save();
    })
    .then((l) => res.status(200).send(l));
};

const modifyUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (req.body.name) {
        user.name = req.body.name;
        user.save();
      }
      if (req.body.username) {
        user.username = req.body.username;
        user.save();
      }
      if (req.body.email) {
        user.email = req.body.email;
        user.save();
      }

      return user.save();
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.send(err));
};

//Elimina el user
const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((deleteUser) => deleteUser.destroy())
    .then((deleteUser) => res.send("Usuario eliminado con exito"))
    .catch((err) => res.send(err));
};
//-------CARRITO DE USUARIO----------
//crear un carrito
const createCart = (req, res) => {
  userId = req.params.idUser;
  Shoppingcart.create({
    status: "vacio",
    userId: userId,
  }).then((shoppingCart) => {
    res.status(200).json(shoppingCart);
  });
};

//Aniadir item al carrito
const addItemToCart = (req, res, next) => {
  let { productId, price, quantity } = req.body;
  console.log("soy la nueva quantity", quantity);

  const idUser = req.params.idUser;

  Shoppingcart.findOne({
    where: {
      userId: idUser,
      status: {
        [Op.or]: ["vacio", "curso"],
      },
    },
  })
    .then((shoppingCart) => {
      shoppingCart.update({ status: "curso" }).then(() => {
        Lineorder.findOne({
          where: {
            productId,
            shoppingcartId: shoppingCart.id,
          },
        }).then((lineorder) => {
          if (lineorder) {
            lineorder.update({ price, quantity }).then(() => {
              res
                .status(200)
                .send("Este producto ya estaba añadido al carrito");
            });
          } else {
            Lineorder.create({
              price,
              quantity,
              productId,
              shoppingcartId: shoppingCart.id,
            }).then(() => res.status(200).send("Éeexitooo"));
          }
        });
      });
    })
    .catch((err) => res.send(err));
};

//traeme los items del carrito del usuario
const getAllItemsToCart = (req, res) => {
  const idUser = req.params.idUser;
  Shoppingcart.findOne({
    where: {
      userId: idUser,
    },
  })
    .then((shoppingcart) =>
      Lineorder.findAll({
        where: {
          shoppingcartId: shoppingcart.id,
        },
      })
    )
    .then((items) => res.json(items))
    .catch((err) => res.send(err));
};
// delete items del carrito
/* cons = (req, res) => {
  const idUser = req.params.idUser;
  console.log("ENTRAMOS A EMPTYCAAAART");
  Shoppingcart.findOne({
    where: {
      userId: idUser,
      status: "creado",
    },
  })
    .then((shoppingcart) => {
      console.log("shoppingcart con status creado", shoppingcart);
      Lineorder.findAll({
        where: {
          shoppingcartId: shoppingcart.id,
        },
      });
    })
    .then((lineorders) => {
      console.log("lineorders", lineorders);
      lineorders.forEach((lineorder) => lineorder.destroy());
    })
    .then(() => res.status(200).send("Se eliminaron los items correctamente"));
}; */

const emptyCart = (req, res) => {
  const idUser = req.params.idUser;
  Shoppingcart.findOne({
    where: {
      userId: idUser,
      status: "curso",
    },
    include: [{ model: Product }],
  }).then((shoppingcart) => {
    shoppingcart.products.forEach((product) => {
      Lineorder.findOne({
        where: {
          shoppingcartId: product.lineorder.shoppingcartId,
          productId: product.lineorder.productId,
        },
      }).then((lineorder) => lineorder.destroy());
    });
  });
};

const getCart = (req, res) => {
  const idUser = req.params.idUser;
  Shoppingcart.findOne({
    where: {
      userId: idUser,
      status: "curso",
    },
    include: [{ model: Product }],
  }).then((shoppingcart) => {
    console.log(shoppingcart);
    res.json(shoppingcart);
  });
};
const deleteItemFromCart = (req, res) => {
  const { idUser, idProduct } = req.params;
  Shoppingcart.findOne({
    where: {
      userId: idUser,
      status: "curso",
    },
  })
    .then((shoppingcart) =>
      Lineorder.findOne({
        where: {
          shoppingcartId: shoppingcart.id,
          productId: idProduct,
        },
      })
    )
    .then((lineorder) => lineorder.destroy())
    .then(() => res.status(200).send("Se eliminó el item correctamente"));
};

//Reset Password
const resetPassword = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (!user.correctPassword(req.body.oldpassword)) {
        return false;
      } else {
        user
          .update({
            password: req.body.password,
          })
          .then((user) => {
            res.json(user);
          });
        console.log("todook");
      }
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
const emailPassword = (req, res) => {
  sgMail.setApiKey(
    "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"
  );
  console.log(req.body.email, "soy el email");

  const msg = {
    to: [req.body.email], // Change to your recipient
    from: "igiftyu@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: req.body.updatedAt,
    html: `<div>
		<h3>Olvidaste tu contraseña?</h3><br/>
		<a>Ingresa este codigo y vas a poder cambiarla</a><br/>
		<a>${req.body.updatedAt}<a><br/>
		</div>`,
  };
  sgMail
    .send(msg)
    .then((mail) => {
      console.log("Email sent");
      res.status(200).json(mail);
    })
    .catch((error) => {
      console.error(error);
    });
};
const sendEmailCheckout = (req, res) => {
  sgMail.setApiKey(
    "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"
  );
  console.log(req.body.email, "soy el email");
  let {
    email,
    celular,
    nombre,
    apellido,
    direccion,
    numero,
    horarios,
    descrip,
    provincia,
    localidad,
    codigo,
    products,
    total,
  } = req.body;

  /* const productsMapped = products.map((product) => {
    `<a>Producto: ${product.name}</a><br/>
			<a>Precio: ${product.price}</a><br/>
			<a>Cantidad: ${product.lineorder.quantity}</a><br/>`;
  }); */

  const msg = {
    to: [email], // Change to your recipient
    from: "igiftyu@gmail.com", // Change to your verified sender
    subject: "I GIFT YOU",

    html: ` <div>
		   		<div >
					<h2>${nombre}, tu pedido esta por ser revisado</h2>
					<h4>Pronto te enviaremos un email de confirmacion</h4>				   
				</div>
				<div>
					<h2>Detalles personales</h2>
   						<a>Telefono: ${celular}</a><br/>
						<a>Horarios: ${horarios}</a><br/>
						<a>Descripcion: ${descrip}</a><br/>
   						<a>Direccion: ${provincia}, ${localidad}, ${direccion}, ${numero}, codigo postal: ${codigo}</a><br/>
				</div>
				<br/>
				<br/>
				<div>
					<h2>Detalles de tu compra</h2><br/>
					<div>
					<ul>
					${products.map(
            (product) =>
              `<li>Producto: ${product.name}<br/>
						<a>Precio: ${product.price}</a><br/>
						<a>Cantidad: ${product.lineorder.quantity}</a><br/>
						</li>`
          )}
					</ul>
					<br/>
					<h2>Total: ${total}</h2>
					</div>
				</div>
	   		 </div>`,
  };

  {
    /* <div>
							<a>Producto: {product.name}</a><br/>
							<a>Precio: {product.price}</a><br/>
							<a>Cantidad: {product.lineorder.quantity}</a><br/>
						</div> */
  }
  sgMail
    .send(msg)
    .then((mail) => {
      console.log("Email sent");
      res.status(200).json(mail);
    })
    .catch((error) => {
      console.error(error);
    });
};
const sendEmailProcess = (req, res) => {
  sgMail.setApiKey(
    "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"
  );
  console.log(req.body.email, "soy el email");

  const msg = {
    to: [req.body.email], // Change to your recipient
    from: "igiftyu@gmail.com", // Change to your verified sender
    subject: "I GIFT YOU",
    text: "soy un msj",
    html: `<div>
	   <h1>FELICIDADES!! TU PEDIDO ESTÁ EN CAMINO</h1>
	   <a>A partir de ahora te comunicaras con el metodo de envío, </a><br/>
	   <a>ellos te enviarán un código de seguimiento a este mail.</a><br/>
	   <h3>Muchas gracias por tu compra!!! Espero hagas feliz a otra persona como nos haces</h3><br/>
	   <h3>a nosotros con el simple hecho de navegar en nuestra página.</h3><br/>
	   </div>`,
  };
  sgMail
    .send(msg)
    .then((mail) => {
      console.log("Email sent");
      res.status(200).json(mail);
    })
    .catch((error) => {
      console.error(error);
      console.log(error.body.errors);
    });
};
const sendEmailCancel = (req, res) => {
  sgMail.setApiKey(
    "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"
  );
  console.log(req.body.email, "soy el email");
  console.log(req.body.problem, "soy el rpbolemsaaaaas");
  const msg = {
    to: [req.body.email], // Change to your recipient
    from: "igiftyu@gmail.com", // Change to your verified sender
    subject: "I GIFT YOU",
    text: "soy un msj",
    html: `<div>
	   <h1>Tuvimos un problema</h1>
	   <a>a continuacion detallaremos el inconveniente con tu pedido </a><br/>
	   <a>${req.body.problem}</a><br/>
	   <h3>Mil disculpas!! </h3><br/>
	   <h3>para mas informacion comunicate al mail igiftyu@gmail.com</h3><br/>
	   </div>`,
  };
  sgMail
    .send(msg)
    .then((mail) => {
      console.log("Email sent");
      res.status(200).json(mail);
    })
    .catch((error) => {
      console.error(error);
      console.log(error.body.errors);
    });
};
const getUser = (req, res) => {
  User.findOne({
    //where: { email: req.body.email},
    where: { email: req.query.email },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.send(err));
};

const resetPasswordEmail = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      user
        .update({
          password: req.body.nuevaPass,
        })
        .then((user) => {
          res.json(user);
        });
      console.log("todook");
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
/* const comparePassword = (req,res) => {
  user.findOne({
    where: {id: req.params.id}
  })
  .then((user) =>{
    if (!user.correctPassword(req.body.oldpassword)) {
      return  false;
    }else{
      return true;
    }
    
  })
} */

module.exports = {
  getAllUser,
  getOnlyUser,
  createUser,
  deleteUser,
  modifyUser,
  addItemToCart,
  getAllItemsToCart,
  emptyCart,
  deleteItemFromCart,
  modifyQuantityItem,
  resetPassword,
  emailPassword,
  getUser,
  resetPasswordEmail,
  getCart,
  sendEmailCheckout,
  sendEmailProcess,
  createCart,
  sendEmailCancel,
};
