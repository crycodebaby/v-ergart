import { execSync } from 'child_process';
import fs from 'fs';

const urls = [
  { name: 'live-home', url: 'https://alexander-ergart.de/' },
  { name: 'live-blog', url: 'https://alexander-ergart.de/blog' },
  { name: 'live-post', url: 'https://alexander-ergart.de/blog/werterhalt-durch-gebaeudemanagement' }
];

const results = {};

for (const {name, url} of urls) {
  console.log(`Running lighthouse for ${name}...`);
  try {
    execSync(`npx -y lighthouse ${url} --output json --output-path ./lh-${name}.json --only-categories=performance --chrome-flags="--headless"`, { stdio: 'pipe' });
  } catch(e) {
    console.log(`Command failed, but checking for output file...`);
  }

  try {
    const data = JSON.parse(fs.readFileSync(`./lh-${name}.json`, 'utf8'));
    
    const audits = data.audits;
    
    results[name] = {
      lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
      tbt: audits['total-blocking-time']?.displayValue || 'N/A',
      si: audits['speed-index']?.displayValue || 'N/A',
      score: data.categories.performance.score * 100,
      images: []
    };
    
    const networkRequests = audits['network-requests']?.details?.items || [];
    const images = networkRequests.filter(req => req.resourceType === 'Image');
    
    const sortedImages = images.sort((a,b) => a.startTime - b.startTime).slice(0, 10);
    sortedImages.forEach(img => {
      results[name].images.push({
        url: img.url.split('?')[0].substring(0, 120), // Truncate generic query params for readability
        urlFull: img.url,
        sizeKb: (img.transferSize / 1024).toFixed(1)
      });
    });
    
    fs.unlinkSync(`./lh-${name}.json`);
  } catch(e) {
    console.log(`Failed for ${name}:`, e.message);
  }
}

console.log("=== RESULTS ===");
console.log(JSON.stringify(results, null, 2));
