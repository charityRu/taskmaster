// modules/tabs.js (minimal)
export async function loadComponent(file) {
  const container = document.getElementById("form-container");
  const response = await fetch(`./components/${file}`);
  const html = await response.text();
  container.innerHTML = html;
  activateSwitchTabs(); 
}

export function loadLogin() {
  loadComponent("login.html");
}
export function loadSignup() {
  loadComponent("signup.html");
}

// optional helper
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
