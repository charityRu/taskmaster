// modules/dashboard.js
// controller that drives dashboard sidebar + dynamic component loading

// read current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// show name/email if present in DOM
function showUserInfo() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
    return false;
  }
  const nameEl = document.getElementById("userName");
  const emailEl = document.getElementById("userEmail");
  if (nameEl) nameEl.textContent = user.fullName || user.email || "User";
  if (emailEl) emailEl.textContent = user.email || "";
  return true;
}

// Load a component file (components/<page>.html) into #page-content
async function loadComponent(page) {
  const container = document.getElementById("page-content");
  if (!container) return;

  // dashboard is a special built-in screen (we don't have components/dashboard.html)
  if (page === "dashboard") {
    container.innerHTML = `
      <h2>Dashboard</h2>
      <section class="stats-grid">
        <div class="stat-card">
          <h3>Active Tasks</h3><p class="value" id="stat-active">0</p><small>0 completed</small>
        </div>
        <div class="stat-card">
          <h3>Total Expenses</h3><p class="value" id="stat-expenses">$0.00</p><small>This period</small>
        </div>
        <div class="stat-card">
          <h3>Total Notes</h3><p class="value" id="stat-notes">0</p><small>Saved notes</small>
        </div>
        <div class="stat-card">
          <h3>Completion Rate</h3><p class="value" id="stat-rate">0%</p><small>Task completion</small>
        </div>
      </section>
    `;
    // No module import required for built-in dashboard (we'll update stats from tasks)
    return;
  }

  try {
    const res = await fetch(`./components/${page}.html`);
    if (!res.ok) {
      container.innerHTML = `<p>Could not load ${page}</p>`;
      return;
    }
    const html = await res.text();
    container.innerHTML = html;

    // Try to import a module for this page, if it exists
    // convention: modules/<page>-page.js
    try {
      await import(`./${page}-page.js`); // this resolves relative to modules folder if this file executed from modules
    } catch (err) {
      // try different relative path (if this module is inside modules folder already)
      try {
        await import(`./modules/${page}-page.js`);
      } catch (e) {
        // If no module present that's fine — component may be static
        // console.info(`No module for ${page}:`, e);
      }
    }
  } catch (err) {
    container.innerHTML = `<p>Error loading ${page}</p>`;
  }
}

// Initialize sidebar clicks
function initNavigation() {
  const sidebarItems = document.querySelectorAll(".menu li");
  sidebarItems.forEach(item => {
    item.addEventListener("click", async () => {
      document.querySelector(".menu li.active")?.classList.remove("active");
      item.classList.add("active");
      const page = item.getAttribute("data-page");
      await loadComponent(page);
    });
  });
}

// Logout
function initLogout() {
  const btn = document.getElementById("logoutBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });
}

// update simple dashboard stats from localStorage
function updateDashboardStats() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const activeEl = document.getElementById("stat-active");
  const notesEl = document.getElementById("stat-notes");
  const expEl = document.getElementById("stat-expenses");
  const rateEl = document.getElementById("stat-rate");

  if (activeEl) activeEl.textContent = tasks.length;
  if (notesEl) notesEl.textContent = notes.length;
  if (expEl) expEl.textContent = "R" + (expenses.reduce((a,b)=>a+b,0) || 0).toFixed(2);
  if (rateEl) {
    const completed = tasks.filter(t => t.completed).length;
    const rate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
    rateEl.textContent = rate + "%";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!showUserInfo()) return;
  initNavigation();
  initLogout();
  await loadComponent("dashboard");
  updateDashboardStats();

  // update stats periodically when other pages change storage (simple)
  window.addEventListener("storage", () => {
    updateDashboardStats();
  });
});
