const express = require("express");
const router = express.Router();
const notification = require("../../helper/Notification/notificationIPO");
router.post("/createNotification", notification.createNotification);
router.delete("/DeleteNotification/:id", notification.DeleteNotification);
router.post("/GetAllNotification", notification.GetAllNotification);
router.post("/createCampaign", notification.createCampaign);
router.get("/GetSingleNotification/:id", notification.GetSingleNotification);
module.exports = {
  router,
};
