(async function () {
  const data = await chrome.storage.local.get("scriptMappings");
  const scriptMappings = data.scriptMappings || {};
  const currentUrl = window.location.href;

  for (let urlPattern in scriptMappings) {
      if (currentUrl.includes(urlPattern)) {
          console.log("Injecting script for:", urlPattern);
          const script = scriptMappings[urlPattern];

          // Inject script
          const scriptTag = document.createElement("script");
          scriptTag.textContent = script;
          (document.head || document.documentElement).appendChild(scriptTag);
          scriptTag.remove();
          break;
      }
  }
})();
