import { saveUser, login } from "./modules/auth.js";
import { loadLogin, loadSignup, activateSwitchTabs } from "./modules/tabs.js";



document.addEventListener("DOMContentLoaded", () => {
  loadLogin();          // load initial form
  activateSwitchTabs(); // enable tab toggle
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

    // Save user
    saveUser({ fullName, email, password });

    // Auto login user
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ fullName, email, password })
    );

    // Redirect
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
      // Store authenticated user so dashboard can detect it
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("currentUser", JSON.stringify(user));

      window.location.href = "dashboard.html";
    } else {
      alert("Incorrect email or password");
    }
  }
});

// Tab s
document.addEventListener("click", (e) => {
  if (e.target.matches("#goToSignup")) loadSignup();
  if (e.target.matches("#goToLogin")) loadLogin();
});
