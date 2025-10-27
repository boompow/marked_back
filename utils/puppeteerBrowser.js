import puppeteer from "puppeteer";

let browser;

export async function initBrowser(){
    if(!browser){
        browser = await puppeteer.launch({
                headless:true,
                executablePath: "/usr/bin/chromium",
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-gpu",
                    "--no-zygote",
                    "--single-process",
                ]
            });
        
            console.log("Puppeteer browser running")

        }     
    return browser
}