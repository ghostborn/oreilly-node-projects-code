import { scheduleJob } from "node-schedule";
import { sendMail } from "./mailer.js";
import { campaignMail } from "../mailTemplates.js";

export const schedule = (timeOptions) => {
  scheduleJob(timeOptions, async () => {
    console.log("time to sent emial to you!");
    // await sendMail(
    //   "jon@jonwexler.com",
    //   campaignMail("Special Promotion", "promo1", "jon@jonwexler.com"),
    // );
  });
};
