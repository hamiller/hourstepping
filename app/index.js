import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { me as appbit } from "appbit";
import { minuteHistory, today } from "user-activity";
import { locale } from "user-settings";
import { battery } from "power";
import { display } from "display";


// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const hourLeft = document.getElementById("hourLeft");
const hourRight = document.getElementById("hourRight");
const minLeft = document.getElementById("minLeft");
const minRight = document.getElementById("minRight");
const colon = document.getElementById("colon");
const hourSteps = document.getElementById("hourSteps");
const daySteps = document.getElementById("daySteps");
const dayCal = document.getElementById("dayCal");
const date = document.getElementById("date");
const day = document.getElementById("day");
const bat = document.getElementById("bat");
const blut = document.getElementById("blut");

const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
let colonDisplayed = true;
let doIt = true;

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  if (doIt) {
    let todayDate = evt.date;
    let hours = util.zeroPad(todayDate.getHours());
    let mins = util.zeroPad(todayDate.getMinutes());

    hourLeft.text = `${parseInt(hours/10)}`;
    hourRight.text = `${hours%10}`;
    minLeft.text = `${parseInt(mins/10)}`
    minRight.text = `${mins%10}`
    blink();

    day.text = `${days[todayDate.getDay()]}`;
    date.text = `${todayDate.getDate()}.${todayDate.getMonth() + 1}.`;

    bat.text = `${Math.floor(battery.chargeLevel)}%`;

    if (appbit.permissions.granted("access_activity")) {
      const minuteRecords = minuteHistory.query({ limit: Number(mins) });
      daySteps.text = `${today.adjusted.steps}`;
      dayCal.text = `${today.adjusted.calories}`;

      let sum = 0;
      minuteRecords.forEach((minute, index) => {
        sum += minute.steps;
      });
      hourSteps.text = `${sum}`;
    }
  }
}

function blink() {
  if (colonDisplayed) {
    colon.text = ""; 
    colonDisplayed = false;
  }
  else {
     colon.text = ":";
     colonDisplayed = true;
  }
}

display.addEventListener("change", () => {
   if (display.on) {
     // start sensors
     doIt = true;
   } else {
     // stop sensors
     doIt = false;
   }
});