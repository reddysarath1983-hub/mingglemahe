import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoNEcFb7vwghr_x8BkQGOHP3Q49FiEF3M",
  authDomain: "manipal-6615f.firebaseapp.com",
  projectId: "manipal-6615f",
  storageBucket: "manipal-6615f.firebasestorage.app",
  messagingSenderId: "1096582879957",
  appId: "1:1096582879957:web:a383ea0aa24851d3a1605c",
  measurementId: "G-YT79QE1KST"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  try {
    const snapshot = await getDocs(collection(db, "pending_registrations"));
    console.log("--- Registered Users ---");
    let count = 0;
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`Name: ${data.studentName}, Phone: ${data.phoneNumber}, Status: ${data.status}`);
      count++;
    });
    console.log(`Total Registrations: ${count}`);
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
}
check();
