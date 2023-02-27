const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
var admin = require("firebase-admin");
const { Timestamp } = require("@google-cloud/firestore");
const privacyPolicy = firestore.collection("PrivacyPolicy");
webApp.locals.bucket = admin.storage().bucket();
/**
 * The following Api contains source code for a Create Privacy-Policy.
 */
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
    res.status(400).send(error);
  }
};
/**
 * The following Api contains source code for a Update Privacy-Policy.
 */
const updatePrivacyPolicy = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(400).send(error);
  }
};
/**
 * The following Api contains source code for a Get All Privacy-Policy.
 */
const GetAllPrivacyPolicy = async (req, res) => {
  try {
    const getPrivacyPolicy = await privacyPolicy.select("PrivacyPolicy").get();
    if (getPrivacyPolicy) {
      const PrivacyPolicy = getPrivacyPolicy.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res
        .status(200)
        .send({ msg: "Get All PrivacyPolicy", data: PrivacyPolicy });
    } else {
      res.status(300).send({ msg: "Faq Not Found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
/**
 * The following Api contains source code for a Delete Privacy-Policy.
 */
const DeletePrivacyPolicy = async (req, res) => {
  try {
    const id = req.params.id;
    const PrivacyPolicyId = privacyPolicy.doc(id);
    const GetData = await PrivacyPolicyId.get();
    if (GetData.exists) {
      await privacyPolicy.doc(id).delete();
      res.status(200).send({ msg: "PrivacyPolicy Deleted Successfully" });
    } else {
      res.status(400).send({ msg: "Oops! User Not Found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  CreatePrivacyPolicy,
  updatePrivacyPolicy,
  GetAllPrivacyPolicy,
  DeletePrivacyPolicy,
};
