const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
const saltedMd5 = require("salted-md5");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
var admin = require("firebase-admin");
const { Query } = require("@google-cloud/firestore");
const userInformation = firestore.collection("MainLineIPO");
const messageCollection = firestore.collection("messageCollection");
const base64 = require("base64-to-image");
const crypto = require("crypto");
/* 
Create mainLineIPO 
**/
const createMainlineIPO = async (req, res, body) => {
  try {
    const id = req.params.id;
    delete req.params.id;
    const GetIpo = userInformation.doc(id);
    const GetData = await GetIpo.get();
    const GeneralIPO = req.body;

    if (GetData.exists) {
      const updatedAt = new Date();
      const Merged = { ...GeneralIPO, updatedAt };
      await userInformation.doc(id).update(Merged, { new: true });
      res.status(200).send({
        msg: `${GeneralIPO.CategoryForIPOS} Updated Successfully`,
        data: GeneralIPO,
      });
    } else {
      const GeneralIPOData = req.body;
      if (GeneralIPOData) {
        const createdAt = new Date();
        const Merged = { ...GeneralIPOData, createdAt };
        const id = await userInformation.add(Merged);
        const ids = { id: id.id };
        const CreatedAt = { createdAt: createdAt };
        const merged = Object.assign(GeneralIPOData, ids, CreatedAt);
        res.status(200).send({
          msg: `${GeneralIPOData.CategoryForIPOS} Created Successfully`,
          data: merged,
        });
      } else {
        res.status(300).send({ msg: "IPO Not Found" });
      }
    }
    webApp.locals.bucket = admin.storage().bucket();
  } catch (error) {
    console.log(error, "error");
    res.status(400).send(error);
  }
};

