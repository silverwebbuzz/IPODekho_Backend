const { Firestore } = require("@google-cloud/firestore");
const CREDENTIALS = require("./ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");

const firestore = new Firestore({
  projectId: CREDENTIALS.project_id,
  credentials: {
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  },
});
module.exports = { firestore };
