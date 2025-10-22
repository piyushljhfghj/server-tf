// // backend/firebaseAdmin.js
// import admin from "firebase-admin";

// const serviceAccount = {
//   type: "service_account",
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;



// --------------------------------------------



// backend/firebaseAdmin.js
import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
