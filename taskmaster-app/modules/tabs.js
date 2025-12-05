// modules/tabs.js

export async function loadComponent(file) {
  const container = document.getElementById("form-container");
  const res = await fetch(`./components/${file}`);
  const html = await res.text();
  container.innerHTML = html;

  // After replacing HTML, activate the tab switching
  activateSwitchTabs();
}

// Load Login Page
export function loadLogin() {
  loadComponent("login.html");
}

// Load Signup Page
export function loadSignup() {
  loadComponent("signup.html");
}

//  attach listeners AFTER components load
export function activateSwitchTabs() {
  const tabButtons = document.querySelectorAll(".tabs button");
  const switchLinks = document.querySelectorAll(".switch-tab");

  tabButtons.forEach(btn => {
    btn.onclick = () => {
      document.querySelector(".tabs button.active")?.classList.remove("active");
      btn.classList.add("active");

      const tab = btn.dataset.tab;
      if (tab === "login") loadLogin();
      if (tab === "signup") loadSignup();
    };
  });

  switchLinks.forEach(link => {
    link.onclick = () => {
      const tab = link.dataset.tab;
      if (tab === "login") loadLogin();
      if (tab === "signup") loadSignup();
    };
  });
}
