const express = require("express");
const router = express.Router();
const Multer = require("multer");
const TermsAndConditions = require("../../helper/TermsAndConditions/TermsAndConditions");

router.post(
  "/CreateTermsAndCondition",
  TermsAndConditions.CreateTermsAndCondition
);
router.put(
  "/updateTermsAndCondition/:id",
  TermsAndConditions.updateTermsAndCondition
);
router.delete(
  "/DeleteTermsAndCondition/:id",
  TermsAndConditions.DeleteTermsAndCondition
);
router.get(
  "/GetAllTermsAndCondition",
  TermsAndConditions.GetAllTermsAndCondition
);
module.exports = {
  router,
};
