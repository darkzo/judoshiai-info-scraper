const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
  // Change this url in production
  const url = 'http://127.0.0.1:8088/info.html';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  // By default only three tatamis are selected
  // Here 4th and 5th tatami are included in the view
  await page.evaluate(() => {
    const element1 = document.querySelector('#sel4');
    const element2 = document.querySelector('#sel5');
    element1.click();
    element2.click();
  });
  // It takes time to load competitors data 
  // Wait for 8 sec to be sure that all competitors are loaded
  await page.waitFor(8000);
  const html = await page.content();
  const $ = cheerio.load(html)
  
  // Extract info about competitors and save it in the corespoding file
  for (let i = 1; i < 6; i++) {
    const category = $(`#mcat_t${i}_n1`).text().split('#')[0]
    const bFirst = $(`#mbfirst_t${i}_n1`).text();
    const bLast = $(`#mblast_t${i}_n1`).text();
    const bClub = $(`#mbclub_t${i}_n1`).text();
    
    const wFirst = $(`#mwfirst_t${i}_n1`).text();
    const wLast = $(`#mwlast_t${i}_n1`).text();
    const wClub = $(`#mwclub_t${i}_n1`).text();
    
    let finalText = '';
    if (bFirst != '' && wFirst != '') {
      finalText = `${category} \r\n${bFirst} ${bLast} - ${bClub} \r\n${wFirst} ${wLast} - ${wClub}`
    }
    
    fs.writeFile(`tatami${i}.txt`, finalText, function (err) {
      if (err) throw err;
    });
  }
  await browser.close();
})();