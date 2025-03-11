chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ scriptMappings: {} });
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "saveScript") {
      chrome.storage.local.get("scriptMappings", (data) => {
          let scripts = data.scriptMappings || {};
          scripts[request.url] = request.script;

          chrome.storage.local.set({ scriptMappings: scripts }, () => {
              sendResponse({ success: true });
          });
      });
      return true;
  }
});