const message = async (req, res, body) => {
  const companyId = req.body.companyId;

  const ids = {
    companyId: companyId,
  };
  if (companyId) {
    await messageCollection.add(ids);

    res.status(200).send({
      msg: "ChatBox Successfully Created",
      chatId: ids,
    });
  } else {
    res.status(300).send({ msg: "User Not Found" });
  }
};
const getMessage = async (req, res) => {
  try {
    const getMessage = await messageCollection.select("companyId").get();
    if (getMessage) {
      const Faqs = getMessage.docs.map((doc) => ({
        chatroomId: doc.id,
        ...doc.data(),
      }));
      res.status(200).send({ msg: "Get All Faqs", data: Faqs });
    } else {
      res.status(300).send({ msg: "Faq Not Found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "MessageCollection Not Found" });
  }
};

/* 
Get All IPO List With Search,Filter
**/

const GetMainLineIpo = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    // let offset = req.query.offset || 2; // initial offset
    let page = req.query.page || 1; // initial page
    const CategoryForIPOS = req.body.CategoryForIPOS;
    const keyword = req.body.keyword;
    const Filter = req.body.Filter;
    const Pagination = req.query.Pagination;
    /*
      Search Data For IPO
      **/
    if (req.body.keyword) {
      const companyName1 = await userInformation
        .where("CategoryForIPOS", "==", CategoryForIPOS)
        // .orderBy("companyName", "asc")
        .where("companyName", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo = companyName1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const fromPrice2 = await userInformation
        .where("CategoryForIPOS", "==", CategoryForIPOS)
        .where("fromPrice", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo2 = fromPrice2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const toPrice3 = await userInformation
        .where("CategoryForIPOS", "==", CategoryForIPOS)
        .where("toPrice", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo3 = toPrice3.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const IPOStatus = await userInformation
        .where("CategoryForIPOS", "==", CategoryForIPOS)
        .where("IPOStatus", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo4 = IPOStatus.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const IPOOpenDate = await userInformation
        .where("CategoryForIPOS", "==", CategoryForIPOS)
        .where("IPOOpenDate", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo5 = IPOOpenDate.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const IPOCloseDate = await userInformation
        .where("CategoryForIPOS", "==", CategoryForIPOS)
        .where("IPOCloseDate", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo6 = IPOCloseDate.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const lotSize = await userInformation
        .where("CategoryForIPOS", "==", CategoryForIPOS)
        .where("lotSize", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo7 = lotSize.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (SearchIpo.length > 0) {
        res.status(200).send({ msg: "All Ipo", data: SearchIpo });
      } else if (SearchIpo2.length > 0) {
        res.status(200).send({ msg: "All Ipo", data: SearchIpo2 });
      } else if (SearchIpo3.length > 0) {
        res.status(200).send({ msg: "All Ipo", data: SearchIpo3 });
      } else if (SearchIpo4.length > 0) {
        res.status(200).send({ msg: "All Ipo", data: SearchIpo4 });
      } else if (SearchIpo5.length > 0) {
        res.status(200).send({ msg: "All Ipo", data: SearchIpo5 });
      } else if (SearchIpo6.length > 0) {
        res.status(200).send({ msg: "All Ipo", data: SearchIpo6 });
      } else if (SearchIpo7.length > 0) {
        res.status(200).send({ msg: "All Ipo", data: SearchIpo7 });
      } else {
        res.status(200).send({ msg: "Keyword Not Found" });
      }
      /*
      Filter Data For IPO
      **/
    } else if (req.body.Filter) {
      const IPOStatus = await userInformation
        .where("CategoryForIPOS", "==", CategoryForIPOS)
        .where("IPOStatus", "==", Filter)
        .select(
          "CategoryForIPOS",
          "companyName",
          "IPOOpenDate",
          "IPOCloseDate",
          "lotSize",
          "GMPStatus",
          "GMP",
          "IPOStatus",
          "fromPrice",
          "toPrice",
          "file"
        );
      IPOStatus.offset(Number(page - 1) * limit)
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
          const MainLineIpo = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          IPOStatus.get().then((querySnapshot) => {
            let Total = querySnapshot.size;
            const Merged = { MainLineIpo, Total };
            res.status(200).send({ msg: "All IPOS", data: Merged });
          });
        });
    }
    //     .offset(Number(page - 1) * limit)
    //     .limit(Number(limit))
    //     .get();
    //   const SearchIpo4 = IPOStatus.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   const MainLineIpo = { MainLineIpo: SearchIpo4 };
    //   res.status(200).send({ msg: "All MainLineIpo", data: MainLineIpo });
    // }
    else {
      /*
      GetAll
      Data For IPO
      **/
      const GetIpo = await userInformation
        .where("CategoryForIPOS", "==", CategoryForIPOS)
        .select(
          "CategoryForIPOS",
          "companyName",
          "IPOOpenDate",
          "IPOCloseDate",
          "lotSize",
          "GMPStatus",
          "GMP",
          "IPOStatus",
          "fromPrice",
          "toPrice",
          "file"
        );
      // .get();
      // function paginateNext() {
      GetIpo.offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size == 0) {
            // No more documents left
            console.log("No more documents left");
            res.status(200).send({ msg: "No more documents left" });
            return;
          }
          console.log(`Page ${page}:`);
          const MainLineIpo = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(MainLineIpo);
          GetIpo.get().then((querySnapshot) => {
            let Total = querySnapshot.size;
            // console.log(TotalUsers);
            const Merged = { MainLineIpo, Total };
            res.status(200).send({ msg: "All IPOS", data: Merged });
          });
          // console.log(total);

          // Set the last document as the offset for the next page
          // const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
          // offset = offset + querySnapshot.size;
          // page = page + 1;
        });
      // }
      // paginateNext();
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

//  /
// Function to retrieve data with pagination
// const getDataWithPagination = async (limit, pageNumber, nextPageToken) => {
//   const Pagination = req.query.Pagination;
//   let query = userInformation
//     .collection("MainLineIPO")
//     .limit(limit * pageNumber);
//   if (nextPageToken) {
//     // Start the query from the document specified in the nextPageToken
//     const doc = await userInformation
//       .collection("MainLineIPO")
//       .doc(nextPageToken)
//       .get();
//     query = query.startAfter(doc);
//   }
//   console.log(doc);
//   // Get the data from Firebase
//   const snap = await query.get();

//   // Get the last document from the query
//   const lastDoc = snap.docs[snap.docs.length - 1];

//   // Create the nextPageToken by getting the id of the last document
//   const nextPage = lastDoc ? lastDoc.id : null;

//   // Return the data and nextPageToken
//   return {
//     data: snap.docs
//       .slice((pageNumber - 1) * Pagination, pageNumber * Pagination)
//       .map((doc) => doc.data()),
//     nextPageToken: nextPage,
//   };
// };

// return GetIpo.get().then(function (documentSnapshots) {
//   // Get the last visible document
//   var lastVisible =
//     documentSnapshots.docs[documentSnapshots.docs.length - 1];
//   console.log("last", lastVisible);
//   var next = userInformation("MainLineIPO")
//     .startAfter(lastVisible)
//     .limit(Pagination);
//   console.log(next);
// });

//
// const result = await data.getMany();
// // return result
// return { total: total, data: result };
// if (GetIpo) {
//   const MainLineIpo = GetIpo.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   console.log(MainLineIpo);
//   // const companyName = req.body.companyName;
//   // if (namr) {
//   //   const MainLineIpo2 = companyName.docs.map((doc) => ({
//   //     namr: doc.companyName,
//   //     ...doc.data(),
//   //   }));
//   //   console.log(MainLineIpo2);
//   // }
//   res.status(200).send({
//     msg: `${CategoryForIPOS} All successfully`,
//     data: MainLineIpo,
//   });
// } else {
//   res.status(300).send({ msg: `${CategoryForIPOS} Not Found` });
// }

// const GetMainLineIpo = async (req, res) => {
//   try {
//     let query = {};
//     const GetTotal = await userInformation.get().then((querySnapshot) => {
//       let TotalUsers = querySnapshot.size;
//       console.log(TotalUsers);
//     });
//     const GetIpo = await userInformation
//       .select(
//         "companyName",
//         "IPOOpenDate",
//         "IPOCloseDate",
//         "lotSize",
//         "GMPStatus",
//         "GMP",
//         "IPOStatus",
//         "fromPrice",
//         "toPrice",
//         "file"
//       )
//       .get();

//     //
//     // const result = await data.getMany();
//     // // return result
//     // return { total: total, data: result };
//     if (GetIpo) {
//       const MainLineIpo = GetIpo.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       // console.log(data);
//       // const companyName = req.body.companyName;
//       // if (namr) {
//       //   const MainLineIpo2 = companyName.docs.map((doc) => ({
//       //     namr: doc.companyName,
//       //     ...doc.data(),
//       //   }));
//       //   console.log(MainLineIpo2);
//       // }
//       res.status(200).send({ msg: "All MainLineIpo", data: MainLineIpo });
//     } else {
//       res.status(300).send({ msg: "MainLineIpo Not Found" });
//     }
//   } catch (error) {
//     console.log(error, "error");
//     res.status(400).send({ msg: "User Not Found" });
//   }
// };

/* Get Id By MainLineIPO List Fetch
 **/
const GetIMainLineIPOStatus = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await userInformation.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const Status = Data.status;
          usersArray.push(doc.data());
          const status = { Status };
          res.status(200).send({
            msg: "MainLineIPO Status Get Successfully",
            Status: status,
          });
        }
      });
      let Condition = true;
      snapshot.forEach((doc) => {
        if (doc.id !== id && True && Condition) {
          Condition = false;
          res.status(400).send({
            msg: "Status Not Get ",
          });
        }
      });
    });
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
//
const GetIdByMainLineIpo = async (req, res) => {
  try {
    const id = req.params.id;
    const CategoryForIPOS = req.body.CategoryForIPOS;
    console.log(CategoryForIPOS);
    // console.log(CategoryForIPOS);
    var usersArray = [];
    let True = true;
    const data = await userInformation
      // .where("CategoryForIPOS", "==", CategoryForIPOS)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id == id && True) {
            True = false;
            const Data = doc.data();
            if (Data.CategoryForIPOS === CategoryForIPOS) {
              //MainLineIPO Genral
              const id = doc.id;
              const preIssueShareHolding = Data.preIssueShareHolding;
              const reatailQuota = Data.reatailQuota;
              const qibQuota = Data.qibQuota;
              const DRHPDraft = Data.DRHPDraft;
              const companyDescription = Data.companyDescription;
              const freshIssue = Data.freshIssue;
              const fromPrice = Data.fromPrice;
              const ObjectOfIssue = Data.ObjectOfIssue;
              const postIssueShareHolding = Data.postIssueShareHolding;
              const issueSize = Data.issueSize;
              const RHPDraft = Data.RHPDraft;
              const promotersName = Data.promotersName;
              const faceValue = Data.faceValue;
              const toPrice = Data.toPrice;
              const issueType = Data.issueType;
              const companyName = Data.companyName;
              const nilQuota = Data.nilQuota;
              const listingAt = Data.listingAt;
              console.log(listingAt);
              const offerForSale = Data.offerForSale;
              const lotSize = Data.lotSize;
              //MainLineIPO Financial
              const earningPerShare = Data.earningPerShare;
              const peersComparison = Data.peersComparison;
              const financialLotsize = Data.financialLotsize;
              const returnonNetWorth = Data.returnonNetWorth;
              const companyFinancials = Data.companyFinancials;
              const netAssetValue = Data.netAssetValue;
              const earningPERatio = Data.earningPERatio;
              //MainLineIPO Subscription
              const sNII = Data.sNII;
              const others = Data.others;
              const total = Data.total;
              const subscriptionDetails = Data.subscriptionDetails;
              const retailInvestors = Data.retailInvestors;
              const qualifiedInstitutions = Data.qualifiedInstitutions;
              const employees = Data.employees;
              const bNII = Data.bNII;
              const nonInstitutionalBuyers = Data.nonInstitutionalBuyers;
              //MainLineIPO ListingInfo
              const scriptPosition = Data.scriptPosition;
              const closingDifferent = Data.closingDifferent;
              const listingDifferent = Data.listingDifferent;
              const BSEScript = Data.BSEScript;
              const closingPrice = Data.closingPrice;
              const listingPrice = Data.listingPrice;
              const listingPosition = Data.listingPosition;
              const weekLow = Data.weekLow;
              const NSECode = Data.NSECode;
              const closingDate = Data.closingDate;
              const listingDate = Data.listingDate;
              const weekHigh = Data.weekHigh;

              //MainLineIPO CompanyRegisterInfo
              const registerPhone = Data.registerPhone;
              const address = Data.address;
              const registerEmail = Data.registerEmail;
              const registerName = Data.registerName;
              const companyPhone = Data.companyPhone;
              const email = Data.email;
              const registerWebsite = Data.registerWebsite;
              const allotmentLink = Data.allotmentLink;
              const website = Data.website;

              //Status
              const IPOstatus = Data.IPOStatus;
              const CategoryForIPOS = Data.CategoryForIPOS;
              //Tentative Timetable
              const IPOOpenDate = Data.IPOOpenDate;
              const IPOCloseDate = Data.IPOCloseDate;
              const IPOAllotmentDate = Data.IPOAllotmentDate;
              const IPORefundsInitiation = Data.IPORefundsInitiation;
              const IPODematTransfer = Data.IPODematTransfer;
              const IPOListingDate = Data.IPOListingDate;
              const chatRoomId = Data.chatRoomId;
              const shortText = Data.shortText;
              const file = Data.file;
              usersArray.push(doc.data());
              // const company = { File, companyName };
              // const address1 = { address };
              // const TentativeTimetable = {
              console.log(IPOListingDate);
              const General = {
                chatRoomId,
                shortText,
                IPOOpenDate,
                IPOCloseDate,
                IPOAllotmentDate,
                IPORefundsInitiation,
                IPODematTransfer,
                IPOListingDate,
                // };
                // const IPOStatus = {
                IPOstatus,
                // };
                // const general = {
                preIssueShareHolding,
                reatailQuota,
                qibQuota,
                DRHPDraft,
                companyDescription,
                freshIssue,
                fromPrice,
                ObjectOfIssue,
                postIssueShareHolding,
                issueSize,
                RHPDraft,
                promotersName,
                faceValue,
                toPrice,
                issueType,
                companyName,
                nilQuota,
                listingAt,
                offerForSale,
                lotSize,
                // };
                // const Financials = {
                earningPerShare,
                peersComparison,
                financialLotsize,
                returnonNetWorth,
                companyFinancials,
                netAssetValue,
                earningPERatio,
                // };
                // const subscription = {
                sNII,
                others,
                total,
                subscriptionDetails,
                retailInvestors,
                qualifiedInstitutions,
                employees,
                bNII,
                nonInstitutionalBuyers,
                // };
                // const companyRegisterInfo = {
                registerPhone,
                address,
                registerEmail,
                registerName,
                companyPhone,
                email,
                registerWebsite,
                allotmentLink,
                website,
                // };
                // const CompanyRegisterInfo = { companyRegisterInfo };
                // const Subscription = { subscription };
                // const financials = { Financials };
                // const listingInfo = {
                scriptPosition,
                closingDifferent,
                listingDifferent,
                BSEScript,
                closingPrice,
                listingPrice,
                listingPosition,
                weekLow,
                NSECode,
                closingDate,
                listingDate,
                weekHigh,
                // };
                // const ListingInfo = { listingInfo };
                // const General = {
                id,
                CategoryForIPOS,
                file,
              };
              // };
              res.status(200).send({
                msg: `${CategoryForIPOS}IPO Get Successfully`,
                IPODetails: General,
              });
            } else {
              res.status(300).send({
                msg: "IPO Category Not Found",
              });
            }
          }
        });
        let Condition = true;
        snapshot.forEach((doc) => {
          if (doc.id !== id && True && Condition) {
            Condition = false;
            res.status(400).send({
              msg: "User Not Get",
            });
          }
        });
      });
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};

