const { BeforeAll, After, AfterAll, Status } = require("cucumber");
import * as fs              from "fs";
import { browser }          from "protractor";
import { protractorConfig } from "../config/protractor.config";

BeforeAll({timeout: 100 * 1000}, async () => {
    await browser.get(protractorConfig.baseUrl);
});

After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        // screenShot is a base-64 encoded PNG
         const screenShot = await browser.takeScreenshot();
         this.attach(screenShot, "image/png");
    }
});

AfterAll({timeout: 100 * 1000}, async () => {
    await browser.quit();
});
