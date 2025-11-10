// Main Application Initialization

// Load app after successful authentication
async function loadApp() {
  try {
    // Load current user data
    if (!STATE.currentUser) {
      await loadCurrentUser();
    }

    // Load sidebar profile
    loadSidebarProfile();

    // Fetch initial projects
    await fetchProjects();

    // Fetch portfolio
    await fetchMyPortfolio();

    // Show projects page by default
    showPage("projects");

    console.log("✅ App loaded successfully");
  } catch (error) {
    console.error("Failed to load app:", error);
    alert("Failed to load application data. Please try refreshing the page.");
  }
}

// Check for authentication errors and redirect to login
function handleAuthError(error) {
  if (error.message && error.message.includes("auth")) {
    console.error("Authentication error:", error);
    logout();
  }
}

// Global error handler
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  handleAuthError(event.error);
});

// Unhandled promise rejection handler
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  handleAuthError(event.reason);
});

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Escape key closes modals
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      modal.classList.remove("active");
    });
  }
});

// Console message
console.log(
  "%cDevFolio",
  "font-size: 32px; font-weight: bold; color: #4299e1;"
);
console.log(
  "%cDeveloper Portfolio Platform",
  "font-size: 16px; color: #718096;"
);
console.log(
  "%c\n🚀 Connected to API: " + CONFIG.API_URL,
  "font-size: 14px; color: #48bb78;"
);

// Development helpers (can be removed in production)
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  console.log(
    "%c\n🔧 Development Mode Active",
    "font-size: 14px; color: #ed8936;"
  );

  // Expose useful functions for debugging
  window.devFolio = {
    state: STATE,
    api: API,
    config: CONFIG,
    logout: logout,
    getToken: getAuthToken,
    getCurrentUser: () => STATE.currentUser,
  };

  console.log(
    "%cDebug tools available at window.devFolio",
    "font-size: 12px; color: #718096;"
  );
}
