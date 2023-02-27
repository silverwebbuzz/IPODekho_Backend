const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
var admin = require("firebase-admin");
const { Timestamp } = require("@google-cloud/firestore");
const TermsAndCondition = firestore.collection("TermsAndConditions");
webApp.locals.bucket = admin.storage().bucket();
/**
 * The following Api contains source code for a Create Terms And Condition.
 */
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
/**
 * The following Api contains source code for a Update Terms And Condition.
 */
const updateTermsAndCondition = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(300).send({ msg: " Not Found" });
  }
};

/**
 * The following Api contains source code for a Get All Terms And Condition.
 */
const GetAllTermsAndCondition = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(300).send({ msg: " Not Found" });
  }
};
/**
 * The following Api contains source code for a Delete Terms And Condition.
 */
const DeleteTermsAndCondition = async (req, res) => {
  try {
    const id = req.params.id;
    const termsAndCondition = TermsAndCondition.doc(id);
    const GetData = await termsAndCondition.get();
    if (GetData.exists) {
      await TermsAndCondition.doc(id).delete();
      res.status(200).send({ msg: "TermsAndCondition Deleted Successfully" });
    } else {
      res.status(400).send({ msg: "Oops! User Not Found" });
    }
  } catch (error) {
    res.status(300).send({ msg: " Not Found" });
  }
};
module.exports = {
  CreateTermsAndCondition,
  updateTermsAndCondition,
  GetAllTermsAndCondition,
  DeleteTermsAndCondition,
};
