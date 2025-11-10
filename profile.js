// Profile Module

// View profile by username
async function viewProfile(username) {
  try {
    const response = await API.getPortfolioByUsername(username);
    const data = response.data;
    renderProfilePage(data);
    showPage("profile");
  } catch (error) {
    console.error("Failed to load profile:", error);
    alert("Failed to load profile: " + error.message);
  }
}

// View my profile
function viewMyProfile() {
  if (STATE.currentUser) {
    viewProfile(STATE.currentUser.username);
  }
}

// Render profile page
function renderProfilePage(data) {
  const formatText = (text) =>
    text ? escapeHtml(text).replace(/\n/g, "<br>") : "Not provided";
  const isOwnProfile = data.user.username === STATE.currentUser.username;

  document.getElementById("profileHeaderName").textContent = data.user.name;
  document.getElementById("profile-content-wrapper").innerHTML = `
    <div class="profile-page-content">
      <div class="profile-header">
        <div class="profile-cover" style="background-image: url('${
          data.user.cover_image_url || CONFIG.DEFAULT_COVER
        }')"></div>
        <div class="profile-info-section">
          <div class="profile-avatar-section">
            <img src="${data.user.avatar_url || CONFIG.DEFAULT_AVATAR}" 
                 alt="Profile" 
                 class="profile-avatar">
            ${
              isOwnProfile
                ? `<button class="btn btn-light" onclick="openEditProfileModal()">Edit Profile</button>`
                : `<button class="btn btn-accent" onclick="openMessageModal('${
                    data.user.id
                  }', '${escapeHtml(data.user.name)}')">Message</button>`
            }
          </div>
          <div class="profile-name">${escapeHtml(data.user.name)}</div>
          <div class="project-card-author-username">@${escapeHtml(
            data.user.username
          )}</div>
          <p style="margin-top: 12px;">${escapeHtml(data.user.bio || "")}</p>
          
          ${renderSocialLinks(data.socials)}
        </div>
      </div>

      <div class="portfolio-page-content">
        <div class="portfolio-section">
          <h2>Professional Summary</h2>
          <p class="portfolio-summary">${formatText(data.summary)}</p>
        </div>
        <div class="portfolio-section">
          <h2>Skills</h2>
          <div class="skills-grid">
            ${
              (data.skills || [])
                .filter((s) => s)
                .map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`)
                .join("") || "<p>No skills listed</p>"
            }
          </div>
        </div>
        <div class="portfolio-section">
          <h2>Work Experience</h2>
          <div class="credential-item">${formatText(data.experience)}</div>
        </div>
        <div class="portfolio-section">
          <h2>Education</h2>
          <div class="credential-item">${formatText(data.education)}</div>
        </div>
        <div class="portfolio-section">
          <h2>Featured Projects</h2>
          <div class="featured-projects-grid">
            ${
              data.featured_projects.length > 0
                ? data.featured_projects
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
                : "<p>No featured projects yet</p>"
            }
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render social links
function renderSocialLinks(socials) {
  const links = [];

  if (socials.github) {
    links.push(`<a href="${socials.github}" target="_blank" rel="noopener" class="social-link">
      <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.8c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12 24 5.373 18.627 0 12 0z"/></svg>
      <span>GitHub</span>
    </a>`);
  }

  if (socials.linkedin) {
    links.push(`<a href="${socials.linkedin}" target="_blank" rel="noopener" class="social-link">
      <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      <span>LinkedIn</span>
    </a>`);
  }

  if (socials.twitter) {
    links.push(`<a href="${socials.twitter}" target="_blank" rel="noopener" class="social-link">
      <svg viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.616 1.922 2.397 3.307 4.498 3.345-2.071 1.623-4.678 2.588-7.521 2.588-.49 0-.974-.03-1.451-.086 2.665 1.712 5.83 2.713 9.248 2.713 8.16 0 12.613-6.673 12.3-13.34 1.021-.734 1.886-1.65 2.583-2.686z"/></svg>
      <span>Twitter</span>
    </a>`);
  }

  if (socials.website) {
    links.push(`<a href="${socials.website}" target="_blank" rel="noopener" class="social-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      <span>Website</span>
    </a>`);
  }

  return links.length > 0
    ? `
    <div class="portfolio-section">
      <h2>Contact & Social Media</h2>
      <div class="social-links">
        ${links.join("")}
      </div>
    </div>
  `
    : "";
}

// Open edit profile modal
async function openEditProfileModal() {
  await loadCurrentUser(); // Refresh current user data

  const form = document.getElementById("editProfileForm");
  form.querySelector('[name="name"]').value = STATE.currentUser.name || "";
  form.querySelector('[name="bio"]').value = STATE.currentUser.bio || "";
  form.querySelector('[name="avatar_url"]').value =
    STATE.currentUser.avatar_url || "";
  form.querySelector('[name="cover_image_url"]').value =
    STATE.currentUser.cover_image_url || "";
  form.querySelector('[name="email"]').value = STATE.currentUser.email || "";
  form.querySelector('[name="github"]').value =
    STATE.currentUser.socials?.github || "";
  form.querySelector('[name="linkedin"]').value =
    STATE.currentUser.socials?.linkedin || "";
  form.querySelector('[name="twitter"]').value =
    STATE.currentUser.socials?.twitter || "";

  openModal("editProfileModal");
}

// Save profile form handler
document
  .getElementById("editProfileForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      // Update profile
      const profileData = {
        name: formData.get("name"),
        bio: formData.get("bio"),
        avatar_url: formData.get("avatar_url") || null,
        cover_image_url: formData.get("cover_image_url") || null,
        email: formData.get("email"),
      };

      await API.updateProfile(profileData);

      // Update socials
      const socialsData = {
        github: formData.get("github") || null,
        linkedin: formData.get("linkedin") || null,
        twitter: formData.get("twitter") || null,
      };

      await API.updateSocials(socialsData);

      showSuccess("Profile updated successfully!");
      closeModal("editProfileModal");
      await loadCurrentUser();
      loadSidebarProfile();
      viewMyProfile();
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    }
  });
