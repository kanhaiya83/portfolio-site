const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const cookiesFilePath = "cookies.json";
  const previousSession = fs.existsSync(cookiesFilePath);
  if (previousSession) {
    // If file exist load the cookies
    const cookiesString = fs.readFileSync(cookiesFilePath);
    const parsedCookies = JSON.parse(cookiesString);
    if (parsedCookies.length !== 0) {
      for (let cookie of parsedCookies) {
        await page.setCookie(cookie);
      }
      console.log("Session has been loaded in the browser");

      await page.goto("https://www.instagram.com");
    }
  } else {
    await page.goto("https://www.instagram.com/accounts/login/");
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', "kanhaiya_83");
    await page.type('input[name="password"]', "P@SSWORDIGNEW");
    await page.click('button[type="submit"]');
    await page.waitForSelector(
      "#react-root > section > main > div > div > div > div > button"
    );
    await page.click(
      "#react-root > section > main > div > div > div > div > button"
    );

    // Save Session Cookies
    const cookiesObject = await page.cookies();
    // Write cookies to temp file to be used in other profile pages
    fs.writeFile(
      cookiesFilePath,
      JSON.stringify(cookiesObject),
      function (err) {
        if (err) {
          console.log("The file could not be written.", err);
        }
        console.log("Session has been successfully saved");
      }
    );
  }

  //turn on notification popup
  await page.waitForSelector(
    "body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm"
  );
  await page.click(
    "body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm"
  );
  //go to profile
  await page.goto("https://www.instagram.com/kanhaiya_83");
//click on followers
  await page.waitForSelector(
    "#react-root > section > main > div > header > section > ul > li:nth-child(2) > a"
  );
  await page.click(
    "#react-root > section > main > div > header > section > ul > li:nth-child(2) > a"
  );
//wait for first few followers to load
  await page.waitForSelector(
    "body > div.RnEpo.Yx5HN > div > div > div.isgrP > ul > div"
  );
  const followersList = await page.evaluate(async (followerArr) => {
    async function autoScroll() {
      const thesel = document.querySelector(
        "body > div.RnEpo.Yx5HN > div > div > div.isgrP"
      );
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = thesel.scrollHeight;
          thesel.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    }
    return await new Promise((resolve, reject) => {
      const scrollInterval = setInterval(async () => {
        autoScroll();
        //element containing all followers nodes
        const followersContainer = document.querySelector(
          "body > div.RnEpo.Yx5HN > div > div > div.isgrP > ul > div"
        );
        if (followersContainer.childElementCount >= 157) {
          clearInterval(scrollInterval);
          const arr = [];
          for (var i = 0; i < followersContainer.childElementCount; i++) {
            ele = followersContainer.children[i];
            const username = ele.querySelector("a.FPmhX").innerHTML;
            const name = ele.querySelector("div.wFPL8").innerHTML;
            const follower = { name: name, username: username };
            console.log(follower)
            arr.push(follower);
          }
          console.log({arr})
          resolve(arr);
        }
      }, 2000);
    });
  });
  
const now=new Date()
const data={dateStamp:now.getTime(),date:now.toLocaleString(),followersList:followersList}
const savedData = JSON.parse(fs.readFileSync("./followers.json"));
fs.writeFileSync("./followers.json",JSON.stringify([...savedData,data]))

})();
