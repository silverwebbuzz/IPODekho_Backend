const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
var admin = require("firebase-admin");
const faqs = firestore.collection("Faqs");
webApp.locals.bucket = admin.storage().bucket();
/*
create IPO Faqs
**/
const CreateFaq = async (req, res, body) => {
  try {
    const faqIPO = {
      faq: req.body.faq,
      createdAt: new Date(),
    };
    console.log(faqIPO);
    if (faqIPO) {
      await faqs.add(faqIPO);
      res.status(200).send({
        msg: "Faq Created Successfully",
        data: faqIPO,
      });
    } else {
      res.status(300).send({ msg: "Faq Not Found" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send(error);
  }
};
/*
update Faqs 
**/
const updateFaq = async (req, res) => {
  const id = req.params.id;
  delete req.params.id;
  const getFaq = faqs.doc(id);

  const GetData = await getFaq.get();
  const data = req.body;
  if (GetData.exists) {
    await faqs.doc(id).update(data, { new: true });
    res.status(200).send({ msg: "Faqs updated Successfully", data: data });
  } else {
    res.status(300).send({ msg: "UserId Not Found" });
  }
};

/*
Get All Allotment-Tips 
**/
const GetAllFaq = async (req, res) => {
  const getFaq = await faqs.select("faq").get();
  if (getFaq) {
    const Faqs = getFaq.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send({ msg: "Get All Faqs", data: Faqs });
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
const DeleteFaqs = async (req, res) => {
  const id = req.params.id;
  const faqId = faqs.doc(id);
  const GetData = await faqId.get();
  if (GetData.exists) {
    await faqs.doc(id).delete();
    res.status(200).send({ msg: "Faqs Deleted Successfully" });
  } else {
    res.status(400).send({ msg: "Oops! User Not Found" });
  }
};
module.exports = {
  CreateFaq,
  updateFaq,
  DeleteFaqs,
  GetAllFaq,
};
