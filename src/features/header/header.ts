import { AuthService } from "../auth/authService";

const USER_ICON_SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="currentColor" stroke-width="2"/>
</svg>
`;

export async function initHeader() {
  const container = document.querySelector(".header-content");
  if (!container) return;
  const socialLinks = container.querySelector(".social-links");
  if (!socialLinks) return;

  const userContainer = document.createElement("div");
  userContainer.className = "header-user-menu";
  userContainer.style.display = "flex";
  userContainer.style.alignItems = "center";
  userContainer.style.marginLeft = "20px";
  userContainer.style.position = "relative";

  const renderState = async () => {
    userContainer.innerHTML = "";
    const user = await AuthService.getCurrentUser();

    // Add dropdown toggle logic wrapper
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";

    if (user) {
      wrapper.innerHTML = `
        <div class="user-icon" style="cursor: pointer; display: flex; align-items: center; gap: 8px; color: white;">
           ${USER_ICON_SVG}
           <span style="font-weight: 500;">${user.name}</span>
        </div>
        <div class="user-dropdown" style="display: none; position: absolute; top: 120%; right: 0; background: white; padding: 15px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 180px; z-index: 999; text-align: left;">
           <div style="font-weight: 600; color: #333; margin-bottom: 5px;">${user.name}</div>
           <div style="font-size: 12px; color: #666; margin-bottom: 15px;">${user.email}</div>
           <button id="logoutBtn" style="width: 100%; padding: 8px; background: #c4c4c4; border: none; border-radius: 4px; cursor: pointer; color: white;">Sign Out</button>
        </div>
      `;
    } else {
      wrapper.innerHTML = `
        <div class="user-icon" style="cursor: pointer; display: flex; align-items: center; color: white;">
           ${USER_ICON_SVG}
        </div>
        <div class="user-dropdown" style="display: none; position: absolute; top: 120%; right: 0; background: white; padding: 10px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 150px; z-index: 999;">
           <a href="/pages/login/index.html" style="display: block; padding: 8px; color: #333; text-decoration: none; margin-bottom: 5px;">Sign In</a>
           <a href="/pages/register/index.html" style="display: block; padding: 8px; color: #333; text-decoration: none;">Registration</a>
        </div>
      `;
    }

    userContainer.appendChild(wrapper);

    const icon = wrapper.querySelector(".user-icon") as HTMLElement;
    const dropdown = wrapper.querySelector(".user-dropdown") as HTMLElement;

    // Toggle dropdown
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display =
        dropdown.style.display === "none" ? "block" : "none";
    });

    // Close on click outside
    document.addEventListener("click", () => {
      dropdown.style.display = "none";
    });
    dropdown.addEventListener("click", (e) => e.stopPropagation());

    const logoutBtn = wrapper.querySelector("#logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        AuthService.logout();
        renderState();
        // Redirect to landing if we just logged out from a protected action scope? For now just reload.
        window.location.reload();
      });
    }
  };

  await renderState();
  socialLinks.insertAdjacentElement("afterend", userContainer);
}
