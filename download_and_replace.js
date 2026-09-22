const fs = require('fs');
const path = require('path');
const https = require('https');

const dirsToScan = ['app', 'components', 'data', 'lib'];
const imgDir = path.join(__dirname, 'public', 'assets', 'images');

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`Status: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.jsx') || dirFile.endsWith('.js')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
}

async function processFiles() {
  const urlRegex = /https:\/\/sridkkhospital\.com\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[a-zA-Z0-9.\-_]+/g;
  let allFiles = [];
  for (const dir of dirsToScan) {
    allFiles = allFiles.concat(walkSync(path.join(__dirname, dir)));
  }

  const downloads = new Map(); // url -> local path
  let count = 0;

  for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let matches = content.match(urlRegex);
    if (matches) {
      for (const url of matches) {
        if (!downloads.has(url)) {
          const fileName = path.basename(new URL(url).pathname);
          const cleanName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
          const localPath = `/assets/images/${cleanName}`;
          const dest = path.join(imgDir, cleanName);
          downloads.set(url, { localPath, dest });
        }
      }
    }
  }

  console.log(`Found ${downloads.size} unique image URLs to download and replace.`);

  for (const [url, info] of downloads.entries()) {
    if (!fs.existsSync(info.dest)) {
      console.log(`Downloading ${url}...`);
      try {
        await downloadImage(url, info.dest);
      } catch (e) {
        console.error(`Failed to download ${url}: ${e.message}`);
      }
    }
  }

  let replacedFiles = 0;
  for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    for (const [url, info] of downloads.entries()) {
      content = content.replaceAll(url, info.localPath);
    }

    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      replacedFiles++;
      console.log(`Updated ${path.relative(__dirname, file)}`);
    }
  }

  console.log(`Done! Replaced URLs in ${replacedFiles} files.`);
}

processFiles().catch(console.error);
