const fs = require('fs');
const path = require('path');

const basePath = '/rusker_landing';
const outDir = path.join(__dirname, '..', 'out');

function fixImagePaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace image paths in src attributes
  content = content.replace(/src="\/images\//g, `src="${basePath}/images/`);
  
  // Replace image paths in href attributes (preload links)
  content = content.replace(/href="\/images\//g, `href="${basePath}/images/`);
  
  // Replace image paths in url() in inline styles
  content = content.replace(/url\((\/images\/[^)]+)\)/g, `url(${basePath}$1)`);
  
  // Replace image paths in style attributes
  content = content.replace(/backgroundImage:\s*['"]url\((\/images\/[^)]+)\)['"]/g, `backgroundImage: 'url(${basePath}$1)'`);
  
  fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      console.log(`Fixing image paths in: ${filePath}`);
      fixImagePaths(filePath);
    }
  }
}

if (fs.existsSync(outDir)) {
  console.log('Fixing image paths in built files...');
  processDirectory(outDir);
  console.log('Done!');
} else {
  console.error('Out directory not found. Run build first.');
  process.exit(1);
}

