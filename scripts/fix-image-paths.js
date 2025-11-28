const fs = require('fs');
const path = require('path');

// For Vercel: No basePath needed (empty by default)
// For GitHub Pages: Set NEXT_PUBLIC_BASE_PATH='/rusker_landing' if needed
// Set NEXT_PUBLIC_BASE_PATH='' for custom domains (no basePath needed)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined 
  ? process.env.NEXT_PUBLIC_BASE_PATH 
  : '';
const outDir = path.join(__dirname, '..', 'out');

function fixImagePaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Only fix paths if basePath is set (for GitHub Pages)
  // For custom domains, paths should remain as-is (starting with /)
  if (basePath) {
    // Replace image paths in src attributes
    content = content.replace(/src="\/images\//g, `src="${basePath}/images/`);
    
    // Replace image paths in href attributes (preload links)
    content = content.replace(/href="\/images\//g, `href="${basePath}/images/`);
    
    // Replace image paths in url() in inline styles (multiple patterns)
    content = content.replace(/url\(['"]?(\/images\/[^)]+)\)/g, `url(${basePath}$1)`);
    content = content.replace(/url\(['"]?(\/images\/[^)]+)['"]?\)/g, `url(${basePath}$1)`);
    
    // Replace image paths in style attributes (backgroundImage)
    content = content.replace(/backgroundImage:\s*['"]url\((\/images\/[^)]+)\)['"]/g, `backgroundImage: 'url(${basePath}$1)'`);
    
    // Replace image paths in style="background-image:url(...)" attributes
    content = content.replace(/style="[^"]*background-image:\s*url\((\/images\/[^)]+)\)[^"]*"/g, (match, path) => {
      return match.replace(`url(${path})`, `url(${basePath}${path})`);
    });
    
    // Fix CSS and JS paths: /_next/ -> {basePath}/_next/
    content = content.replace(/href="\/_next\//g, `href="${basePath}/_next/`);
    content = content.replace(/src="\/_next\//g, `src="${basePath}/_next/`);
  }
  
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
  console.log(`Fixing image paths in built files...`);
  console.log(`Using basePath: ${basePath || '(empty - for custom domain)'}`);
  processDirectory(outDir);
  console.log('Done!');
} else {
  console.error('Out directory not found. Run build first.');
  process.exit(1);
}

