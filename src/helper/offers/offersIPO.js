const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
const saltedMd5 = require("salted-md5");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
var admin = require("firebase-admin");

const offers = firestore.collection("Offers");
webApp.locals.bucket = admin.storage().bucket();
/*
create offer 
**/
const createOffer = async (req, res, body) => {
  try {
    if (req.file) {
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      await webApp.locals.bucket
        .file(fileName)
        .createWriteStream()
        .end(req.file.buffer);
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      const OfferIPO = {
        offerTitle: req.body.offerTitle || "",
        offerDescription: req.body.offerDescription || "",
        offerSequence: req.body.offerSequence || "",
        offerStatus: req.body.offerStatus || "",
        createdAt: new Date(),
        file: file,
      };

      if (OfferIPO) {
        await offers.add(OfferIPO);
        //  ({ ignoreUndefinedProperties: true })
        res.status(200).send({
          msg: "Offer Created Successfully",
          data: OfferIPO,
        });
      } else {
        res.status(300).send({ msg: "Offer Not Created" });
      }
    } else {
      const Data = {
        offerTitle: req.body.offerTitle || "",
        offerDescription: req.body.offerDescription || "",
        offerSequence: req.body.offerSequence || "",
        offerStatus: req.body.offerStatus || "",
        createdAt: new Date(),
      };
      if (Data) {
        await offers.add(Data);
        res.status(200).send({
          msg: "Offer Created Successfully",
          data: Data,
        });
      } else {
        res.status(300).send({ msg: "Offer Not Found" });
      }
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send(error);
  }
};
/*
update offer 
**/
const UpdateOffer = async (req, res) => {
  const id = req.params.id;
  delete req.params.id;
  const GetOffer = offers.doc(id);

  const GetData = await GetOffer.get();
  const data = req.body;
  if (GetData.exists) {
    await offers.doc(id).update(data, { new: true });
    res.status(200).send({ msg: "Offer updated Successfully", data: data });
  } else {
    res.status(300).send({ msg: "UserId Not Found" });
  }
};
/*
update offer-Image 
**/
const updateImage = async (req, res) => {
  try {
    if (req.file) {
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      await webApp.locals.bucket
        .file(fileName)
        .createWriteStream()
        .end(req.file.buffer);
      const id = req.params.id;
      const GetOffer = offers.doc(id);
      const GetData = await GetOffer.get();
      const file =
        `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744` ||
        "";
      if (GetData) {
        await offers.doc(id).update({ file: file });
        res
          .status(200)
          .send({ msg: "Offer-Image Updated Successfully", file: file });
      }
    } else if (req.file == null) {
      const id = req.params.id;
      console.log(id);
      delete req.params.id;
      const GetOffers = offers.doc(id);

      const GetData = await GetOffers.get();
      const updateFile = {
        file: "",
        id: id,
      };
      if (GetData.exists) {
        await offers.doc(id).update(updateFile, { new: true });
        res
          .status(200)
          .send({ msg: "Image Updated Successfully", data: updateFile });
      } else {
        res.status(300).send({ msg: "Image Not Found" });
      }
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
/*
Get All offer 
**/
const GetAllOffer = async (req, res) => {
  const GetOffer = await offers
    .select(
      "offerTitle",
      "offerDescription",
      "offerSequence",
      "offerStatus",
      "file"
    )
    .get();
  if (GetOffer) {
    const GetOffers = GetOffer.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send({ msg: "Get All Offers", data: GetOffers });
  } else {
    res.status(300).send({ msg: "Offers Not Found" });
  }
};
/*
GetId By single offer Details
**/
const GetISingleOffer = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await offers.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const offerTitle = Data.offerTitle;
          const offerDescription = Data.offerDescription;
          const offerSequence = Data.offerSequence;
          const offerStatus = Data.offerStatus;
          const file = Data.file;
          const id = doc.id;
          usersArray.push(doc.data());
          const OfferData = {
            id,
            offerTitle,
            offerDescription,
            offerSequence,
            offerStatus,
            file,
          };
          res.status(200).send({
            msg: "Get Single Offer Successfully",
            GetSingleOffer: OfferData,
          });
        }
      });
      let Condition = true;
      snapshot.forEach((doc) => {
        if (doc.id !== id && True && Condition) {
          Condition = false;
          res.status(400).send({
            msg: "User Not Found ",
          });
        }
      });
    });
  } catch (error) {
    res.status(400).send({ msg: "Offer Not Found" });
  }
};
/*
Deleted single offer Detail
**/
const DeleteOffer = async (req, res) => {
  const id = req.params.id;
  const GetOffer = offers.doc(id);
  const GetData = await GetOffer.get();
  if (GetData.exists) {
    await offers.doc(id).delete();
    res.status(200).send({ msg: "Offer Deleted Successfully" });
  } else {
    res.status(400).send({ msg: "Oops! User Not Found" });
  }
};
module.exports = {
  createOffer,
  UpdateOffer,
  updateImage,
  GetAllOffer,
  GetISingleOffer,
  DeleteOffer,
};
