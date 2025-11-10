// UI Utility Functions

// Show error message
function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
    el.classList.remove("hidden");
    setTimeout(() => el.classList.add("hidden"), 5000);
  }
}

// Show success message
function showSuccess(message) {
  // Create a temporary success notification
  const notification = document.createElement("div");
  notification.className = "success-message";
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.zIndex = "10000";
  notification.style.maxWidth = "400px";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Page navigation
function showPage(pageId) {
  // Hide all pages
  ["myPortfolioPage", "projectsPage", "profilePage", "messagesPage"].forEach(
    (p) => document.getElementById(p).classList.add("hidden")
  );

  // Show selected page
  document.getElementById(`${pageId}Page`).classList.remove("hidden");

  // Update nav active state
  ["nav-myPortfolio", "nav-profile", "nav-projects", "nav-messages"].forEach(
    (n) => document.getElementById(n).classList.remove("active")
  );
  document.getElementById(`nav-${pageId}`).classList.add("active");

  // Load page-specific data
  if (pageId === "messages") {
    loadConversations();
  } else if (pageId === "myPortfolio") {
    fetchMyPortfolio();
  } else if (pageId === "projects") {
    fetchProjects();
  }
}

// Load sidebar profile info
function loadSidebarProfile() {
  if (!STATE.currentUser) return;

  document.getElementById("sidebarName").textContent = STATE.currentUser.name;
  document.getElementById(
    "sidebarUsername"
  ).textContent = `@${STATE.currentUser.username}`;
  document.getElementById("sidebarAvatar").src =
    STATE.currentUser.avatar_url || CONFIG.DEFAULT_AVATAR;
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active");
  }
});

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return date.toLocaleDateString();
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return "Just now";
  }
}

// Loading indicator
function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '<div class="loading">Loading...</div>';
  }
}

// Handle image upload preview (for future use)
function previewImage(input, previewId) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.getElementById(previewId);
      if (preview) {
        preview.src = e.target.result;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}
