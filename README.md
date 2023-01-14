# DocFinder

DocFinder is a comprehensive and feature-rich Visual Studio Code extension that provides first-party documentation for multiple programming languages, frameworks, and libraries, fully offline. The extension is built using Node.js with TypeScript, providing a robust and scalable foundation for the project. To power the documentation, the project uses Python and BeautifulSoup4 to scrape official documentation from the web, ensuring that the information provided is always up-to-date and accurate. Once the data has been loaded for a language, it is cached, allowing you to access the documentation offline without any additional network requests.

One of the unique features of DocFinder is the ability to add code snippets from the documentation directly into your code. The blocks of code given within the first-party documentation website are shown inside the extension as addable snippets, allowing developers to easily add commonly used code, saving valuable time and increasing productivity.

Additionally, DocFinder also provides starting boilerplate template for different languages, frameworks, and libraries, which are provided by the official documentation. This allows developers to quickly set up and start working on their projects, without having to spend time on creating the initial project structure. This feature makes DocFinder an extremely valuable tool for developers of all skill levels, providing quick and easy access to the documentation, code snippets, and starting boilerplates they need to complete their projects.

# Installation

![](https://i.imgur.com/yrhOP2l.png)

# Usage

1. Create a new file in vscode. For example: let's create a flask app, with main file `main.py`. This can be anything but for now let's settle with `main.py`.
2. Now let's install flask with `pip install flask` and create a requirements.txt file with `pip freeze > requirements.txt`
3. Now let's create a `main.py` file.
   ![](https://i.imgur.com/LgE9j4v.png)
4. Now the extension will do it's magic. It will detect that we are working on flask. Hence, if we open the Docfinder tab, we will see results for flask. Let's do that.
5. Detecting that the `main.py` file is empty the exension has shown us a boilerplate for `flask`.
   ![](https://i.imgur.com/Afwg8Km.png)
6. We can easily add this boilerplate by using add snippet.
   ![](https://i.imgur.com/Afwg8Km.png)
7. Now let's say we need to know more about `app.route()` let's highlight that and select search.
   ![](https://i.imgur.com/K2uxyta.png)
8. This will give us docs for said function `route()` with the code from the docs provided as insertable snippets.
   ![](https://i.imgur.com/FzO4CyS.png)

#### Auto Correct Search Algorithm

- Let us say that user doesn't remmber a function say he know it starts with `ro` but doesn't know if it's `route` or `roude`. Well he can just seach for `ren` and we will stil show relevant result.
  ![](https://i.imgur.com/j8eEsV7.png)
- Incorrect spelling will also be corrected. For eg: Searching for `roube` will also show docs for `roube` realalizing that there was a spelling mistake.
  ![](https://i.imgur.com/nVUnWDQ.png)

### Example 2: Using with Vue.JS (Framework)

1. Not just flask, let's go and see another language. Let's create a vue file `home.vue`. Then we get inital snippet as:
   ![](https://i.imgur.com/BiBfbxE.png)
   ![](https://i.imgur.com/6LJBlDq.png)

2. Searching in docs works perfectly as Well
   ![](https://i.imgur.com/1H1fa2U.png)
   ![](https://i.imgur.com/M4ttgK6.png)

3. Insertion of snippets works easily
   ![](https://i.imgur.com/e27RE2V.png)

_Note: We get squigly lines because the code is trying to acess items variable (from the docs) and we have not defined such variable._

### Example 3: Lua (Language)

![](https://i.imgur.com/qEvAPqn.png)
![](https://i.imgur.com/pNLgqsB.png)
