// API Request Handler
async function apiRequest(endpoint, options = {}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(STATE.authToken && { Authorization: `Bearer ${STATE.authToken}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(`${CONFIG.API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// API Service Methods
const API = {
  // Auth
  async login(email, password) {
    return await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async register(userData) {
    return await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  async getCurrentUser() {
    return await apiRequest("/auth/me");
  },

  // Users
  async getUserByUsername(username) {
    return await apiRequest(`/users/${username}`);
  },

  async updateProfile(profileData) {
    return await apiRequest("/users/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },

  async updateSkills(skills) {
    return await apiRequest("/users/skills", {
      method: "PUT",
      body: JSON.stringify({ skills }),
    });
  },

  async updateSocials(socials) {
    return await apiRequest("/users/socials", {
      method: "PUT",
      body: JSON.stringify(socials),
    });
  },

  // Projects
  async getAllProjects() {
    return await apiRequest("/projects");
  },

  async getProjectById(id) {
    return await apiRequest(`/projects/${id}`);
  },

  async createProject(projectData) {
    return await apiRequest("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    });
  },

  async updateProject(id, projectData) {
    return await apiRequest(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    });
  },

  async deleteProject(id) {
    return await apiRequest(`/projects/${id}`, {
      method: "DELETE",
    });
  },

  // Portfolios
  async getPortfolioByUsername(username) {
    return await apiRequest(`/portfolios/${username}`);
  },

  async getMyPortfolio() {
    return await apiRequest("/portfolios/me/details");
  },

  async updatePortfolio(portfolioData) {
    return await apiRequest("/portfolios", {
      method: "PUT",
      body: JSON.stringify(portfolioData),
    });
  },

  async toggleFeaturedProject(projectId) {
    return await apiRequest(`/portfolios/featured/${projectId}`, {
      method: "POST",
    });
  },

  // Messages
  async getConversations() {
    return await apiRequest("/messages/conversations");
  },

  async getMessages(userId) {
    return await apiRequest(`/messages/${userId}`);
  },

  async sendMessage(recipientId, message) {
    return await apiRequest("/messages", {
      method: "POST",
      body: JSON.stringify({ recipient_id: recipientId, message }),
    });
  },

  async getUnreadCount() {
    return await apiRequest("/messages/unread/count");
  },
};
