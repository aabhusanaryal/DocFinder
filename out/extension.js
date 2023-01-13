"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const currentLang = vscode.window.activeTextEditor?.document.languageId;
let boilerplate = "";
switch (currentLang) {
    case "javascript":
        boilerplate = "Boilerplate for JS.";
        break;
    case "python":
        boilerplate = "Boilerplate for Python.";
        break;
    default:
        boilerplate = "No boilerplate found.";
}
if (currentLang == "javascript") {
    boilerplate = "Boilerplate for Javascrpit";
}
else {
    boilerplate = "No boilerplate found.";
}
function activate(context) {
    const provider = new ColorsViewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(ColorsViewProvider.viewType, provider));
    context.subscriptions.push(vscode.commands.registerCommand("docfinder.findDocs", async () => {
        // Focusing on the DocFinder view
        await vscode.commands.executeCommand("docfinder.sidebarView.focus");
        vscode.window.showInformationMessage("Done");
        provider.findDocs();
    }));
}
exports.activate = activate;
class ColorsViewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage((data) => {
            switch (data.type) {
                case "addSnippet": {
                    console.log("Event received!");
                    vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`${data.value}`));
                    break;
                }
            }
        });
    }
    addColor() {
        if (this._view) {
            this._view.show?.(true); // `show` is not implemented in 1.49 but is for 1.50 insiders
            this._view.webview.postMessage({ type: "addColor" });
        }
    }
    clearColors() {
        if (this._view) {
            this._view.webview.postMessage({ type: "clearColors" });
        }
    }
    findDocs() {
        if (this._view) {
            const { activeTextEditor } = vscode.window;
            if (!activeTextEditor) {
                vscode.window.showInformationMessage("No text editor");
                return;
            }
            const selection = activeTextEditor.document.getText(activeTextEditor.selection);
            const language = activeTextEditor.document.languageId;
            this._view.webview.postMessage({ type: "findDocs", selection, language });
        }
    }
    _getHtmlForWebview(webview) {
        // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "main.js"));
        // Do the same for the stylesheet.
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "main.css"));
        // Use a nonce to only allow a specific script to be run.
        const nonce = getNonce();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->

				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				
				<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
				<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>

				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">
				<link rel="stylesheet"
      

				// <title>DocFinder</title>
			</head>
			<body>
				<div id = "app">
          <h1>Welcome to Docfinder</h1></br>
          <p>Please select a keyword in your text editor and run Search Docs command to search docs for that keyword.</p>
          <br><p>Meanwhile, here's a sample for ${currentLang}:</p>
          <br><div>${boilerplate}</div>
        </div>
				
				<script nonce="${nonce}" src="${scriptUri}" defer></script>
			</body>
			</html>`;
    }
}
ColorsViewProvider.viewType = "docfinder.sidebarView";
function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
//# sourceMappingURL=extension.js.map