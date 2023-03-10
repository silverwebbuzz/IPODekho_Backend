const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
const saltedMd5 = require("salted-md5");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
var admin = require("firebase-admin");
const { Query } = require("@google-cloud/firestore");
const SmeIPO = firestore.collection("SME-IPO");

/* 
Create mainLineIPO 
**/
const createSmeIPO = async (req, res, body) => {
  try {
    if (req.file) {
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      await webApp.locals.bucket
        .file(fileName)
        .createWriteStream()
        .end(req.file.buffer);
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      const GeneralIPO = {
        companyDescription: req.body.companyDescription || "",
        ObjectOfIssue: req.body.ObjectOfIssue || "",
        companyName: req.body.companyName || "",
        faceValue: req.body.faceValue || "",
        fromPrice: req.body.fromPrice || "",
        toPrice: req.body.toPrice || "",
        lotSize: req.body.lotSize || "",
        issueSize: req.body.issueSize || "",
        freshIssue: req.body.freshIssue || "",
        offerForSale: req.body.offerForSale || "",
        reatailQuota: req.body.reatailQuota || "",
        qibQuota: req.body.qibQuota || "",
        nilQuota: req.body.nilQuota || "",
        issueType: req.body.issueType || "",
        listingAt: req.body.listingAt || "",
        DRHPDraft: req.body.DRHPDraft || "",
        RHPDraft: req.body.RHPDraft || "",
        preIssueShareHolding: req.body.preIssueShareHolding || "",
        postIssueShareHolding: req.body.postIssueShareHolding || "",
        promotersName: req.body.promotersName || "",
        companyFinancials: req.body.companyFinancials || "",
        earningPerShare: req.body.earningPerShare || "",
        earningPERatio: req.body.earningPERatio || "",
        returnonNetWorth: req.body.returnonNetWorth || "",
        netAssetValue: req.body.netAssetValue || "",
        financialLotsize: req.body.financialLotsize || "",
        peersComparison: req.body.peersComparison || "",
        address: req.body.address || "",
        companyPhone: req.body.companyPhone || "",
        email: req.body.email || "",
        website: req.body.website || "",
        registerName: req.body.registerName || "",
        registerPhone: req.body.registerPhone || "",
        registerEmail: req.body.registerEmail || "",
        registerWebsite: req.body.registerWebsite || "",
        allotmentLink: req.body.allotmentLink || "",
        subscriptionDetails: req.body.subscriptionDetails || "",
        qualifiedInstitutions: req.body.qualifiedInstitutions || "",
        nonInstitutionalBuyers: req.body.nonInstitutionalBuyers || "",
        bNII: req.body.bNII || "",
        sNII: req.body.sNII || "",
        retailInvestors: req.body.retailInvestors || "",
        employees: req.body.employees || "",
        others: req.body.others || "",
        total: req.body.total || "",
        IPOStatus: req.body.IPOStatus || "",
        IPOOpenDate: req.body.IPOOpenDate || "",
        IPOCloseDate: req.body.IPOCloseDate || "",
        IPOAllotmentDate: req.body.IPOAllotmentDate || "",
        IPORefundsInitiation: req.body.IPORefundsInitiation || "",
        IPODematTransfer: req.body.IPODematTransfer || "",
        IPOListingDate: req.body.IPOListingDate || "",
        listingDate: req.body.listingDate || "",
        listingPrice: req.body.listingPrice || "",
        listingPosition: req.body.listingPosition || "",
        listingDifferent: req.body.listingDifferent || "",
        NSECode: req.body.NSECode || "",
        BSEScript: req.body.BSEScript || "",
        closingDate: req.body.closingDate || "",
        closingPrice: req.body.closingPrice || "",
        scriptPosition: req.body.scriptPosition || "",
        closingDifferent: req.body.closingDifferent || "",
        weekHigh: req.body.weekHigh || "",
        weekLow: req.body.weekLow || "",
        createdAt: new Date(),
        file: file,
      };
      if (GeneralIPO) {
        await SmeIPO.add(GeneralIPO);
        //  ({ ignoreUndefinedProperties: true })
        res.status(200).send({
          msg: "SmeIPO Created Successfully",
          data: GeneralIPO,
        });
      } else {
        res.status(300).send({ msg: "Sme Not Found" });
      }
    } else {
      const GeneralIPOData = {
        companyDescription: req.body.companyDescription || "",
        ObjectOfIssue: req.body.ObjectOfIssue || "",
        companyName: req.body.companyName || "",
        faceValue: req.body.faceValue || "",
        fromPrice: req.body.fromPrice || "",
        toPrice: req.body.toPrice || "",
        lotSize: req.body.lotSize || "",
        issueSize: req.body.issueSize || "",
        freshIssue: req.body.freshIssue || "",
        offerForSale: req.body.offerForSale || "",
        reatailQuota: req.body.reatailQuota || "",
        qibQuota: req.body.qibQuota || "",
        nilQuota: req.body.nilQuota || "",
        issueType: req.body.issueType || "",
        listingAt: req.body.listingAt || "",
        DRHPDraft: req.body.DRHPDraft || "",
        RHPDraft: req.body.RHPDraft || "",
        preIssueShareHolding: req.body.preIssueShareHolding || "",
        postIssueShareHolding: req.body.postIssueShareHolding || "",
        promotersName: req.body.promotersName || "",
        companyFinancials: req.body.companyFinancials || "",
        earningPerShare: req.body.earningPerShare || "",
        earningPERatio: req.body.earningPERatio || "",
        returnonNetWorth: req.body.returnonNetWorth || "",
        netAssetValue: req.body.netAssetValue || "",
        financialLotsize: req.body.financialLotsize || "",
        peersComparison: req.body.peersComparison || "",
        address: req.body.address || "",
        companyPhone: req.body.companyPhone || "",
        email: req.body.email || "",
        website: req.body.website || "",
        registerName: req.body.registerName || "",
        registerPhone: req.body.registerPhone || "",
        registerEmail: req.body.registerEmail || "",
        registerWebsite: req.body.registerWebsite || "",
        allotmentLink: req.body.allotmentLink || "",
        subscriptionDetails: req.body.subscriptionDetails || "",
        qualifiedInstitutions: req.body.qualifiedInstitutions || "",
        nonInstitutionalBuyers: req.body.nonInstitutionalBuyers || "",
        bNII: req.body.bNII || "",
        sNII: req.body.sNII || "",
        retailInvestors: req.body.retailInvestors || "",
        employees: req.body.employees || "",
        others: req.body.others || "",
        total: req.body.total || "",
        IPOStatus: req.body.IPOStatus || "",
        IPOOpenDate: req.body.IPOOpenDate || "",
        IPOCloseDate: req.body.IPOCloseDate || "",
        IPOAllotmentDate: req.body.IPOAllotmentDate || "",
        IPORefundsInitiation: req.body.IPORefundsInitiation || "",
        IPODematTransfer: req.body.IPODematTransfer || "",
        IPOListingDate: req.body.IPOListingDate || "",
        listingDate: req.body.listingDate || "",
        listingPrice: req.body.listingPrice || "",
        listingPosition: req.body.listingPosition || "",
        listingDifferent: req.body.listingDifferent || "",
        NSECode: req.body.NSECode || "",
        BSEScript: req.body.BSEScript || "",
        closingDate: req.body.closingDate || "",
        closingPrice: req.body.closingPrice || "",
        scriptPosition: req.body.scriptPosition || "",
        closingDifferent: req.body.closingDifferent || "",
        weekHigh: req.body.weekHigh || "",
        weekLow: req.body.weekLow || "",
        createdAt: new Date(),
      };
      if (GeneralIPOData) {
        await SmeIPO.add(GeneralIPOData);
        //  ({ ignoreUndefinedProperties: true })
        res.status(200).send({
          msg: "SmeIPO Created Successfully",
          data: GeneralIPOData,
        });
      } else {
        res.status(300).send({ msg: "SmeIPO Not Found" });
      }
    }
    webApp.locals.bucket = admin.storage().bucket();

    // const uploadImage = async (req, res) => {

    //   const GeneralIPO = {
    //     companyDescription: req.body.companyDescription,
    //     ObjectOfIssue: req.body.ObjectOfIssue,
    //     companyName: req.body.companyName,
    //     faceValue: req.body.faceValue,
    //     fromPrice: req.body.fromPrice,
    //     toPrice: req.body.toPrice,
    //     lotSize: req.body.lotSize,
    //     issueSize: req.body.issueSize,
    //     freshIssue: req.body.freshIssue,
    //     offerForSale: req.body.offerForSale,
    //     reatailQuota: req.body.reatailQuota,
    //     qibQuota: req.body.qibQuota,
    //     nilQuota: req.body.nilQuota,
    //     issueType: req.body.issueType,
    //     listingAt: req.body.listingAt,
    //     DRHPDraft: req.body.DRHPDraft,
    //     RHPDraft: req.body.RHPDraft,
    //     preIssueShareHolding: req.body.preIssueShareHolding,
    //     postIssueShareHolding: req.body.postIssueShareHolding,
    //     promotersName: req.body.promotersName,

    //     companyFinancials: req.body.companyFinancials,
    //     earningPerShare: req.body.earningPerShare,
    //     earningPERatio: req.body.earningPERatio,
    //     returnonNetWorth: req.body.returnonNetWorth,
    //     netAssetValue: req.body.netAssetValue,
    //     financialLotsize: req.body.financialLotsize,
    //     peersComparison: req.body.peersComparison,

    //     address: req.body.address,
    //     companyPhone: req.body.companyPhone,
    //     email: req.body.email,
    //     website: req.body.website,
    //     registerName: req.body.registerName,
    //     registerPhone: req.body.registerPhone,
    //     registerEmail: req.body.registerEmail,
    //     registerWebsite: req.body.registerWebsite,
    //     allotmentLink: req.body.allotmentLink,

    //     subscriptionDetails: req.body.subscriptionDetails,
    //     qualifiedInstitutions: req.body.qualifiedInstitutions,
    //     nonInstitutionalBuyers: req.body.nonInstitutionalBuyers,
    //     bNII: req.body.bNII,
    //     sNII: req.body.sNII,
    //     retailInvestors: req.body.retailInvestors,
    //     employees: req.body.employees,
    //     others: req.body.others,
    //     total: req.body.total,

    //     IPOStatus: req.body.IPOStatus,

    //     ipoOpenDate: req.body.ipoOpenDate,
    //     IPOCloseDate: req.body.IPOCloseDate,
    //     IPOAllotmentDate: req.body.IPOAllotmentDate,
    //     IPORefundsInitiation: req.body.IPORefundsInitiation,
    //     IPODematTransfer: req.body.IPODematTransfer,
    //     IPOListingDate: req.body.IPOListingDate || "",

    //     listingDate: req.body.listingDate,
    //     listingPrice: req.body.listingPrice,
    //     listingPosition: req.body.listingPosition,
    //     listingDifferent: req.body.listingDifferent,
    //     NSECode: req.body.NSECode,
    //     BSEScript: req.body.BSEScript,
    //     closingDate: req.body.closingDate,
    //     closingPrice: req.body.closingPrice,
    //     scriptPosition: req.body.scriptPosition,
    //     closingDifferent: req.body.closingDifferent,
    //     weekHigh: req.body.weekHigh,
    //     weekLow: req.body.weekLow,
    //     createdAt: new Date(),
    //     file: file,
    //   };

    //   if (GeneralIPO) {
    //     await userInformation.add(GeneralIPO);
    //     //  ({ ignoreUndefinedProperties: true })
    //     res.status(200).send({
    //       msg: "MainLineIPO Created Successfully",
    //       data: GeneralIPO,
    //     });
    //   } else {
    //     res.status(300).send({ msg: "MainLineIpo Not Found" });
    //   }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "user Not Found" });
  }
};

