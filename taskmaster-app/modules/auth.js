// Save a user (you can expand later to support multiple users)
export function saveUser(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
}

// Get the saved single user
export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

// LOGIN
export function login(email, password) {
    const user = getUser();

    if (!user) return false;
    if (user.email !== email) return false;
    if (user.password !== password) return false;

    // Store authenticated user
    localStorage.setItem("currentUser", JSON.stringify(user));

    // NEW: store email for task keys
    localStorage.setItem("loggedInUser", user.email);

    return true;
}
