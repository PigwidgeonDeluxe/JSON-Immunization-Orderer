# JSON-Immunization-Orderer
Puts Immunizations in ascending order with a given JSON, with a specified format.

Prerequisites

- node.js
- github files
- bodyparser (in node_modules folder)
- express (in node_modules folder)

Installing

1. Create a directory named jsonorderer_app
2. Make sure to install all prerequisites first, and download all github files to the directory.
3. Extract node_modules.zip file to node_modules folder with the folder being in the same directory as server.js

Using the Orderer

1. Open up bash (Unix) or command prompt (Windows).
3. Change directory to the location of server.js (ie cd ~/username/myapp/)
4. Start the server with "node server.js".
5. Go to the address the server is listening on via a web browser.
6. Copy and Paste your JSON into the text field marked "Paste JSON here."
7. Click submit. The webapp should return your JSON with the immunizations sorted by ascending order, first by name then by ID.
