import puppeteer from "puppeteer";

let browser;

export async function initBrowser(){
    if(!browser){
        browser = await puppeteer.launch({
                headless:true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-gpu",
                    "--no-zygote"
                ]
            });
        
            console.log("Puppeteer browser running")

        }     
    return browser
}