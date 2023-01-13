const vscode = acquireVsCodeApi();

// Handle messages sent from the extension to the webview
window.addEventListener("message", (event) => {
  const message = event.data; // The json data that the extension sent
  switch (message.type) {
    case "findDocs": {
      findDocs(message.selection, message.language);
    }
  }
});
testHTML = `
<h1>Test HTML</h1>
<pre>
<code class="language-python">
print('Hello World')
</code>
</pre>

<pre>
<code class="language-python">
print('This is second code block!')
</code>
</pre>
`;
app = document.querySelector("#app");

function findDocs(selection, language) {
  console.log("IM RUNNING");
  app.innerHTML = `
	<pre><code><span></span><span class=\"nd\">@app</span><span class=\"o\">.</span><span class=\"n\">route</span><span class=\"p\">(</span><span class=\"s2\">\"/\"</span><span class=\"p\">)</span>\n<span class=\"k\">def</span> <span class=\"nf\">index</span><span class=\"p\">():</span>\n    <span class=\"o\">...</span>\n</code></pre>
  `;
  //   app.innerHTML = testHTML;
  document.querySelectorAll("code").forEach((codeBlock) => {
    codeBlock.addEventListener("click", () => {
      vscode.postMessage({ type: "addSnippet", value: codeBlock.textContent });
    });
  });
}
