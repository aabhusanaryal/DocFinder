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

app = document.querySelector("#app");
app.addEventListener("click", () => {
  console.log("Event sent!");
  vscode.postMessage({ type: "addSnippet", value: "Helloooo" });
});

function findDocs(selection) {
  app.innerHTML = `The: ${selection}`;
}
