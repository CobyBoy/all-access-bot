import puppeteer from 'puppeteer';

async function reRun() {
  const options = {
    headless: false,
    defaultViewport: null,
    args: ['--window-size=600,400', '--no-sandbox', '--disable-setuid-sandbox', '--incognito'],
  };
  
  const browser = await puppeteer.launch(options);
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  const navigationPromise = page.waitForNavigation();
  const randomId = generateRandomId();
  console.log("random", randomId)
 // await page.goto('https://dfentertainment.queue-it.net/?c=dfentertainment&e=duki&cid=es-CL')
await page.goto(`https://www.allaccess.com.ar/event/duki?qitq=${randomId}&qitp=6a611d49-1f57-4711-b720-aa4d0a067aa5&qitts=1688056738&qitc=dfentertainment&qite=duki&qitrt=Queue&qith=3ce5745c7bd57a8a0628fc4733ec8f52
`)  
//https://www.allaccess.com.ar/event/lollapalooza-24?qitq=7e115de7-a432-4c7d-9534-7a68bbcc7f9f&qitp=6a611d49-1f57-4711-b720-aa4d0a067aa5&qitts=1688056738&qitc=dfentertainment&qite=lollapalooza-24&qitrt=Queue&qith=3ce5745c7bd57a8a0628fc4733ec8f52

  
  await navigationPromise
  
  await page.waitForSelector('#MainPart_lbWhichIsIn')
  await page.waitForSelector('#hlLinkToQueueTicket2')
  
  async function find() {
    return page.evaluate(() => {
      const btn = document.getElementById('MainPart_lbWhichIsIn');
      console.log(btn.textContent)
      return btn.textContent;
    });
  };
  
  
async function findId() {
    return page.evaluate(() => {
        const id = document.getElementById('hlLinkToQueueTicket2');
        console.log(id.textContent)
        return id.textContent;
      });
  }

  await find().then(async (m) => { console.log(m);
    //await findId().then(async (m) => { console.log(m); })
  //if(m == "más de una hora" || m.substring(0, 2) > 35) { 
    if(m == "más de una hora") { 
    //setTimeout(async() => {
      //await browser.close();
    //}, 3000)
  }
  //await reRun() 
  });
}
await reRun()
//https://www.allaccess.com.ar/event/duki?qitq=7e115de7-a432-4c7d-9534-7a68bbcc7f9f&qitp=6a611d49-1f57-4711-b720-aa4d0a067aa5&qitts=1688056738&qitc=dfentertainment&qite=tanbionicariver&qitrt=Queue&qith=3ce5745c7bd57a8a0628fc4733ec8f52

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

//const randomId = generateRandomId();
//console.log(randomId);