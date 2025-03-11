document.addEventListener("DOMContentLoaded", () => {
  const urlInput = document.getElementById("url");
  const scriptInput = document.getElementById("script");
  const saveButton = document.getElementById("save");
  const scriptList = document.getElementById("script-list");

  // Load and display saved scripts
  function loadScripts() {
      chrome.storage.local.get("scriptMappings", (data) => {
          scriptList.innerHTML = ""; // Clear the list
          const scripts = data.scriptMappings || {};

          Object.keys(scripts).forEach((url) => {
              const scriptDiv = document.createElement("div");
              scriptDiv.className = "script-entry";
              scriptDiv.innerHTML = `
                  <strong>${url}</strong>
                  <button class="edit-btn" data-url="${url}">Edit</button>
                  <button class="delete-btn" data-url="${url}">Delete</button>
              `;
              scriptList.appendChild(scriptDiv);
          });

          // Add event listeners for edit and delete
          document.querySelectorAll(".edit-btn").forEach((button) => {
              button.addEventListener("click", () => editScript(button.dataset.url));
          });

          document.querySelectorAll(".delete-btn").forEach((button) => {
              button.addEventListener("click", () => deleteScript(button.dataset.url));
          });
      });
  }

  // Save new script or update existing one
  saveButton.addEventListener("click", () => {
      const url = urlInput.value.trim();
      const script = scriptInput.value.trim();

      if (url && script) {
          chrome.storage.local.get("scriptMappings", (data) => {
              let scripts = data.scriptMappings || {};
              scripts[url] = script;

              chrome.storage.local.set({ scriptMappings: scripts }, () => {
                  alert("Script saved!");
                  loadScripts();
                  urlInput.value = "";
                  scriptInput.value = "";
              });
          });
      } else {
          alert("Please enter both a URL and a script.");
      }
  });

  // Edit an existing script
  function editScript(url) {
      chrome.storage.local.get("scriptMappings", (data) => {
          const scripts = data.scriptMappings || {};
          if (scripts[url]) {
              urlInput.value = url;
              scriptInput.value = scripts[url];
          }
      });
  }

  // Delete a script
  function deleteScript(url) {
      if (confirm(`Are you sure you want to delete the script for ${url}?`)) {
          chrome.storage.local.get("scriptMappings", (data) => {
              let scripts = data.scriptMappings || {};
              delete scripts[url];

              chrome.storage.local.set({ scriptMappings: scripts }, () => {
                  alert("Script deleted!");
                  loadScripts();
              });
          });
      }
  }

  // Initial load
  loadScripts();
});
