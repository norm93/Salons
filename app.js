const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const app = express();
app.use(session({secret:config.get("jwtSecret")}))
app.use(require("cors")())
app.use(require("cookie-parser")())
app.use(express.json({ limit: '50mb' }));
app.use(express.json({ extended: true }));

// app.use(express.static(__dirname));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth",require("./router/auth.router.js"))
app.use("/api/authWeb",require("./router/authWeb.router.js"))
app.use("/api/order",require("./router/order.router.js"))
app.use("/api/master",require("./router/master.router.js"))
app.use("/api/service",require("./router/service.router.js"))
app.use("/api/salon",require("./router/salon.router.js"))
app.use("/images",require("./router/image.router.js"))
app.use(require("./middleware/error.middleware"))
// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(path.join(__dirname, 'client', 'build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
const PORT = process.env.PORT || config.get('port') || 3999;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log('Server Error', e);
    process.exit(1);
  }
}

start();