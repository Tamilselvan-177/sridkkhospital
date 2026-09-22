const fs = require('fs');
const path = require('path');
const https = require('https');
const cheerio = require('cheerio');
const crypto = require('crypto');

const baseUrl = 'https://sridkkhospital.com';
const outputDir = path.join(__dirname, 'public', 'assets', 'scraped_images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed to download ${url}, status: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function scrapeImages() {
  try {
    console.log(`Fetching ${baseUrl}...`);
    const res = await fetch(baseUrl);
    const html = await res.text();
    const $ = cheerio.load(html);

    const imageUrls = new Set();
    $('img').each((i, el) => {
      let src = $(el).attr('src');
      if (src) {
        if (src.startsWith('/')) {
          src = baseUrl + src;
        } else if (!src.startsWith('http')) {
          src = baseUrl + '/' + src;
        }
        imageUrls.add(src);
      }
    });
    
    // Check for inline background images
    $('*').each((i, el) => {
      const style = $(el).attr('style');
      if (style) {
        const match = style.match(/url\(['"]?(.*?)['"]?\)/);
        if (match && match[1]) {
           let src = match[1];
           if (src.startsWith('/')) {
             src = baseUrl + src;
           } else if (!src.startsWith('http') && !src.startsWith('data:')) {
             src = baseUrl + '/' + src;
           }
           if (!src.startsWith('data:')) imageUrls.add(src);
        }
      }
    });

    console.log(`Found ${imageUrls.size} images to download.`);
    
    let count = 0;
    for (const url of imageUrls) {
      try {
        const parsedUrl = new URL(url);
        const fileName = path.basename(parsedUrl.pathname);
        if (!fileName || !fileName.includes('.')) continue; // skip if no extension
        
        const cleanName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const dest = path.join(outputDir, cleanName);
        
        if (!fs.existsSync(dest)) {
          console.log(`Downloading ${cleanName}...`);
          await downloadImage(url, dest);
          count++;
        } else {
           console.log(`Skipping ${cleanName} (already exists)`);
        }
      } catch (e) {
        console.error(`Failed on ${url}: ${e.message}`);
      }
    }
    console.log(`Successfully downloaded ${count} new images to public/assets/scraped_images.`);
  } catch (err) {
    console.error('Error scraping images:', err);
  }
}

scrapeImages();
