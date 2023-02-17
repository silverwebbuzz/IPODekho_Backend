const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
var admin = require("firebase-admin");

const Notification = firestore.collection("Notification");

/*
create Notification  
**/
const createNotification = async (req, res, body) => {
  try {
    const Data = {
      notificationTitle: req.body.notificationTitle || "",
      notificationDescription: req.body.notificationDescription || "",
      Redirect: req.body.Redirect || "",
      createdAt: new Date(),
    };
    if (Data) {
      await Notification.add(Data);
      res.status(200).send({
        msg: "Notification Created Successfully",
        data: Data,
      });
    } else {
      res.status(300).send({ msg: "Notification Not Found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

/*
Get All Notification 
**/
const GetAllNotification = async (req, res) => {
  const limit = req.query.limit || 2;
  let offset = req.query.offset || 2; // initial offset
  let page = req.query.page || 3;
  const GetNotification = await Notification.select(
    "notificationTitle",
    "notificationDescription",
    "Redirect"
  );
  if (GetNotification) {
    GetNotification.offset(Number(page - 1) * limit)
      .limit(Number(limit))
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          // No more documents left
          console.log("No more documents left");
          res.status(200).send({ msg: "No more documents left" });
          return;
        }
        console.log(`Page ${page}:`);
        const AllNotification = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        Notification.get().then((querySnapshot) => {
          let Total = querySnapshot.size;
          // console.log(TotalUsers);
          const Merged = { AllNotification, Total };
          res
            .status(200)
            .send({ msg: "Notification Get Successfully", data: Merged });
        });
      });
  } else {
    res.status(200).send({ msg: "Not Get All Notification", data: Merged });
  }
};
/*
GetId By single News Details
**/
const GetSingleNotification = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await Notification.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const notificationTitle = Data.notificationTitle;
          const notificationDescription = Data.notificationDescription;
          const Redirect = Data.Redirect;
          const id = doc.id;
          usersArray.push(doc.data());
          const NotificationData = {
            id,
            notificationTitle,
            notificationDescription,
            Redirect,
          };
          res.status(200).send({
            msg: "Get Single Notification Successfully",
            GetSingleNotification: NotificationData,
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
    res.status(400).send({ msg: "Notification Not Found" });
  }
};
/*
Deleted single offer Detail
**/
const DeleteNotification = async (req, res) => {
  const id = req.params.id;
  const GetNotification = Notification.doc(id);
  const GetData = await GetNotification.get();
  if (GetData.exists) {
    await Notification.doc(id).delete();
    res.status(200).send({ msg: "Notification Deleted Successfully" });
  } else {
    res.status(400).send({ msg: "Oops! User Not Found" });
  }
};
module.exports = {
  createNotification,
  GetAllNotification,
  GetSingleNotification,
  DeleteNotification,
};
