const express = require("express");
const router = express.Router();
const Multer = require("multer");
const IPOAllotmentTips = require("../../helper/ipoAllotmentTips/ipoAllotmentTips");

router.post("/CreateIPOAllotmentTips", IPOAllotmentTips.IPOAllotmentTips);
router.put("/UpdateAllotmentTips/:id", IPOAllotmentTips.UpdateAllotment);
router.get("/GetAllIPOAllotmentTips", IPOAllotmentTips.GetAllIPOAllotmentTips);
router.get("/GetSingleAllotment/:id", IPOAllotmentTips.GetSingleAllotment);
router.delete("/DeleteAllotmentTips/:id", IPOAllotmentTips.DeleteAllotmentTips);
module.exports = {
  router,
};
