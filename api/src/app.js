const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.js");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { Op } = require("sequelize");

require("dotenv").config();
const { User, Shoppingcart, Product } = require("./db.js");

const server = express();

// --------------------------------------- PASSPORT SETUP GUARDAMOS EL ID DEL USER EN LA COOKIE(SERIALIZE) ---------------------
// Esto permite que la información almacenada en la sesión sea lo más pequeña posible ,ademas recibe un integred(con el cual la base de datos creo nuestro model)
passport.serializeUser((user, done) => done(null, user.id));

// DESERIALIZE la información del usuario va a quedar almacenada en req.user, usamos esa id para volver a consultar a la db quien es ese user(id)
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});
// ---> Una vez que deserializamos los datos podemos agarra el email, comparar los datos que nos llegan por body contra los de datos de la db ,si todo sale correcto nos mandara los datos de ese usuario y se logueara de lo contrario si el user no existe nos dara false como resultado.

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ where: { email: email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          if (!user.correctPassword(password)) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_KEY,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile, "soyProfile");
      try {
        const [user, created] = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: {
            name: profile.displayName,
            username: profile.displayName,
            email: profile.emails[0].value,
          },
        });

        Shoppingcart.findOrCreate({
          where: {
            userId: user.id,
            status: {
              [Op.or]: ["vacio", "curso"],
            },
          },
          defaults: {
            status: "vacio",
          },
        });

        return done(null, user.dataValues);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_KEY,
      callbackURL: "http://localhost:3001/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [user, created] = await User.findOrCreate({
          where: { githubId: profile.id },
          defaults: {
            name: profile.displayName,
            username: profile.displayName,
            email: profile.emails ? profile.emails[0].value : null,
          },
        });

        Shoppingcart.create({
          status: "vacio",
          userId: user.id,
        });

        // On error
        if (!user) return done(null, false, { message: "No se pudo :(" });

        // On success
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: '3807774352587374',
//       clientSecret: 'ebcfa1d3f3ca691a636fecf398f92d1f',
//       callbackURL: 'http://localhost:3001/auth/facebook/callback',
//       profileFields: ['id', 'emails', 'displayName'],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log('Facebook profile: ', profile);
//       try {
//         const [user, created] = await User.findOrCreate({
//           where: { facebookId: profile.id },
//           defaults: {
//             name: profile.displayName,
//             username: profile.displayName,
//             email: profile.emails[0].value,
//           },
//         });

//         // On error
//         if (!user) return done(null, false, { message: 'No se pudo :(' });

//         // On success
//         return done(null, user);
//       } catch (error) {
//         done(error);
//       }
//     },
//   ),
// );

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONT_URL); //'http://localhost:3000'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
// ------------------------- INICIALIZAMOS LA SESSION PASSPORT----------------------
server.use(
  session({
    secret: process.env.PASSPORT_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

server.use(
  session({
    secret: "esto funciona perfect",
    resave: false,
    saveUninitialized: true,
  })
);
//integrating PassportJS with express-session middleware
server.use(passport.initialize());
server.use(passport.session());

// Initialize routes

server.use("/", routes);

server.use(cors({ origin: process.env.REACT_APP_API_URL, credentials: true }));

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
