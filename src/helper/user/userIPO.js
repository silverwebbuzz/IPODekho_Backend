const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
const saltedMd5 = require("salted-md5");
const path = require("path");
var admin = require("firebase-admin");
/* 
UpDate Profile With Google authentication 
**/
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
    } else {
      const uid = req.params.id;
      admin
        .auth()
        .updateUser(uid, {
          displayName: req.body.displayName,
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
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};

/* 
Get Single Profile With Google authentication 
**/
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
        const email = user.email;
        const GetSingleProfile = {
          photoURL: photoURL,
          displayName: displayName,
          phoneNumber: phoneNumber,
          email: email,
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
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

/* 
Get All User With Google authentication 

**/
const getAllUser = async (req, res) => {
  try {
    const allUser = (await admin.auth().listUsers(100)).users.map((doc) => ({
      id: doc.uid,
      email: doc.email,
      phoneNumber: doc.phoneNumber,
      photoURL: doc.photoURL,
      displayName: doc.displayName,
    }));
    res.status(201).send({ msg: "Get All User Successfully", users: allUser });
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

module.exports = {
  UpdateProfile,
  getAllUser,
  getSingleUser,
};
