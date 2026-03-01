const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const files = walkSync('./src');
let changedFiles = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace low-opacity cyan text colors with a darker, opaque cyan (#0891B2 or Cyan-600)
  content = content.replace(/color:\s*['"]rgba\(6,\s*182,\s*212,\s*0\.[3456]\d*['"]/g, "color: '#0891B2'");
  
  // Also bump up any Charcoal (15, 23, 42) text opacities that are too low (e.g. < 0.3)
  content = content.replace(/color:\s*['"]rgba\(15,\s*23,\s*42,\s*0\.[12]\d*['"]/g, "color: 'rgba(15, 23, 42,0.45)'");

  // And some others like 0.3x to 0.5x
  content = content.replace(/color:\s*['"]rgba\(15,\s*23,\s*42,\s*0\.3\d*['"]/g, "color: 'rgba(15, 23, 42,0.55)'");

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated contrast in ${file}`);
    changedFiles++;
  }
}

console.log(`Total files updated: ${changedFiles}`);
