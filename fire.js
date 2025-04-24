// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-EcSWge67MUXbZKehwdNxO2QGWUFATvo",
  authDomain: "ciniverse-dd5a3.firebaseapp.com",
  databaseURL: "https://ciniverse-dd5a3-default-rtdb.firebaseio.com",
  projectId: "ciniverse-dd5a3",
  storageBucket: "ciniverse-dd5a3.firebasestorage.app",
  messagingSenderId: "1082908216807",
  appId: "1:1082908216807:web:39c4b52cb065b1a76e8142"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase database
const database = firebase.database();

// Form reference
const joinForm = document.getElementById('joinForm');
const formMessage = document.getElementById('formMessage');

joinForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const roll = document.getElementById('roll').value;
  const branch = document.getElementById('branch').value;
  const interest = document.getElementById('interest').value;

  // Save data to Firebase Realtime Database
  const newMemberRef = database.ref('members').push();
  newMemberRef.set({
    name: name,
    email: email,
    phone: phone,
    roll: roll,
    branch: branch,
    interest: interest,
    joinedAt: new Date().toISOString()
  })
  .then(() => {
    // Store the email in localStorage
    localStorage.setItem("userEmail", email);

    // Display success message
    formMessage.textContent = "🎉 You're officially part of CineVerse! We will reach you out soon!";

    // Reset form
    joinForm.reset();
    
    // Redirect to gallery page (optional)
    // window.location.href = 'gallery.html';  // Uncomment if you want to redirect after submission
  })
  .catch((error) => {
    // Display error message
    formMessage.textContent = "❌ Something went wrong. Try again!";
    console.error('Firebase Error:', error);
  });
});
