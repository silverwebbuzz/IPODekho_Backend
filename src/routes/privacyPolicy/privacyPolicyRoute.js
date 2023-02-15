const express = require("express");
const router = express.Router();
const Multer = require("multer");
const PrivacyPolicy = require("../../helper/privacyPolicy/privacyPolicy");

router.post("/CreatePrivacyPolicy", PrivacyPolicy.CreatePrivacyPolicy);
router.put("/updatePrivacyPolicy/:id", PrivacyPolicy.updatePrivacyPolicy);
router.delete("/DeletePrivacyPolicy/:id", PrivacyPolicy.DeletePrivacyPolicy);
router.get("/GetAllPrivacyPolicy", PrivacyPolicy.GetAllPrivacyPolicy);
module.exports = {
  router,
};
