const fs = require("fs");

let content = fs.readFileSync("src/pages/[lang]/support.astro", "utf8");

content = content.replace(
  "<!-- Unified Filter -->",
  '<provincial-support-manager class="block">\n  <!-- Unified Filter -->',
);

content = content.replace(
  "    </section>\n  </div>\n</Layout>",
  "    </section>\n  </div>\n</provincial-support-manager>\n</Layout>",
);

const newScript = `<script>
  class ProvincialSupportManager extends HTMLElement {
    connectedCallback() {
      const select = this.querySelector<HTMLSelectElement>("#province-select");
      const nationalFallbackSection = this.querySelector("#national-fallback-section");
      const provinceViews = this.querySelectorAll(".province-view");

      if (select) {
        select.addEventListener("change", (e) => {
          const selectedProv = (e.target as HTMLSelectElement).value;

          if (selectedProv) {
            if (nationalFallbackSection) nationalFallbackSection.classList.add("hidden");

            provinceViews.forEach((view) => {
              if (view.getAttribute("data-province-id") === selectedProv) {
                view.classList.remove("hidden");
                view.classList.add("animate-fade-in");
              } else {
                view.classList.add("hidden");
                view.classList.remove("animate-fade-in");
              }
            });
          } else {
            if (nationalFallbackSection) nationalFallbackSection.classList.remove("hidden");
            provinceViews.forEach((view) => view.classList.add("hidden"));
          }
        });
      }
    }
  }

  if (!customElements.get("provincial-support-manager")) {
    customElements.define("provincial-support-manager", ProvincialSupportManager);
  }
</script>`;

content = content.replace(/<script>[\s\S]*?<\/script>/, newScript);

fs.writeFileSync("src/pages/[lang]/support.astro", content);
console.log(
  "Successfully updated support.astro with custom element lifecycle!",
);