/* 
Update MAinLineIpo
**/
const UpdateMainLineIpo = async (req, res) => {
  try {
    const id = req.params.id;
    delete req.params.id;
    const GetIpo = userInformation.doc(id);

    const GetData = await GetIpo.get();
    const data = req.body;
    if (GetData.exists) {
      await userInformation.doc(id).update(data, { new: true });
      res.status(200).send({ msg: "Ipo updated Successfully", data: data });
    } else {
      res.status(300).send({ msg: "UserId Not Found" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};
/* 
Delete MAinLineIpo
**/
const DeleteMainLineIpo = async (req, res) => {
  try {
    const id = req.params.id;
    const GetIpo = await userInformation.doc(id);
    const GetData = await GetIpo.get();
    if (GetData.exists) {
      await userInformation.doc(id).delete();
      res.status(200).send({ msg: "User Deleted Successfully" });
    } else {
      res.status(400).send({ msg: "Oops! User Not Found" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};
/* 
upload image 
**/

webApp.locals.bucket = admin.storage().bucket();
const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      await webApp.locals.bucket
        .file(fileName)
        .createWriteStream()
        .end(req.file.buffer);
      const id = req.params.id;
      const GetIpo = userInformation.doc(id);
      const GetData = await GetIpo.get();
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      if (GetData.exists) {
        const merged = Object.assign({ file: file, id: id });
        await userInformation.doc(id).update({ file: file });
        res
          .status(200)
          .send({ msg: "Image Uploaded Successfully", file: merged });
      } else {
        console.log("hello");
        const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
        const fileName = name + path.extname(req.file.originalname);
        await webApp.locals.bucket
          .file(fileName)
          .createWriteStream()
          .end(req.file.buffer);
        const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
        const file1 = {
          file: file,
        };
        const id = await userInformation.add(file1);
        const ids = { id: id.id };
        // const concat = { GeneralIPOData, ...id };
        // const AllIpo = { concat };
        const merged = Object.assign({ file: file, id: id.id });
        console.log(id.id);
        res.status(200).send({
          msg: "Image Uploaded Successfully",
          data: merged,
        });
      }
    } else if (req.file == null) {
      const id = req.params.id;
      delete req.params.id;
      const GetIpo = userInformation.doc(id);
      const GetData = await GetIpo.get();
      const file = req.file;
      const updateFile = {
        file: "",
        id: id,
      };
      if (GetData.exists) {
        await userInformation.doc(id).update(updateFile, { new: true });

        res
          .status(200)
          .send({ msg: "Image Updated Successfully", status: updateFile });
      } else {
        res.status(300).send({ msg: "Image Not Found" });
      }
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

/*
Get Image By Id
 **/
const GetImage = async (req, res) => {
  try {
    const id = req.params.id;

    var usersArray = [];
    let True = true;
    const data = await userInformation.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const File = Data.file;
          usersArray.push(doc.data());
          res.status(200).send({
            msg: "File Get Successfully",
            Image: File,
          });
          console.log("its");
        }
      });
      let Condition = true;
      snapshot.forEach((doc) => {
        if (doc.id !== id && True && Condition) {
          Condition = false;
          res.status(400).send({
            msg: "Image Not Get",
          });
        }
      });
    });
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};

/* 
Update Status
**/
const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    delete req.params.id;
    const GetIpo = userInformation.doc(id);
    const GetData = await GetIpo.get();
    const Status = req.body;
    if (GetData.exists) {
      await userInformation.doc(id).update(Status, { new: true });
      res
        .status(200)
        .send({ msg: "Status Updated Successfully", status: Status });
    } else {
      res.status(300).send({ msg: "UserId Not Found" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};
/* 
Pagination Api
**/
const Pagination = async (req, res) => {
  let lastDocSnap = null;

  async function getNextBatch(lastDoc) {
    if (lastDocSnap) query = userInformation.startAt(lastDoc); // pass last doc snapshot
    query = userInformation.limit(10); // add limit

    const snapshot = await userInformation.get();
    lastDocSnap = snapshot[snapshot.size - 1]; // setting new last doc
    return snapshot.docs.map((doc) => doc.data);
  }
  // console.log(doc.data);
  getNextBatch(lastDocSnap);
};

// let lastDocSnap = null

// async function getNextBatch(lastDoc) {
//   const query = await db.collection('collection')
//   if (lastDocSnap) query = query.startAt(lastDoc) // pass last doc snapshot
//   query = query.limit(10) // add limit

//   const snapshot = await query.get()
//   lastDocSnap = snapshot[snapshot.size-1] // setting new last doc
//   return snapshot.docs.map(doc => doc.data)
// }

// getNextBatch(lastDocSnap)
module.exports = {
  createMainlineIPO,
  GetMainLineIpo,
  UpdateMainLineIpo,
  DeleteMainLineIpo,
  GetIdByMainLineIpo,
  uploadImage,
  GetImage,
  updateStatus,
  GetIMainLineIPOStatus,
  Pagination,
  message,
  getMessage,
};
