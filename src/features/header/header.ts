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

  const renderState = async () => {
    userContainer.innerHTML = "";
    const user = await AuthService.getCurrentUser();

    // Favorites Shortcut
    const favLink = document.createElement("a");
    favLink.href = "/pages/favorites/index.html";
    favLink.className = "header-favorites-link";
    favLink.title = "Your Favorites";
    favLink.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="stroke: currentColor; stroke-width: 2;">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `;
    userContainer.appendChild(favLink);

    const userView = document.createElement("div");
    userView.className = "user-view";

    if (user) {
      const initial = user.name.charAt(0).toUpperCase();
      userView.innerHTML = `
        <div class="user-trigger logged-in">
          <div class="user-avatar">${initial}</div>
          <span class="user-name-label">${user.name}</span>
        </div>
        <div class="user-dropdown">
           <div class="dropdown-header">
             <div class="dropdown-user-name">${user.name}</div>
             <div class="dropdown-user-email">${user.email}</div>
           </div>
           <div class="dropdown-links">
             <a href="/pages/favorites/index.html" class="dropdown-link">My Favorites</a>
             <a href="#" class="dropdown-link">Settings</a>
           </div>
           <button class="logout-btn" id="logoutBtn">Sign Out</button>
        </div>
      `;
    } else {
      userView.innerHTML = `
        <div class="user-trigger logged-out">
          <div class="user-avatar">${USER_ICON_SVG}</div>
          <span class="user-name-label">SIGN IN</span>
        </div>
        <div class="user-dropdown">
           <div class="dropdown-header">
             <div class="dropdown-user-name">Welcome!</div>
             <div class="dropdown-user-email">Sign in to sync your favorites</div>
           </div>
           <div class="dropdown-links">
             <a href="/pages/login/index.html" class="dropdown-link">Sign In</a>
             <a href="/pages/register/index.html" class="dropdown-link">Registration</a>
           </div>
        </div>
      `;
    }

    userContainer.appendChild(userView);

    const trigger = userView.querySelector(".user-trigger") as HTMLElement;
    const dropdown = userView.querySelector(".user-dropdown") as HTMLElement;

    // Toggle dropdown
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.style.display === "block";
      dropdown.style.display = isOpen ? "none" : "block";
    });

    // Close on click outside
    document.addEventListener("click", () => {
      dropdown.style.display = "none";
    });
    dropdown.addEventListener("click", (e) => e.stopPropagation());

    const logoutBtn = userView.querySelector("#logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        AuthService.logout();
        window.location.reload();
      });
    }
  };

  await renderState();
  socialLinks.insertAdjacentElement("afterend", userContainer);
}
