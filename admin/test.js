const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
    page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure().errorText));

    console.log('Navigating to http://localhost:5174/login...');
    await page.goto('http://localhost:5174/login', { waitUntil: 'networkidle0' });
    
    const content = await page.content();
    console.log('HTML CONTENT START');
    console.log(content.substring(0, 1000));
    console.log('HTML CONTENT END');
    
    await browser.close();
  } catch (err) {
    console.error('SCRIPT ERROR:', err);
  }
})();
