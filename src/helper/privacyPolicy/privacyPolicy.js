const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
var admin = require("firebase-admin");
const { Timestamp } = require("@google-cloud/firestore");
const privacyPolicy = firestore.collection("PrivacyPolicy");
webApp.locals.bucket = admin.storage().bucket();
/*
create IPO Faqs
**/
const CreatePrivacyPolicy = async (req, res, body) => {
  try {
    const PrivacyPolicy = req.body;

    const createdAt = Timestamp.now().toDate();
    const create = { ...PrivacyPolicy, createdAt };
    if (PrivacyPolicy) {
      await privacyPolicy.add(create);
      res.status(200).send({
        msg: "PrivacyPolicy Created Successfully",
        data: create,
      });
    } else {
      res.status(300).send({ msg: "PrivacyPolicy Not Found" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send(error);
  }
};
/*
update Faqs 
**/
const updatePrivacyPolicy = async (req, res) => {
  const id = req.params.id;
  delete req.params.id;
  const getPrivacyPolicy = privacyPolicy.doc(id);

  const GetData = await getPrivacyPolicy.get();
  const data = req.body;
  if (GetData.exists) {
    await privacyPolicy.doc(id).update(data, { new: true });
    res
      .status(200)
      .send({ msg: "PrivacyPolicy updated Successfully", data: data });
  } else {
    res.status(300).send({ msg: "UserId Not Found" });
  }
};

/*
Get All Allotment-Tips 
**/
const GetAllPrivacyPolicy = async (req, res) => {
  const getPrivacyPolicy = await privacyPolicy.select("PrivacyPolicy").get();
  if (getPrivacyPolicy) {
    const PrivacyPolicy = getPrivacyPolicy.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send({ msg: "Get All PrivacyPolicy", data: PrivacyPolicy });
  } else {
    res.status(300).send({ msg: "Faq Not Found" });
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
const DeletePrivacyPolicy = async (req, res) => {
  const id = req.params.id;
  const PrivacyPolicyId = privacyPolicy.doc(id);
  const GetData = await PrivacyPolicyId.get();
  if (GetData.exists) {
    await privacyPolicy.doc(id).delete();
    res.status(200).send({ msg: "PrivacyPolicy Deleted Successfully" });
  } else {
    res.status(400).send({ msg: "Oops! User Not Found" });
  }
};
module.exports = {
  CreatePrivacyPolicy,
  updatePrivacyPolicy,
  GetAllPrivacyPolicy,
  DeletePrivacyPolicy,
};
