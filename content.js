(async function () {
  console.log("Custom Script Injector content.js loaded");
  const data = await chrome.storage.local.get("scriptMappings");
  const scriptMappings = data.scriptMappings || {};
  const currentUrl = window.location.href;
  console.log("Current URL:", currentUrl);
  console.log("Stored Patterns:", scriptMappings);

  for (let urlPattern in scriptMappings) {
    try {
      const escapedPattern = urlPattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special regex characters
      if (new RegExp(escapedPattern).test(currentUrl)) {
        console.log("Injecting script for:", urlPattern);
        const script = scriptMappings[urlPattern];

        chrome.runtime.sendMessage({ action: "injectScript", script });
        break;
      }
    } catch (error) {
      console.error("Invalid regex pattern:", urlPattern, error);
    }
  }
})();