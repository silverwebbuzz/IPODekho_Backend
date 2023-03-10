const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
var admin = require("firebase-admin");

const AllotmentTips = firestore.collection("IPOAllotmentTips");
webApp.locals.bucket = admin.storage().bucket();
/**
 * The following Api contains source code for a IPO Allotment-Tips Created.
 */
const IPOAllotmentTips = async (req, res, body) => {
  try {
    const IPOAllotmentTips = {
      AllotmentTips: req.body.AllotmentTips,
      createdAt: new Date(),
    };
    if (IPOAllotmentTips) {
      await AllotmentTips.add(IPOAllotmentTips);
      res.status(200).send({
        msg: "AllotmentTips Created Successfully",
        data: IPOAllotmentTips,
      });
    } else {
      res.status(300).send({ msg: "AllotmentTips Not Found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
/**
 * The following Api contains source code for a IPO Allotment-Tips Updated.
 */
const UpdateAllotment = async (req, res) => {
  const id = req.params.id;
  delete req.params.id;
  const GetTips = AllotmentTips.doc(id);

  const GetData = await GetTips.get();
  const data = req.body;
  if (GetData.exists) {
    await AllotmentTips.doc(id).update(data, { new: true });
    res.status(200).send({ msg: "Allotment updated Successfully", data: data });
  } else {
    res.status(300).send({ msg: "UserId Not Found" });
  }
};
/**
 * The following Api contains source code for a GetAll IPO Allotment-Tips.
 */
const GetAllIPOAllotmentTips = async (req, res) => {
  const GetAllotmentTips = await AllotmentTips.select("AllotmentTips").get();
  if (GetAllotmentTips) {
    const GetTips = GetAllotmentTips.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send({ msg: "Get All IPO Allotment-Tips", data: GetTips });
  } else {
    res.status(300).send({ msg: "Allotment Tips Not Found" });
  }
};
/**
 * The following Api contains source code for a Get Single IPO Allotment-Tips.
 */
const GetSingleAllotment = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await AllotmentTips.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const AllotmentTips = Data.AllotmentTips;
          usersArray.push(doc.data());
          const AllotmentData = {
            id,
            AllotmentTips,
          };
          res.status(200).send({
            msg: "Get Single Allotment-Tips Successfully",
            GetSingleAllotmentTips: AllotmentData,
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
    res.status(400).send({ msg: "Allotment-Tips Not Found" });
  }
};
/**
 * The following Api contains source code for a Delete Single IPO Allotment-Tips.
 */
const DeleteAllotmentTips = async (req, res) => {
  const id = req.params.id;
  const GetAllotmentTips = AllotmentTips.doc(id);
  const GetData = await GetAllotmentTips.get();
  if (GetData.exists) {
    await AllotmentTips.doc(id).delete();
    res.status(200).send({ msg: "Allotment-Tips Deleted Successfully" });
  } else {
    res.status(400).send({ msg: "Oops! User Not Found" });
  }
};
module.exports = {
  IPOAllotmentTips,
  UpdateAllotment,
  GetAllIPOAllotmentTips,
  GetSingleAllotment,
  DeleteAllotmentTips,
};
