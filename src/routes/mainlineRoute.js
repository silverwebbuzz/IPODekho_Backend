const express = require("express");
const router = express.Router();
const Multer = require("multer");
const FIREBASE_API = require("../helper/firebaseApi");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/createMainlineIPO",
  upload.single("file"),
  // upload.none(),
  FIREBASE_API.createMainlineIPO
);
router.post("/companyFinancial", FIREBASE_API.companyFinancial);
router.get("/GetMainLineIpo", FIREBASE_API.GetMainLineIpo);
router.get("/GetIdByMainLineIpo/:id", FIREBASE_API.GetIdByMainLineIpo);
router.post("/UpdateMainLineIpo/:id", FIREBASE_API.UpdateMainLineIpo);
router.delete("/DeleteMainLineIpo/:id", FIREBASE_API.DeleteMainLineIpo);
router.post(
  "/uploadImage/:id",
  upload.single("file"),
  FIREBASE_API.uploadImage
);
router.get("/GetImage/:id", FIREBASE_API.GetImage);
router.put("/updateStatus/:id", FIREBASE_API.updateStatus);
router.get("/GetIMainLineIPOStatus/:id", FIREBASE_API.GetIMainLineIPOStatus);
module.exports = {
  router,
};
