// auth.js

export function saveUser(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
}

export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function login(email, password) {
    const user = getUser();

    if (!user) return false;
    if (user.email !== email) return false;
    if (user.password !== password) return false;

    return true;
}
