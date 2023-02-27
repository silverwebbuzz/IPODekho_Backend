const express = require("express");
const router = express.Router();
const Multer = require("multer");
const newsIPO = require("../../helper/newsIPO/newsIPO");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/createNews", upload.single("file"), newsIPO.createNews);
router.put("/UpdateNews/:id", newsIPO.UpdateNews);
router.post("/GetAllNews", newsIPO.GetAllNews);
router.get("/GetISingleNews/:id", newsIPO.GetSingleNews);
router.delete("/DeleteNews/:id", newsIPO.DeleteNews);
router.put(
  "/updateNewsImage/:id",
  upload.single("file"),
  newsIPO.updateNewsImage
);
module.exports = {
  router,
};
