const express = require("express");
const router = express.Router();
const Multer = require("multer");
const faqs = require("../../helper/faqs/faqs");

router.post("/CreateFaq", faqs.CreateFaq);
router.put("/updateFaq/:id", faqs.updateFaq);
router.delete("/DeleteFaqs", faqs.DeleteFaqs);
router.get("/GetAllFaq", faqs.GetAllFaq);
module.exports = {
  router,
};
