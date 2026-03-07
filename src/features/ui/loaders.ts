export function createLoader(): HTMLElement {
  const loaderContainer = document.createElement("div");
  loaderContainer.style.display = "flex";
  loaderContainer.style.justifyContent = "center";
  loaderContainer.style.alignItems = "center";
  loaderContainer.style.padding = "50px 0";
  loaderContainer.style.width = "100%";

  const spinner = document.createElement("div");
  // Simple CSS spinner via style
  spinner.style.width = "40px";
  spinner.style.height = "40px";
  spinner.style.border = "4px solid #f3f3f3";
  spinner.style.borderTop = "4px solid #F9804B";
  spinner.style.borderRadius = "50%";
  spinner.style.animation = "spin 1s linear infinite";

  if (!document.getElementById("spinner-keyframes")) {
    const style = document.createElement("style");
    style.id = "spinner-keyframes";
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  loaderContainer.appendChild(spinner);
  return loaderContainer;
}

export function createErrorMessage(): HTMLElement {
  const errContainer = document.createElement("div");
  errContainer.style.padding = "50px 0";
  errContainer.style.textAlign = "center";
  errContainer.style.color = "#D31414";
  errContainer.style.fontWeight = "500";
  errContainer.style.fontSize = "18px";
  errContainer.textContent = "Something went wrong. Please, refresh the page";
  return errContainer;
}
