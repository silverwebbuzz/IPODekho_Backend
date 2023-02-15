const { firestore } = require("../../config/firestoreCloud");
const Contact = firestore.collection("Contact Us");

/* 
Get Contact Us IPO
**/
const getAllContact = async (req, res) => {
  try {
    const GetContact = await Contact.select(
      "email",
      "firstName",
      "lastName",
      "message",
      "phone",
      "subject"
    ).get();
    if (GetContact) {
      const GetAllContact = GetContact.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).send({
        msg: "Get All Contact Successfully",
        contactList: GetAllContact,
      });
    } else {
      res.status(300).send({ msg: "Contact Not Found" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

module.exports = {
  getAllContact,
};