/* 
Get All SmeIPO List 
**/

const GetAllSmeIpo = async (req, res) => {
  try {
    const GetIpo = await SmeIPO.select(
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
    ).get();
    if (GetIpo) {
      const SmeIpo = GetIpo.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(data);
      // const companyName = req.body.companyName;
      // if (namr) {
      //   const MainLineIpo2 = companyName.docs.map((doc) => ({
      //     namr: doc.companyName,
      //     ...doc.data(),
      //   }));
      //   console.log(MainLineIpo2);
      // }
      res
        .status(200)
        .send({ msg: "All SmeIpo Get Successfully", data: SmeIpo });
    } else {
      res.status(300).send({ msg: "SmeIpo Not Found" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

const GetIdBySmeIpo = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await SmeIPO.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          //SmeIPO Genral
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
          const offerForSale = Data.offerForSale;
          const lotSize = Data.lotSize;
          //SmeIPO Financial
          const earningPerShare = Data.earningPerShare;
          const peersComparison = Data.peersComparison;
          const financialLotsize = Data.financialLotsize;
          const returnonNetWorth = Data.returnonNetWorth;
          const companyFinancials = Data.companyFinancials;
          const netAssetValue = Data.netAssetValue;
          const earningPERatio = Data.earningPERatio;
          //SmeIPO Subscription
          const sNII = Data.sNII;
          const others = Data.others;
          const total = Data.total;
          const subscriptionDetails = Data.subscriptionDetails;
          const retailInvestors = Data.retailInvestors;
          const qualifiedInstitutions = Data.qualifiedInstitutions;
          const employees = Data.employees;
          const bNII = Data.bNII;
          const nonInstitutionalBuyers = Data.nonInstitutionalBuyers;
          //SmeIPO ListingInfo
          const scriptPosition = Data.scriptPosition;
          const closingDifferent = Data.closingDifferent;
          const listingDifferent = Data.listingDifferent;
          const BSEScript = Data.BSEScript;
          const closingPrice = Data.closingPrice;
          const ListingPrice = Data.ListingPrice;
          const listingPosition = Data.listingPosition;
          const weekLow = Data.weekLow;
          const NSECode = Data.NSECode;
          const closingDate = Data.closingDate;
          const listingDate = Data.listingDate;
          const weekHigh = Data.weekHigh;

          //SmeIPO CompanyRegisterInfo
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
          //Tentative Timetable
          const IPOOpenDate = Data.IPOOpenDate;
          const IPOCloseDate = Data.IPOCloseDate;
          const IPOAllotmentDate = Data.IPOAllotmentDate;
          const IPORefundsInitiation = Data.IPORefundsInitiation;
          const IPODematTransfer = Data.IPODematTransfer;
          const IPOListingDate = Data.IPOListingDate;

          const file = Data.file;
          usersArray.push(doc.data());
          // const company = { File, companyName };
          // const address1 = { address };
          const TentativeTimetable = {
            IPOOpenDate,
            IPOCloseDate,
            IPOAllotmentDate,
            IPORefundsInitiation,
            IPODematTransfer,
            IPOListingDate,
          };
          const IPOStatus = {
            IPOstatus,
          };
          const general = {
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
          };
          const Financials = {
            earningPerShare,
            peersComparison,
            financialLotsize,
            returnonNetWorth,
            companyFinancials,
            netAssetValue,
            earningPERatio,
          };
          const subscription = {
            sNII,
            others,
            total,
            subscriptionDetails,
            retailInvestors,
            qualifiedInstitutions,
            employees,
            bNII,
            nonInstitutionalBuyers,
          };
          const companyRegisterInfo = {
            registerPhone,
            address,
            registerEmail,
            registerName,
            companyPhone,
            email,
            registerWebsite,
            allotmentLink,
            website,
          };
          const CompanyRegisterInfo = { companyRegisterInfo };
          const Subscription = { subscription };
          const financials = { Financials };
          const listingInfo = {
            scriptPosition,
            closingDifferent,
            listingDifferent,
            BSEScript,
            closingPrice,
            ListingPrice,
            listingPosition,
            weekLow,
            NSECode,
            closingDate,
            listingDate,
            weekHigh,
          };
          const ListingInfo = { listingInfo };
          const General = {
            id,
            general,
            CompanyRegisterInfo,
            financials,
            Subscription,
            ListingInfo,
            IPOStatus,
            TentativeTimetable,
            file,
          };
          res.status(200).send({
            msg: "SmeIPO All Data Get Successfully",
            Data: General,
          });
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
Update SmeIpo
**/
const UpdateSmeIpo = async (req, res) => {
  try {
    const id = req.params.id;
    delete req.params.id;
    const GetIpo = SmeIPO.doc(id);

    const GetData = await GetIpo.get();
    const data = req.body;
    if (GetData.exists) {
      await SmeIPO.doc(id).update(data, { new: true });
      res.status(200).send({ msg: "SmeIpo updated Successfully", data: data });
    } else {
      res.status(300).send({ msg: "UserId Not Found" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};
/* 
Delete SmeIpo
**/
const DeleteSmeIpo = async (req, res) => {
  try {
    const id = req.params.id;
    const GetIpo = await SmeIPO.doc(id);
    const GetData = await GetIpo.get();
    if (GetData.exists) {
      await SmeIPO.doc(id).delete();
      res.status(200).send({ msg: "SmeIPO Deleted Successfully" });
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
    const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
    const fileName = name + path.extname(req.file.originalname);
    await webApp.locals.bucket
      .file(fileName)
      .createWriteStream()
      .end(req.file.buffer);
    const id = req.params.id;
    const GetIpo = SmeIPO.doc(id);
    const GetData = await GetIpo.get();
    const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
    if (GetData) {
      await SmeIPO.doc(id).update({ file: file });
      res.status(200).send({ msg: "Image Uploaded Successfully", file: file });
    } else {
      res.status(300).send({ msg: "User Not Found" });
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
    const data = await SmeIPO.get().then((snapshot) => {
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
    const GetIpo = SmeIPO.doc(id);
    const GetData = await GetIpo.get();
    const Status = req.body;
    if (GetData.exists) {
      await SmeIPO.doc(id).update(Status, { new: true });
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
  createSmeIPO,
  GetAllSmeIpo,
  UpdateSmeIpo,
  DeleteSmeIpo,
  GetIdBySmeIpo,
  uploadImage,
  GetImage,
  updateStatus,
  Pagination,
};
