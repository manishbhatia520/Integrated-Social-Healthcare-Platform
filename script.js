// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChfCRUO...",
  authDomain: "manish-ec8dd.firebaseapp.com",
  databaseURL: "https://manish-ec8dd-default-rtdb.firebaseio.com",
  projectId: "manish-ec8dd",
  storageBucket: "manish-ec8dd.appspot.com",
  messagingSenderId: "873325715997",
  appId: "1:873325715997:web:63fbf4c65d49f81bd41cf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// Register Patient
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("regName").value;
  const phone = document.getElementById("regPhone").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const age = document.getElementById("regAge").value;
  const bloodGroup = document.getElementById("regBloodGroup").value;
  const address = document.getElementById("regAddress").value;
  const medicalConditions = document.getElementById("regMedicalConditions").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = ref(database, "patients/" + user.uid);
      set(userRef, {
        name,
        phone,
        email,
        age,
        bloodGroup,
        address,
        medicalConditions,
      });
      alert("Registration Successful!");
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Login Patient
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginPhone").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login Successful!");
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Quick Emergency Submission
const quickEmergencyForm = document.getElementById("quickEmergencyForm");
quickEmergencyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const condition = document.getElementById("condition").value;
  const location = document.getElementById("location").value;
  
  const emergencyRef = push(ref(database, "emergencies"));
  set(emergencyRef, {
    name,
    phone,
    condition,
    location,
    timestamp: new Date().toISOString()
  });

  alert("Emergency alert sent to hospitals!");
});
