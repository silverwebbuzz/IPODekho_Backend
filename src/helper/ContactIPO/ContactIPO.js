const { firestore } = require("../../config/firestoreCloud");
const Contact = firestore.collection("Contact Us");

/* 
Get Contact Us IPO
**/
const getAllContact = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    let page = req.query.page || 1;
    const keyword = req.body.keyword;
    if (req.body.keyword) {
      const email = await Contact
        // .orderBy("companyName", "asc")
        .where("email", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo = email.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const FirstName = await Contact.where("firstName", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo2 = FirstName.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const LastName = await Contact.where("lastName", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo3 = LastName.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const Phone = await Contact.where("phone", "==", keyword)
        .offset(Number(page - 1) * limit)
        .limit(Number(limit))
        .get();
      const SearchIpo4 = Phone.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (SearchIpo.length > 0) {
        res.status(200).send({ msg: "Search Contact Us", data: SearchIpo });
      } else if (SearchIpo2.length > 0) {
        res.status(200).send({ msg: "Search Contact Us", data: SearchIpo2 });
      } else if (SearchIpo3.length > 0) {
        res.status(200).send({ msg: "Search Contact Us", data: SearchIpo3 });
      } else if (SearchIpo4.length > 0) {
        res.status(200).send({ msg: "Search Contact Us", data: SearchIpo4 });
      } else {
        res.status(200).send({ msg: "Not Keyword Found" });
      }

      /*
  Filter Data For IPO
  **/
    } else {
      const GetContact = await Contact.select(
        "email",
        "firstName",
        "lastName",
        "message",
        "phone",
        "subject",
        "createdAt"
      );
      if (GetContact) {
        GetContact.offset(Number(page - 1) * limit)
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
            const AllContact = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            Contact.get().then((querySnapshot) => {
              let Total = querySnapshot.size;
              // console.log(TotalUsers);
              const Merged = { AllContact, Total };
              res
                .status(200)
                .send({ msg: "All Contact Us Get Successfully", data: Merged });
            });
          });
      } else {
        res.status(200).send({ msg: "! Not Get Contact", data: Merged });
      }
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

module.exports = {
  getAllContact,
};
