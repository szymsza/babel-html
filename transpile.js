const path = require('path');
const fs = require('fs');
const fsPromises = require('fs/promises');
const babel = require('@babel/core');

const configPath = path.resolve(__dirname, 'babel.config.json');
const babelConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

function transpileJs(filePath) {
  return fsPromises.writeFile(filePath, babel.transformFileSync(filePath, babelConfig).code);
}

function transpileHtml(filePath) {
  const fileContent = fs.readFileSync(filePath).toString();
  let transpiledFileContent = fileContent;
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;

  for (const scriptMatch of fileContent.matchAll(scriptRegex)) {
    const scriptText = scriptMatch[1];

    transpiledFileContent = transpiledFileContent.replace(scriptText, babel.transformSync(scriptText, babelConfig).code);
  }

  if (fileContent !== transpiledFileContent) {
    return fsPromises.writeFile(filePath, transpiledFileContent);
  }
}

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      return processDir(filePath);
    }

    switch (path.extname(file)) {
      case '.js':
        transpileJs(filePath);
        break;
      case '.html':
        transpileHtml(filePath);
        break;
    }
  });
}

const cmdLineArgs = process.argv;

if (cmdLineArgs.length !== 3) {
  console.error('Please specify an input directory, e.g., node transpile.js ../src');
  return;
}

const srcDir = cmdLineArgs[2];

if (srcDir === 'YOUR_SRC_DIR_PATH') {
  console.error('Please specify your own input directory instead of just running the default script');
  return;
}

processDir(srcDir);