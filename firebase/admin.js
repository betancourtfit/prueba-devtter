var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");
try{
    !admin.apps.length && admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
}catch(e){
    console.log(e)
}

export const firestores = admin.firestore();