# 🧰 TaskMaster — Personal Productivity Dashboard  

TaskMaster is a lightweight productivity web application designed to help users manage tasks, notes, expenses, and personal progress — all in one UI.

---

## 🚀 Features

✔ User authentication (register + login)  
✔ Add and delete tasks  
✔ LocalStorage persistence  
✔ Sidebar navigation system  
✔ Dashboard statistics (task count, rate, notes & expenses indicators)  
✔ Modular JavaScript architecture  

---

## 🏗️ Tech Stack

- HTML  
- CSS  
- JavaScript (Modules)  
- LocalStorage API  

---

## 📌 Folder Structure

project/
│
├── components/
│ ├── tasks.html
│ ├── community.html
│ ├── notes.html
│ ├── expenses.html
│ └── settings.html
│
├── modules/
│ ├── auth.js
│ ├── dashboard.js
│ └── tasks.js
│
├── index.html
├── dashboard.html
├── style.css
└── README.md


---

## ⚙️ How It Works

### 🔐 Login System  
User credentials are stored via `localStorage.setItem("user", JSON.stringify(data))`.  
Upon login, the current session is stored separately to simulate authentication.

### 📝 Tasks Saving Logic  
Each logged-in user has task storage tied to their email — so multiple users won’t overwrite each other.

Example key format:



tasks_<user email>


---

## 📌 Usage Instructions

1. Open `index.html`
2. Register and log in
3. Navigate using sidebar menu
4. Add tasks and watch stats update automatically

---

## 👨‍💻 Developer

**Charity Mapfudza**  
Founder — *CR Tech Solutions*  
💼 Portfolio: https://charity-crtech-portfolio.vercel.app/  
🌍 Based in Rustenburg, South Africa

---

## 📌 Future Improvements

✨ Cloud Sync / Database backend  
✨ Expense analytics  
✨ Collaboration features  
✨ Mobile App Version  

---

## 📄 License

This project is for educational and development portfolio use.

