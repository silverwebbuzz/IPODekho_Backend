const express = require("express");
const router = express.Router();
const Multer = require("multer");
const OffersIPO = require("../../helper/offers/offersIPO");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/createOffer", upload.single("file"), OffersIPO.createOffer);
router.put("/updateOffer/:id", OffersIPO.UpdateOffer);
router.post("/GetAllOffer", OffersIPO.GetAllOffer);
router.get("/GetISingleOffer/:id", OffersIPO.GetISingleOffer);
router.delete("/DeleteOffer/:id", OffersIPO.DeleteOffer);
router.put(
  "/updateOfferImage/:id",
  upload.single("file"),
  OffersIPO.updateImage
);
module.exports = {
  router,
};
