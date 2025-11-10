// Application Configuration
const CONFIG = {
  API_URL: "https://devfoliobackend.netlify.app/api",
  TOKEN_KEY: "authToken",
  DEFAULT_AVATAR: "https://via.placeholder.com/150",
  DEFAULT_COVER:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900",
};

// Global State
const STATE = {
  authToken: localStorage.getItem(CONFIG.TOKEN_KEY) || null,
  currentUser: null,
  allProjects: [],
  currentRecipientId: null,
};

// Set auth token
function setAuthToken(token) {
  STATE.authToken = token;
  if (token) {
    localStorage.setItem(CONFIG.TOKEN_KEY, token);
  } else {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
  }
}

// Get auth token
function getAuthToken() {
  return STATE.authToken;
}
