import puppeteer from 'puppeteer';
const options = {
  headless: false,
  defaultViewport: null,
  args: ['--window-size=1200,800', '--no-sandbox', '--disable-setuid-sandbox', '--incognito'],
};

function generateRandomId() {
  const characters = '0123456789abcdef';
  let randomId = '';

  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
  }

  // Insert hyphens at specific positions
  randomId =
    randomId.substring(0, 8) +
    '-' +
    randomId.substring(8, 4) +
    '-' +
    randomId.substring(12, 4) +
    '-' +
    randomId.substring(16, 4) +
    '-' +
    randomId.substring(20);

  return randomId;
}

const browser = await puppeteer.launch(options);
const context = await browser.createIncognitoBrowserContext();
const page = await context.newPage();
const navigationPromise = page.waitForNavigation();
const randomId = generateRandomId();
console.log("random", randomId)
// await page.goto('https://dfentertainment.queue-it.net/?c=dfentertainment&e=duki&cid=es-CL')
await page.goto(`https://www.allaccess.com.ar/event/lolla24?qitq=${randomId}&qitp=6a611d49-1f57-4711-b720-aa4d0a067aa5&qitts=1688056738&qitc=dfentertainment&qite=lolla24&qitrt=Queue&qith=3ce5745c7bd57a8a0628fc4733ec8f52
`, {waitUntil: 'domcontentloaded'}) 


await page.waitForSelector('#buyButton')
await page.click('#buyButton')

//await navigationPromise.then((res) => {console.log(res.url())})
await page.setRequestInterception(true)
page.on('request', (request, res) =>{
  console.log(request.url().includes('https://assets'))
  if (request.url().includes('https://assets')) {
    request.abort();
  }
})

//await browser.close()