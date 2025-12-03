// dashboard.js

// Load logged-in user from localStorage
function loadUser() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("userName").textContent = user.fullName;
    document.getElementById("userEmail").textContent = user.email;
}

// Switch page sections
function switchPage(page) {
    const pageContent = document.getElementById("page-content");

    switch (page) {
        case "dashboard":
            pageContent.innerHTML = `
                <h2>Dashboard</h2>
                <div class="stats">
                    <p>Active Tasks: 0</p>
                    <p>Total Expenses: $0.00</p>
                    <p>Total Notes: 0</p>
                    <p>Completion Rate: 0%</p>
                </div>
            `;
            break;

        case "tasks":
            pageContent.innerHTML = `
                <h2>Tasks</h2>
                <p>No tasks yet.</p>
            `;
            break;

        case "community":
            pageContent.innerHTML = `
                <h2>Community Board</h2>
                <p>No messages yet.</p>
            `;
            break;

        case "expenses":
            pageContent.innerHTML = `
                <h2>Expenses</h2>
                <p>No expense data yet.</p>
            `;
            break;

        case "notes":
            pageContent.innerHTML = `
                <h2>Notes</h2>
                <p>No notes yet.</p>
            `;
            break;

        case "settings":
            pageContent.innerHTML = `
                <h2>Settings</h2>
                <p>Update profile coming soon.</p>
            `;
            break;
    }
}

// Sidebar navigation event listener
function initNavigation() {
    const sidebarItems = document.querySelectorAll(".menu li");

    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".menu li.active").classList.remove("active");
            item.classList.add("active");

            const page = item.getAttribute("data-page");
            switchPage(page);
        });
    });
}

// Logout button event
function initLogout() {
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
    loadUser();
    initNavigation();
    initLogout();

    // load default page
    switchPage("dashboard");
});
document.querySelectorAll(".sidebar li").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelector(".sidebar li.active")?.classList.remove("active");
        item.classList.add("active");

        // Load UI section (Dashboard, Tasks etc)
        const selected = item.textContent.trim();

        if (selected === "Dashboard") {
            document.querySelector(".main").innerHTML = `
                <header class="topbar">
                  <h1>Hi Charity 👋</h1>
                  <button class="profile-btn">Profile</button>
                </header>

                <section class="stats">
                  <div class="card">Pending Tasks <span>12</span></div>
                  <div class="card">Completed <span>8</span></div>
                  <div class="card">Income <span>R3,000</span></div>
                  <div class="card">Users <span>52</span></div>
                </section>

                <section class="chart-box">
                  <h3>Activity Overview</h3>
                  <canvas id="chart"></canvas>
                </section>
            `;
        }

        if (selected === "Tasks") {
            document.querySelector(".main").innerHTML = `
                <header class="topbar">
                  <h1>Tasks Management</h1>
                </header>

                <section class="task-area">
                  <p>No tasks yet — add one 😊</p>
                </section>
            `;
        }
    });
});
