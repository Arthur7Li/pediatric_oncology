const fs = require("fs");

let content = fs.readFileSync("src/pages/[lang]/checklists.astro", "utf8");

// Replace the static div box in childItems, docItems, parentItems with an accessible interactive checkbox
const oldItemRender = `<li class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded border-2 border-gray-300 mt-0.5 print:border-gray-400 shrink-0" />
                  <span class="text-gray-700">{item}</span>
                </li>`;

const newItemRender = `<li class="flex items-start gap-3 group">
                  <input
                    type="checkbox"
                    class="checklist-checkbox w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary mt-0.5 cursor-pointer print:appearance-none print:w-4 print:h-4 print:border-2 print:border-gray-500 shrink-0"
                  />
                  <span class="text-gray-700 select-none group-has-[:checked]:line-through group-has-[:checked]:text-gray-400 transition-colors">{item}</span>
                </li>`;

content = content.replaceAll(oldItemRender, newItemRender);

// Add interactive checklist wrapper and script
content = content.replace(
  '<div class="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">',
  '<interactive-checklist class="block"><div class="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">',
);

content = content.replace(
  "      </div>\n    </div>\n\n    <!-- Checklist 2: Emergency Fever Protocol -->",
  "      </div></interactive-checklist>\n    </div>\n\n    <!-- Checklist 2: Emergency Fever Protocol -->",
);

const scriptToAdd = `
<script>
  class InteractiveChecklist extends HTMLElement {
    connectedCallback() {
      const checkboxes = this.querySelectorAll<HTMLInputElement>(".checklist-checkbox");
      const storageKey = "peds_onco_hospital_checklist";

      // Restore saved state
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
        checkboxes.forEach((cb, index) => {
          if (saved[index]) {
            cb.checked = true;
          }
          cb.addEventListener("change", () => {
            saved[index] = cb.checked;
            localStorage.setItem(storageKey, JSON.stringify(saved));
          });
        });
      } catch (e) {
        // Fallback gracefully if localStorage is unavailable
      }
    }
  }

  if (!customElements.get("interactive-checklist")) {
    customElements.define("interactive-checklist", InteractiveChecklist);
  }
</script>
`;

if (!content.includes('customElements.define("interactive-checklist"')) {
  content += scriptToAdd;
}

fs.writeFileSync("src/pages/[lang]/checklists.astro", content);
console.log(
  "Successfully updated checklists.astro with interactive checkboxes!",
);
