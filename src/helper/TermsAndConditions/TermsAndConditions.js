const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
var admin = require("firebase-admin");
const { Timestamp } = require("@google-cloud/firestore");
const TermsAndCondition = firestore.collection("TermsAndConditions");
webApp.locals.bucket = admin.storage().bucket();
/*
create IPO TermsAndCondition
**/
const CreateTermsAndCondition = async (req, res, body) => {
  try {
    const termsAndCondition = req.body;
    const createdAt = Timestamp.now().toDate();
    const create = { ...termsAndCondition, createdAt };
    if (termsAndCondition) {
      await TermsAndCondition.add(create);
      res.status(200).send({
        msg: "TermsAndCondition Created Successfully",
        data: create,
      });
    } else {
      res.status(300).send({ msg: "TermsAndCondition Not Found" });
    }
  } catch (error) {
    res.status(300).send({ msg: " Not Found" });
  }
};
/*
update TermsAndCondition 
**/
const updateTermsAndCondition = async (req, res) => {
  const id = req.params.id;
  delete req.params.id;
  const getTermsAndCondition = TermsAndCondition.doc(id);
  const GetTermsAndCondition = await getTermsAndCondition.get();
  const data = req.body;
  if (GetTermsAndCondition.exists) {
    await TermsAndCondition.doc(id).update(data, { new: true });
    res
      .status(200)
      .send({ msg: "TermsAndCondition updated Successfully", data: data });
  } else {
    res.status(300).send({ msg: "UserId Not Found" });
  }
};

/*
Get All TermsAndCondition 
**/
const GetAllTermsAndCondition = async (req, res) => {
  const getTermsAndCondition = await TermsAndCondition.select(
    "termsAndCondition"
  ).get();
  if (getTermsAndCondition) {
    const GetAll = getTermsAndCondition.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send({ msg: "Get All TermsAndConditions", data: GetAll });
  } else {
    res.status(300).send({ msg: "TermsAndCondition Not Found" });
  }
};
/*
GetId By single Allotment-Tips Details
**/
// const GetSingleAllotment = async (req, res) => {
//   try {
//     const id = req.params.id;
//     var usersArray = [];
//     let True = true;
//     const data = await AllotmentTips.get().then((snapshot) => {
//       snapshot.forEach((doc) => {
//         if (doc.id === id && True) {
//           True = false;
//           const Data = doc.data(usersArray.id);
//           const AllotmentTips = Data.AllotmentTips;
//           usersArray.push(doc.data());
//           const AllotmentData = {
//             id,
//             AllotmentTips,
//           };
//           res.status(200).send({
//             msg: "Get Single Allotment-Tips Successfully",
//             GetSingleAllotmentTips: AllotmentData,
//           });
//         }
//       });
//       let Condition = true;
//       snapshot.forEach((doc) => {
//         if (doc.id !== id && True && Condition) {
//           Condition = false;
//           res.status(400).send({
//             msg: "User Not Found ",
//           });
//         }
//       });
//     });
//   } catch (error) {
//     res.status(400).send({ msg: "Allotment-Tips Not Found" });
//   }
// };

/*
Deleted single Allotment-Tips
**/
const DeleteTermsAndCondition = async (req, res) => {
  const id = req.params.id;
  const termsAndCondition = TermsAndCondition.doc(id);
  const GetData = await termsAndCondition.get();
  if (GetData.exists) {
    await TermsAndCondition.doc(id).delete();
    res.status(200).send({ msg: "TermsAndCondition Deleted Successfully" });
  } else {
    res.status(400).send({ msg: "Oops! User Not Found" });
  }
};
module.exports = {
  CreateTermsAndCondition,
  updateTermsAndCondition,
  GetAllTermsAndCondition,
  DeleteTermsAndCondition,
};
