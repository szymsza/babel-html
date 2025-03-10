# Babel HTML

[Babel.js](https://babeljs.io/) is great, but it can only transpile `.js` files, which can be a problem if you have inline JavaScript that needs to be transpiled as well.

This simple repo serves as an example of how to use Babel to transpile inline scripts inside `.html` files as well.

## Usage
1. Clone this repo `git clone https://github.com/szymsza/babel-html.git`
2. `npm install`
3. Edit the `babel.config.json` file to match your needs
4. Run `node ./transpile.js YOUR_SRC_DIR_PATH` to transpile all `.js` and `.html` files inside `YOUR_SRC_DIR_PATH` (recursively)

## Contributions
If you want to extend the functionality, feel free to open a PR.

If you find a bug, preferably open a PR. Otherwise, feel free to open an issue.