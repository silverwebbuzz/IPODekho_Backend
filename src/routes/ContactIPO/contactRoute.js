const express = require("express");
const router = express.Router();
const contact = require("../../helper/ContactIPO/ContactIPO");

router.post("/getAllContact", contact.getAllContact);

module.exports = {
  router,
};
