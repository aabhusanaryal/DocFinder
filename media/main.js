const vscode = acquireVsCodeApi();

// Handle messages sent from the extension to the webview
window.addEventListener("message", (event) => {
  const message = event.data; // The json data that the extension sent
  switch (message.type) {
    case "findDocs": {
      findDocs(message.selection);
    }
  }
});

function findDocs(selection) {
  app = document.querySelector("#app");
  app.innerHTML = `The: ${selection}`;
  app.addEventListener("click", () => {
    vscode.postMessage({ type: "addSnippet", value: "Helloooo" });
  });
}
