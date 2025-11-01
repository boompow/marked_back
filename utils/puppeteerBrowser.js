import puppeteer from "puppeteer";
import "dotenv/config"

let browser;

export async function initBrowser(){
    if(!browser){
        browser = await puppeteer.launch({
                headless:true,
                executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || (puppeteer.executablePath()),
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