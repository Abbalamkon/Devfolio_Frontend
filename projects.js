// Projects Module

// Fetch all projects
async function fetchProjects() {
  try {
    const response = await API.getAllProjects();
    STATE.allProjects = response.data;
    renderProjects(STATE.allProjects);
  } catch (error) {
    console.error("Failed to load projects:", error);
    document.getElementById("projectsContainer").innerHTML =
      '<div class="loading">Failed to load projects. Please try again.</div>';
  }
}

// Render projects in the feed
function renderProjects(projects) {
  const container = document.getElementById("projectsContainer");

  if (projects.length === 0) {
    container.innerHTML =
      '<div class="loading">No projects yet. Be the first to share your work!</div>';
    return;
  }

  container.innerHTML = projects
    .map(
      (p) => `
    <div class="project-card">
      <div class="project-card-header">
        <img src="${p.author.avatar_url || CONFIG.DEFAULT_AVATAR}" 
             alt="${p.author.name}" 
             class="project-card-avatar" 
             onclick="viewProfile('${p.author.username}')" />
        <div>
          <div class="project-card-author-name" 
               onclick="viewProfile('${p.author.username}')">
            ${p.author.name}
          </div>
          <div class="project-card-author-username">@${p.author.username}</div>
        </div>
      </div>
      <h2 class="project-card-title">${escapeHtml(p.title)}</h2>
      <p class="project-card-description">${escapeHtml(p.description)}</p>
      ${
        p.image_url
          ? `<img src="${p.image_url}" alt="${p.title}" style="width: 100%; border-radius: 12px; margin: 12px 0;">`
          : ""
      }
      <div class="project-links">
        ${
          p.demo_url
            ? `<a href="${p.demo_url}" class="project-link" target="_blank" rel="noopener">🔗 Demo</a>`
            : ""
        }
        ${
          p.github_url
            ? `<a href="${p.github_url}" class="project-link" target="_blank" rel="noopener">💻 GitHub</a>`
            : ""
        }
        ${
          p.author.username !== STATE.currentUser.username
            ? `<a href="#" class="project-link" onclick="openMessageModal('${
                p.author.id
              }', '${escapeHtml(
                p.author.name
              )}'); return false;">✉️ Message</a>`
            : `<a href="#" class="project-link" onclick="editProject('${p.id}'); return false;">✏️ Edit</a>`
        }
      </div>
    </div>
  `
    )
    .join("");
}

// Add project form handler
document
  .getElementById("addProjectForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectData = {
      title: formData.get("title"),
      description: formData.get("description"),
      demo_url: formData.get("demo_url") || null,
      github_url: formData.get("github_url") || null,
    };

    try {
      await API.createProject(projectData);
      showSuccess("Project added successfully!");
      closeModal("addProjectModal");
      e.target.reset();
      await fetchProjects();
    } catch (error) {
      alert("Failed to add project: " + error.message);
    }
  });

// Edit project function (placeholder)
async function editProject(projectId) {
  // TODO: Implement edit project functionality
  alert("Edit project feature - coming soon!");
}

// Delete project function
async function deleteProject(projectId) {
  if (!confirm("Are you sure you want to delete this project?")) {
    return;
  }

  try {
    await API.deleteProject(projectId);
    showSuccess("Project deleted successfully!");
    await fetchProjects();
  } catch (error) {
    alert("Failed to delete project: " + error.message);
  }
}
