// Authentication Module

// Initialize auth on page load
window.addEventListener("DOMContentLoaded", async () => {
  if (STATE.authToken) {
    try {
      await loadCurrentUser();
      showMainApp();
    } catch (error) {
      console.error("Auto-login failed:", error);
      logout();
    }
  } else {
    document.getElementById("loginPage").classList.remove("hidden");
  }
});

// Show login page
function showLogin() {
  document.getElementById("loginPage").classList.remove("hidden");
  document.getElementById("registerPage").classList.add("hidden");
}

// Show register page
function showRegister() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.remove("hidden");
}

// Login form handler
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await API.login(credentials.email, credentials.password);
    setAuthToken(response.data.token);
    STATE.currentUser = response.data.user;
    showMainApp();
  } catch (error) {
    showError(
      "loginError",
      error.message || "Login failed. Please check your credentials."
    );
  }
});

// Register form handler
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await API.register(userData);
      setAuthToken(response.data.token);
      STATE.currentUser = response.data.user;
      showMainApp();
    } catch (error) {
      showError(
        "registerError",
        error.message || "Registration failed. Please try again."
      );
    }
  });

// Load current user data
async function loadCurrentUser() {
  const response = await API.getCurrentUser();
  STATE.currentUser = response.data;
  return STATE.currentUser;
}

// Show main app after successful auth
async function showMainApp() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");

  await loadApp();
}

// Logout function
function logout() {
  setAuthToken(null);
  STATE.currentUser = null;
  STATE.allProjects = [];
  document.getElementById("mainApp").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}
