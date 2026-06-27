import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCC6tvytUGZSqEkXXkSzAympvLzvoL1aMM",
  authDomain: "freakquency-db802.firebaseapp.com",
  projectId: "freakquency-db802",
  storageBucket: "freakquency-db802.firebasestorage.app",
  messagingSenderId: "943044186550",
  appId: "1:943044186550:web:6f7ef799bc336f3fd1b117",
  measurementId: "G-JY4CM7X5LR"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
