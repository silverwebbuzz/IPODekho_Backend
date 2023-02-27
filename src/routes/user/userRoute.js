const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const user = require("../../helper/user/userIPO");

router.get("/getSingleUser/:id", user.getSingleUser);
router.post("/getAllUser", user.getAllUser);
router.post(
  "/updateProfile/:id",
  upload.single("photoURL"),
  user.UpdateProfile
);
module.exports = {
  router,
};
