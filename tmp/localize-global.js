const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "..", "pages");

const replacements = [
  {
    regex: /<nav class="nav-menu">[\s\S]*?<\/nav>/g,
    replace: `<nav class="nav-menu">
            <a href="../landing/index.html#about" class="nav-link" data-i18n="nav.about">About</a>
            <a href="../map/index.html" class="nav-link" data-i18n="nav.map">Map</a>
            <a href="../zoos/index.html" class="nav-link" data-i18n="nav.zoos">Zoos</a>
            <a href="../contact/index.html" class="nav-link" data-i18n="nav.contact">Contact us</a>
            <a
              href="https://www.figma.com/design/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project"
              class="nav-link"
              target="_blank"
              rel="noopener"
              data-i18n="nav.design"
              >Design</a
            >
          </nav>`,
  },
  {
    regex: /<div class="mobile-nav-overlay">[\s\S]*?<\/div>/g,
    replace: `<div class="mobile-nav-overlay">
        <a href="../landing/index.html#about" class="nav-link" data-i18n="nav.about">About</a>
        <a href="../map/index.html" class="nav-link" data-i18n="nav.map">Map</a>
        <a href="../zoos/index.html" class="nav-link" data-i18n="nav.zoos">Zoos</a>
        <a href="../contact/index.html" class="nav-link" data-i18n="nav.contact">Contact us</a>
      </div>`,
  },
  {
    regex: /<nav class="footer-nav">[\s\S]*?<\/nav>/g,
    replace: `<nav class="footer-nav">
              <a href="../landing/index.html#about" class="footer-nav-link" data-i18n="nav.about">About</a>
              <a href="../map/index.html" class="footer-nav-link" data-i18n="nav.map">Map</a>
              <a href="../zoos/index.html" class="footer-nav-link" data-i18n="nav.zoos">Zoos</a>
              <a href="../contact/index.html" class="footer-nav-link" data-i18n="nav.contact">Contact us</a>
            </nav>`,
  },
  {
    // Fix footer donate btn
    regex:
      /<label\s+for="donate-popup-toggle"\s+class="footer-donate-btn"[^>]*>[\s]*donate for volunteers[\s]*<img[^>]*>[\s]*<\/label>/g,
    replace: `<label
              for="donate-popup-toggle"
              class="footer-donate-btn"
              style="display: inline-flex; cursor: pointer"
            >
              <span data-i18n="footer.donate_volunteers">donate for volunteers</span>
              <img
                src="/assets/icons/right-arrow-white.svg"
                alt=""
                class="btn-icon"
              />
            </label>`,
  },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith(".html")) {
      let content = fs.readFileSync(fullPath, "utf8");
      replacements.forEach(({ regex, replace }) => {
        content = content.replace(regex, replace);
      });
      fs.writeFileSync(fullPath, content, "utf8");
      console.log("Processed", fullPath);
    }
  }
}

processDirectory(pagesDir);
