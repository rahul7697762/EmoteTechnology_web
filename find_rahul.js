const admin = require('firebase-admin');

// Ensure we don't initialize multiple times
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    })
  });
}

const db = admin.firestore();

async function findRahul() {
  const snapshot = await db.collection('users').get();
  const users = snapshot.docs.map(doc => doc.data());
  const rahuls = users.filter(u => u.name && u.name.toLowerCase().includes('rahul'));
  
  if (rahuls.length === 0) {
    console.log("No user found with the name Rahul.");
  } else {
    console.log("Found the following users matching 'Rahul':");
    rahuls.forEach(r => console.log(`- ${r.name} (Email: ${r.email}, ID: ${r.id})`));
  }
}

findRahul();
