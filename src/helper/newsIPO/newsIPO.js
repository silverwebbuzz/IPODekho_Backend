const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
const saltedMd5 = require("salted-md5");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
var admin = require("firebase-admin");

const News = firestore.collection("News");
webApp.locals.bucket = admin.storage().bucket();
/*
create News  
**/
const createNews = async (req, res, body) => {
  try {
    if (req.file) {
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      await webApp.locals.bucket
        .file(fileName)
        .createWriteStream()
        .end(req.file.buffer);
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      const newsIPO = {
        Date: req.body.Date || "",
        Title: req.body.Title || "",
        Content: req.body.Content || "",
        createdAt: new Date(),
        file: file,
      };

      if (newsIPO) {
        await News.add(newsIPO);
        res.status(200).send({
          msg: "Offer Created Successfully",
          data: newsIPO,
        });
      } else {
        res.status(300).send({ msg: "Offer Not Created" });
      }
    } else {
      const Data = {
        Date: req.body.Date || "",
        Title: req.body.Title || "",
        Content: req.body.Content || "",
        createdAt: new Date(),
      };
      if (Data) {
        await News.add(Data);
        res.status(200).send({
          msg: "News Created Successfully",
          data: Data,
        });
      } else {
        res.status(300).send({ msg: "News Not Found" });
      }
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send(error);
  }
};
/*
update News 
**/
const UpdateNews = async (req, res) => {
  const id = req.params.id;
  delete req.params.id;
  const GetNews = News.doc(id);

  const GetData = await GetNews.get();
  const data = req.body;
  if (GetData.exists) {
    await News.doc(id).update(data, { new: true });
    res.status(200).send({ msg: "News updated Successfully", data: data });
  } else {
    res.status(300).send({ msg: "UserId Not Found" });
  }
};
/*
update News-Image 
**/
const updateNewsImage = async (req, res) => {
  try {
    if (req.file) {
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      await webApp.locals.bucket
        .file(fileName)
        .createWriteStream()
        .end(req.file.buffer);
      const id = req.params.id;
      const GetNews = News.doc(id);
      const GetData = await GetNews.get();
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      const updateFile = {
        file: file,
        id: id,
      };
      if (GetData) {
        await News.doc(id).update({ file: file });
        res
          .status(200)
          .send({ msg: "News-Image Updated Successfully", file: updateFile });
      }
    } else if (req.file == null) {
      const id = req.params.id;
      delete req.params.id;
      const GetNews = News.doc(id);
      const GetData = await GetNews.get();
      const updateFile = {
        file: "",
        id: id,
      };

      if (GetData.exists) {
        await News.doc(id).update(updateFile, { new: true });

        res
          .status(200)
          .send({ msg: "Image Updated Successfully", status: updateFile });
      } else {
        res.status(300).send({ msg: "Image Not Found" });
      }
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
/*
Get All News 
**/
const GetAllNews = async (req, res) => {
  const limit = req.query.limit || 2;
  let offset = req.query.offset || 2; // initial offset
  let page = req.query.page || 3;
  const GetNews = await News.select("Date", "Title", "Content", "file");
  if (GetNews) {
    GetNews.offset(Number(page - 1) * limit)
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
        const AllNews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        News.get().then((querySnapshot) => {
          let Total = querySnapshot.size;
          // console.log(TotalUsers);
          const Merged = { AllNews, Total };
          res
            .status(200)
            .send({ msg: "All News Get Successfully", data: Merged });
        });
      });
  } else {
    res.status(200).send({ msg: "Not Get All News", data: Merged });
  }

  // if (GetNews) {
  //   const GetAllNews = GetNews.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   res
  //     .status(200)
  //     .send({ msg: "Get All News Successfully", data: GetAllNews });
  // } else {
  //   res.status(300).send({ msg: "News Not Found" });
  // }
};
/*
GetId By single News Details
**/
const GetSingleNews = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await News.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const Content = Data.Content;
          const file = Data.file;
          const Date = Data.Date;
          const Title = Data.Title;
          const id = doc.id;
          usersArray.push(doc.data());
          const NewsData = {
            id,
            Content,
            Date,
            Title,
            file,
          };
          res.status(200).send({
            msg: "Get Single News Successfully",
            GetSingleNews: NewsData,
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
    res.status(400).send({ msg: "News Not Found" });
  }
};
/*
Deleted single offer Detail
**/
const DeleteNews = async (req, res) => {
  const id = req.params.id;
  const GetNews = News.doc(id);
  const GetData = await GetNews.get();
  if (GetData.exists) {
    await News.doc(id).delete();
    res.status(200).send({ msg: "News Deleted Successfully" });
  } else {
    res.status(400).send({ msg: "Oops! User Not Found" });
  }
};
module.exports = {
  createNews,
  UpdateNews,
  updateNewsImage,
  GetAllNews,
  GetSingleNews,
  DeleteNews,
};
