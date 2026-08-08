import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

async function simulateRegistration() {
  try {
    console.log("Simulating a student registration...");
    
    // We mock a payment screenshot using a placeholder image
    const mockScreenshotUrl = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

    const docRef = await addDoc(collection(db, "pending_registrations"), {
      studentName: "Antigravity AI (Test User)",
      phoneNumber: "9876543210",
      email: "antigravity.ai@manipal.edu",
      transactionRef: "SIMULATED_UTR_9988776655",
      amount: "₹6.69",
      screenshotUrl: mockScreenshotUrl,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    console.log("Successfully registered! Document ID:", docRef.id);
  } catch (error) {
    console.error("Error during simulated registration:", error);
  }
  process.exit(0);
}

simulateRegistration();
