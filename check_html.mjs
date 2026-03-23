import https from 'https';

https.get('https://alexander-ergart.de/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const hasLogoClasses = data.includes('w-16 md:w-20 lg:w-24');
    const hasCookieClasses = data.includes('backdrop-blur-xl') && data.includes('sm:rounded-2xl');
    const hasHeroClasses = data.includes('mounted') || data.includes('index > 0'); // The JS logic might be minified, but we can check the HTML for only 1 slide rendered initially.
    
    // Check how many images are in the DOM initially for the slider
    const sliderMatches = data.match(/hausmeisterdienste/g) || [];
    
    console.log("=== UI LIVE CHECK ===");
    console.log(`Logo Classes Found: ${hasLogoClasses}`);
    console.log(`Cookie Banner Classes Found: ${hasCookieClasses}`);
    console.log(`Slider Initial Render Check: ${sliderMatches.length} references found (expected fewer if lazy)`);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
