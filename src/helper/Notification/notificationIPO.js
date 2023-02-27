const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
const admin = require("firebase-admin");
const messaging = admin.messaging();
const Notification = firestore.collection("Notification");

/**
 * The following Api contains source code for a Create Notification Campaign.
 */
const createCampaign = async (req, res, body) => {
  const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
  };
  const registrationToken = "1:931102543499:android:9f704203083ee7e2cf4e8e";
  const message = req.body.message;
  const options = notification_options;

  admin
    .messaging()
    .sendToDevice(registrationToken, message, options)
    .then((response) => {
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
/**
 * The following Api contains source code for a Create Notification.
 */
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
/**
 * The following Api contains source code for a Get All Notifications.
 */
const GetAllNotification = async (req, res) => {
  try {
    const limit = req.query.limit || 2;
    let page = req.query.page || 3;

    const keyword = req.body.keyword;
    if (req.body.keyword) {
      const NotificationTitle = await Notification.where(
        "notificationTitle",
        "==",
        keyword
      )
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo = NotificationTitle.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const redirect = await Notification.where("Redirect", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo2 = redirect.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const Date = await Notification.where("createdAt", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo3 = Date.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (SearchIpo.length > null) {
        res.status(200).send({ msg: "Search Notification", data: SearchIpo });
      } else if (SearchIpo2.length > 0) {
        res.status(200).send({ msg: "Search Notification", data: SearchIpo2 });
      } else if (SearchIpo3.length > 0) {
        res.status(200).send({ msg: "Search Notification", data: SearchIpo3 });
      } else {
        res.status(200).send({ msg: "Not Keyword Found" });
      }
    } else {
      const GetNotification = await Notification.select(
        "notificationTitle",
        "notificationDescription",
        "Redirect",
        "createdAt"
      );
      if (GetNotification) {
        GetNotification.offset(Number(page - 1) * limit)
          .limit(Number(limit))
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size === 0) {
              res.status(200).send({ msg: "No more documents left" });
              return;
            }
            const AllNotification = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            Notification.get().then((querySnapshot) => {
              let Total = querySnapshot.size;
              const Merged = { AllNotification, Total };
              res
                .status(200)
                .send({ msg: "Notification Get Successfully", data: Merged });
            });
          });
      } else {
        res.status(200).send({ msg: "Not Get All Notification", data: Merged });
      }
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
/**
 * The following Api contains source code for a Get Single Notification.
 */
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
/**
 * The following Api contains source code for a Delete Notification.
 */
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
  createCampaign,
};
