chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.action === "injectScript" && sender.tab) {
    console.log("Injecting script for tab:", sender.tab.id);

    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: (scriptContent) => {
        console.log("Executing script:", scriptContent);
        const scriptTag = document.createElement("script");
        scriptTag.textContent = scriptContent;
        document.documentElement.appendChild(scriptTag);
        scriptTag.remove();
      },
      args: [request.script],
      world: "MAIN",
    });
  }
});
