const express = require("express");
const router = express.Router();
const Multer = require("multer");
const SmeIPO = require("../../helper/smeIPO/smeIPO");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/createMainlineIPO",
  upload.single("file"),
  // upload.none(),
  SmeIPO.createSmeIPO
);
router.get("/GetMainLineIpo", SmeIPO.GetAllSmeIpo);
router.get("/GetIdByMainLineIpo/:id", SmeIPO.GetIdBySmeIpo);
router.post("/UpdateMainLineIpo/:id", SmeIPO.UpdateSmeIpo);
router.delete("/DeleteMainLineIpo/:id", SmeIPO.DeleteSmeIpo);
router.post("/uploadImage/:id", upload.single("file"), SmeIPO.uploadImage);
router.get("/GetImage/:id", SmeIPO.GetImage);
router.put("/updateStatus/:id", SmeIPO.updateStatus);
router.get("/Pagination", SmeIPO.Pagination);
module.exports = {
  router,
};
