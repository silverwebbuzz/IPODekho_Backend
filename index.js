const express = require("express");
const bodyParser = require("body-parser");
let admin = require("firebase-admin");
const saltedMd5 = require("salted-md5");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
require("dotenv").config();
const webApp = express();
const cors = require("cors");
const CREDENTIALS = require("./src/config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
webApp.use(
  express.urlencoded({
    extended: true,
  })
);
webApp.use(express.json());

webApp.use(bodyParser.json());
webApp.use(bodyParser.json({ limit: "50mb" }));
webApp.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
webApp.use(cors());

const PORT = process.env.PORT || 5000;

admin.initializeApp({
  credential: admin.credential.cert(CREDENTIALS),
  storageBucket: "gs://ipodekho-19fc1.appspot.com",
});
var bucket = admin.storage().bucket();
const homeRoute = require("./src/routes/mainlineIPO/mainlineRoute");
const offerRoute = require("./src/routes/offers/offerRoute");
webApp.use(homeRoute.router);
webApp.use("/offer", offerRoute.router);
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
