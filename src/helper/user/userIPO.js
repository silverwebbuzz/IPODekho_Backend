const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
const saltedMd5 = require("salted-md5");
const path = require("path");
var admin = require("firebase-admin");
/* 
UpDate Profile With Google authentication 
**/
const UpdateProfile = async (req, res, body) => {
  try {
    if (req.file) {
      const uid = req.params.id;
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      // Update the user's profile information
      admin
        .auth()
        .updateUser(uid, {
          displayName: req.body.displayName,
          photoURL: file,
          phoneNumber: req.body.phoneNumber,
        })
        .then((data) => {
          return res.status(201).send({
            msg: "Updated SuccessFully",
            data: data,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(300).send({ msg: "PhoneNumber Already Exist" });
        });
    } else if (req.file == null) {
      const uid = req.params.id;
      admin
        .auth()
        .updateUser(uid, {
          displayName: req.body.displayName,
          phoneNumber: req.body.phoneNumber,
          photoURL: null,
        })
        .then((data) => {
          return res.status(201).send({
            msg: "Updated SuccessFully",
            data: data,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(300).send({ msg: "PhoneNumber Already Exist" });
        });
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};

// /*
// Delete Profile
// **/
// const DeleteProfilePic = async (req, res, body) => {
//   try {
//     const uid = req.params.id;
//     const file = req.body.photoURL;
//     admin
//       .auth()
//       .deleteUser(uid, {
//         photoURL: file,
//       })
//       .then((data) => {
//         return res.status(201).send({
//           msg: "Deleted SuccessFully",
//           data: data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         res.status(300).send({ msg: "UserId Not Found" });
//       });
//   } catch (error) {
//     res.status(400).send({ msg: "User Not Found" });
//   }
// };
/*
Get Single Profile With Google authentication 
**/
const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    admin
      .auth()
      .getUser(id)
      .then((user) => {
        const photoURL = user.photoURL;
        const displayName = user.displayName;
        const phoneNumber = user.phoneNumber;
        const email = user.email;
        const GetSingleProfile = {
          photoURL: photoURL,
          displayName: displayName,
          phoneNumber: phoneNumber,
          email: email,
          uid: id,
        };
        return res.status(201).send({
          msg: "Get Single User SuccessFully",
          data: GetSingleProfile,
        });
      })
      .catch((error) => {
        return res.status(301).send({
          error,
        });
      });
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

/* 
Get All User With Google authentication 

**/
const getAllUser = async (req, res) => {
  try {
    const allUsers = [];
    const listUsersResult = await admin.auth().listUsers();
    listUsersResult.users.forEach((user) => {
      allUsers.push(user);
    });
    // pageToken = listUsersResult
    // const users = { uid, email, displayName, photoURL, phoneNumber };
    res.status(201).send({
      msg: "Get All User SuccessFully",
      data: allUsers,
    });

    // Process the list of users
    // allUsers.forEach((user) => {
    //   const uid = allUsers.uid;
    //   const email = allUsers.email;
    //   const displayName = allUsers.displayName;
    //   const photoURL = allUsers.photoURL;
    //   const phoneNumber = allUsers.phoneNumber;
    //   console.log(allUsers.uid, user.email);
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" }).end();
  }
};
// let { limit, page } = req.query;
// limit = parseInt(limit) || 2;
// page = page === "null" ? null : page;

//   // async function listUsers(pageSize, pageToken) {
//   //   const listUsersResult = await admin.auth().listUsers(pageSize, pageToken);
//   //   const nextPageToken = listUsersResult.pageToken;
//   //   const prevPageToken = pageToken || null; // Store the previous page token for later use
//   //   const users = listUsersResult.users;
//   //   return {
//   //     users,
//   //     nextPageToken,
//   //     prevPageToken,
//   //   };
//   // }

//   // const pageSize = 2;
//   // const firstPage = await admin.auth().listUsers(pageSize);

//   // // To retrieve the next page of users, use the nextPageToken returned from the previous call
//   // const secondPage = await admin
//   //   .auth()
//   //   .listUsers(pageSize, firstPage.pageToken);
//   // const firstPageAgain = await admin
//   //   .auth()
//   //   .listUsers(pageSize, firstPage.secondPage);
//   // const aaaa = firstPageAgain.pageToken;
//   // console.log(secondPage);
//   // res.status(200).json({
//   //   message: "Success",
//   //   users: secondPage,
//   //   aaaa,
//   // });
//   const users = page
//     ? await admin.auth().listUsers(limit, page || null)
//     : await admin.auth().listUsers(limit);
//   const nextPageToken = users.pageToken;
//   const firstPageAgain = await admin.auth().listUsers(limit, users.pageToken);
//   const prevPageToken = firstPageAgain.pageToken || null;
//   res
//     .status(200)
//     .json({
//       message: "Success",
//       users: [...users.users],
//       nextPageToken,
//       firstPageAgain,
//     })
//     .end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal Server Error" }).end();
//   }
// };
// function listAllUsers(nextPageToken) {
//   // List batch of users, 1000 at a time.
//   admin
//     .auth()
//     .listUsers(2, nextPageToken)
//     .then(function (listUsersResult) {
//       listUsersResult.users.forEach(function (userRecord) {
//         // console.log("user", userRecord.toJSON());
//       });
//       if (listUsersResult.pageToken) {
//         // List next batch of users.
//         console.log(listUsersResult.pageToken);
//         return res.send(listAllUsers(listUsersResult.pageToken));
//       }
//     })
//     .catch(function (error) {
//       console.log("Error listing users:", error);
//     });
// }
// // Start listing users from the beginning, 1000 at a time.
// listAllUsers();
// const searchUsers = async (offset, limit) => {
//   const listUsersResult = await admin.auth().listUsers(limit);
//   //   , offset.toString(), {
//   //   query: query,
//   // });
//   const users = listUsersResult.users.map((userRecord) => {
//     return {
//       uid: userRecord.uid,
//       email: userRecord.email,
//       emailVerified: userRecord.emailVerified,
//       displayName: userRecord.displayName,
//       photoURL: userRecord.photoURL,
//       disabled: userRecord.disabled,
//     };
//   });
//   const nextPageToken = listUsersResult.pageToken;
//   return {
//     users: users,
//     nextPageToken: nextPageToken,
//   };
// };
// // const keyword = req.body.keyword;
// const page = req.query.page || 2;
// const limit = req.query.limit || 2;
// const offset = Number(page) - 1 * Number(limit);
// // const value = offset.toString();s
// searchUsers(offset, limit) // Search for users whose email or display name contain 'john' and return the first 10 results
//   .then((result) => {
//     res
//       .status(201)
//       .send({ msg: "Get All User Successfully", users: result.users });
//   })
//   .catch((error) => {
//     console.log("Error searching users:", error);
//   });

// const limit = req.query.limit || 10;
// let offset = req.query.offset || 2; // initial offset
// const page = req.query.page || 1;
// const allUser = (await admin.auth().listUsers(limit)).users.get()
//   .offset(Number(page - 1) * limit)
//   .limit(Number(limit))
//   .map((doc) => ({
//     id: doc.uid,
//     email: doc.email,
//     phoneNumber: doc.phoneNumber,
//     photoURL: doc.photoURL,
//     displayName: doc.displayName,
//   }));

// res.status(201).send({ msg: "Get All User Successfully", users: allUser });

module.exports = {
  UpdateProfile,
  getAllUser,
  getSingleUser,
  // DeleteProfilePic,
};
