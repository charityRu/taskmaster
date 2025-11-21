// Load HTML components into the main page
export async function loadComponent(file) {
    const container = document.getElementById("form-container");

    const response = await fetch(`./components/${file}`);
    const html = await response.text();

    container.innerHTML = html;

    // After loading the component, re-activate the buttons inside it
    activateSwitchTabs();
}

// Load LOGIN component
export function loadLogin() {
    loadComponent("login.html");
}

// Load SIGNUP component
export function loadSignup() {
    loadComponent("signup.html");
}

// Detect clicks inside the form (switching tabs)
function activateSwitchTabs() {
    const switchButtons = document.querySelectorAll(".switch-tab");

    switchButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.tab;

            if (tab === "login") loadLogin();
            if (tab === "signup") loadSignup();
        });
    });
}
export function loadDashboard() {
    loadComponent("dashboard.html");
}
