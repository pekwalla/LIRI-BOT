# LIRI-BOT
Liri application

liri-node-app
Requirements
To install these npm packages, cd into the folder, then run
run `npm init -y
npm install 

Make a Node.js app that depends on user input from the command line
Integrate Twitter, Spotify, and OMDb APIs via the appropriate NPM modules
Use API calls and parse through returned JSON objects, outputting them in a specified format
Read commands and queries from file
Technologies Used
Node.js
JavaScript
Spotify API (via spotify npm module)
OMDb API (via request npm module)
Code Explanation
 API keys are store in  "keys.js", and we are exporting its contents to the main "liri.js" file
What our app does depends on what the user types, and there are 4 main functions:   (5) Spotify lookup for a song, (5) OMDb lookup for a movie, and (5) read command for band information 
from there, we selectively output using console.log
The program also makes a request to the Spotify API, and we get back a JSON object that includes everything we need (artist(s), song, preview link, and album)
The program also makes a HTTP request to the OMDb API using the request NPM module, and we get back an object that includes everything we need (title, year, IMDb rating, language, etc.)
The program also reads from a file called "random.text" and executes the command and query found there using string and array methods
Appropriate comments and error-checking has been added

Final results screenshots are added to a word file called results.docx.