import { saveUser, login } from "./modules/auth.js";
import { loadLogin, loadSignup, loadDashboard } from "./modules/tabs.js";

document.addEventListener("DOMContentLoaded", () => {
    loadLogin(); // Show login first
});

// Listen for form submissions inside components
document.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;

    // SIGNUP
    if (form.id === "signupForm") {
        const fullName = document.getElementById("signupFullName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        saveUser({ fullName, email, password });

        loadDashboard(); // Redirect to dashboard component
    }

    // LOGIN
    if (form.id === "loginForm") {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const success = login(email, password);

        if (success) {
            loadDashboard(); // Redirect to dashboard component
        } else {
            alert("Incorrect email or password");
        }
    }
});
