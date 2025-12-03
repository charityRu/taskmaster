// main.js
import { saveUser, login } from "./modules/auth.js";
import { loadLogin, loadSignup } from "./modules/tabs.js";

// Make sure login tab loads first when index.html opens
document.addEventListener("DOMContentLoaded", () => {
  loadLogin();
});


document.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  // SIGNUP
  if (form.id === "signupForm") {
    const fullName = document.getElementById("signupFullName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    saveUser({ fullName, email, password });

    // Redirect to dashboard page
    window.location.href = "dashboard.html";
  }

  // LOGIN
  if (form.id === "loginForm") {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Both fields are required");
      return;
    }

    const success = login(email, password);

    if (success) {
      window.location.href = "dashboard.html";
    } else {
      alert("Incorrect email or password");
    }
  }
});

// Tab Switching Controls
document.addEventListener("click", (e) => {
  if (e.target.matches("#goToSignup")) {
    loadSignup();
  }

  if (e.target.matches("#goToLogin")) {
    loadLogin();
  }
});
