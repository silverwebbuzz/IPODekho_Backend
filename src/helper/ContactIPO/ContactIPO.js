const { firestore } = require("../../config/firestoreCloud");
const Contact = firestore.collection("Contact Us");

/* 
Get Contact Us IPO
**/
const getAllContact = async (req, res) => {
  try {
    const limit = req.query.limit || 2;
    let page = req.query.page || 3;

    const GetContact = await Contact.select(
      "email",
      "firstName",
      "lastName",
      "message",
      "phone",
      "subject"
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
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

module.exports = {
  getAllContact,
};
