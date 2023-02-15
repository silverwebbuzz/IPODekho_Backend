const express = require("express");
const router = express.Router();
const contact = require("../../helper/ContactIPO/ContactIPO");

router.get("/getAllContact", contact.getAllContact);

module.exports = {
  router,
};
