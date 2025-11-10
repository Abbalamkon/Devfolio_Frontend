// Portfolio Module

// Fetch my portfolio
async function fetchMyPortfolio() {
  try {
    const response = await API.getMyPortfolio();
    const portfolio = response.data;
    renderMyPortfolio(portfolio);
  } catch (error) {
    console.error("Failed to load portfolio:", error);
    document.getElementById("portfolio-content-wrapper").innerHTML =
      '<div class="loading">Failed to load portfolio</div>';
  }
}

// Render my portfolio
function renderMyPortfolio(portfolio) {
  const formatText = (text) =>
    text ? escapeHtml(text).replace(/\n/g, "<br>") : "Not provided";
  const featured = portfolio.projects.filter((p) => p.is_featured);

  document.getElementById("portfolio-content-wrapper").innerHTML = `
    <div class="portfolio-section">
      <h2>Professional Summary</h2>
      <p class="portfolio-summary">${formatText(portfolio.summary)}</p>
    </div>
    <div class="portfolio-section">
      <h2>Skills</h2>
      <div class="skills-grid">
        ${
          (portfolio.skills || [])
            .filter((s) => s)
            .map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`)
            .join("") || "<p>No skills added yet</p>"
        }
      </div>
    </div>
    <div class="portfolio-section">
      <h2>Work Experience</h2>
      <div class="credential-item">${formatText(portfolio.experience)}</div>
    </div>
    <div class="portfolio-section">
      <h2>Education</h2>
      <div class="credential-item">${formatText(portfolio.education)}</div>
    </div>
    <div class="portfolio-section">
      <h2>Featured Projects</h2>
      <div class="featured-projects-grid">
        ${
          featured.length > 0
            ? featured
                .map(
                  (p) => `
            <div class="project-card">
              <h2 class="project-card-title">${escapeHtml(p.title)}</h2>
              <p class="project-card-description">${escapeHtml(
                p.description
              )}</p>
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
            </div>
          `
                )
                .join("")
            : "<p>No featured projects yet. Add some projects and feature them!</p>"
        }
      </div>
    </div>
  `;
}

// Open edit portfolio modal
async function openEditPortfolioModal() {
  try {
    const response = await API.getMyPortfolio();
    const portfolio = response.data;

    const form = document.getElementById("editPortfolioForm");
    form.querySelector('[name="summary"]').value = portfolio.summary || "";
    form.querySelector('[name="experience"]').value =
      portfolio.experience || "";
    form.querySelector('[name="education"]').value = portfolio.education || "";
    form.querySelector('[name="skills"]').value = (portfolio.skills || [])
      .filter((s) => s)
      .join(", ");

    const projectList = document.getElementById("portfolioProjectList");
    if (portfolio.projects.length === 0) {
      projectList.innerHTML =
        '<p style="color: var(--text-secondary);">No projects yet. Create some projects first!</p>';
    } else {
      projectList.innerHTML = portfolio.projects
        .map(
          (p) => `
        <label>
          <input type="checkbox" name="featured_projects" value="${p.id}" ${
            p.is_featured ? "checked" : ""
          }>
          ${escapeHtml(p.title)}
        </label>
      `
        )
        .join("");
    }

    openModal("editPortfolioModal");
  } catch (error) {
    alert("Failed to load portfolio data: " + error.message);
  }
}

// Save portfolio form handler
document
  .getElementById("editPortfolioForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const skillsInput = formData.get("skills");
    const skills = skillsInput
      ? skillsInput
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s)
      : [];

    const portfolioData = {
      summary: formData.get("summary"),
      experience: formData.get("experience"),
      education: formData.get("education"),
      skills: skills,
      featured_projects: Array.from(formData.getAll("featured_projects")),
    };

    try {
      await API.updatePortfolio(portfolioData);
      showSuccess("Portfolio updated successfully!");
      closeModal("editPortfolioModal");
      await fetchMyPortfolio();
    } catch (error) {
      alert("Failed to update portfolio: " + error.message);
    }
  });
