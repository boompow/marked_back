import { initBrowser } from "./puppeteerBrowser.js";

export async function takeScreenshot(url){   
        const browser = await initBrowser();
        const page = await browser.newPage();
        page.setViewport({width:1920, height:1080}) // standard desktop view

        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });
    
        const screenshotBuffer = await page.screenshot({ fullPage: false });

        await page.close();

        return screenshotBuffer

}