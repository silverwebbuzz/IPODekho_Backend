const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
const saltedMd5 = require("salted-md5");
const path = require("path");
var admin = require("firebase-admin");
/**
 * The following Api contains source code for a Update Profile With Google Authentication.
 */
const UpdateProfile = async (req, res, body) => {
  try {
    if (req.file) {
      const uid = req.params.id;
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      // Update the user's profile information
      admin
        .auth()
        .updateUser(uid, {
          displayName: req.body.displayName,
          photoURL: file,
          phoneNumber: req.body.phoneNumber,
        })
        .then((data) => {
          return res.status(201).send({
            msg: "Updated SuccessFully",
            data: data,
          });
        })
        .catch((error) => {
          res.status(300).send({ msg: "PhoneNumber Already Exist" });
        });
    } else if (req.file == null) {
      const uid = req.params.id;
      admin
        .auth()
        .updateUser(uid, {
          displayName: req.body.displayName,
          phoneNumber: req.body.phoneNumber,
          photoURL: null,
        })
        .then((data) => {
          return res.status(201).send({
            msg: "Updated SuccessFully",
            data: data,
          });
        })
        .catch((error) => {
          res.status(300).send({ msg: "PhoneNumber Already Exist" });
        });
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
/**
 * The following Api contains source code for a Get Single User.
 */
const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    admin
      .auth()
      .getUser(id)
      .then((user) => {
        const photoURL = user.photoURL;
        const displayName = user.displayName;
        const phoneNumber = user.phoneNumber;
        const email = user.providerData[0].email;
        const GetSingleProfile = {
          photoURL: photoURL,
          displayName: displayName,
          phoneNumber: phoneNumber,
          email: email,
          uid: id,
        };
        return res.status(201).send({
          msg: "Get Single User SuccessFully",
          data: GetSingleProfile,
        });
      })
      .catch((error) => {
        return res.status(301).send({
          error,
        });
      });
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
/**
 * The following Api contains source code for a Get All User.
 */
const getAllUser = async (req, res) => {
  try {
    const allUsers = [];
    const listUsersResult = await admin.auth().listUsers();
    listUsersResult.users.forEach((user) => {
      allUsers.push(user);
    });
    res.status(201).send({
      msg: "Get All User SuccessFully",
      data: allUsers,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" }).end();
  }
};
module.exports = {
  UpdateProfile,
  getAllUser,
  getSingleUser,
};
