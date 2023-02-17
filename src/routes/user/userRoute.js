const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const user = require("../../helper/user/userIPO");

router.get("/getSingleUser/:id", user.getSingleUser);
router.get("/getAllUser", user.getAllUser);
router.post(
  "/updateProfile/:id",
  upload.single("photoURL"),
  user.UpdateProfile
);
// router.delete("/DeleteProfile/:id", user.DeleteProfilePic);
module.exports = {
  router,
};
