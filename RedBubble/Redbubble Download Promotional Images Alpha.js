// ==UserScript==
// @name         Redbubble Download Promotional Images
// @namespace    http://tampermonkey.net/
// @version      0.3.4
// @description  Downloads all promo images from a RedBubble promotion page
// @author       Dylan Nonya
// @match        https://www.redbubble.com/studio/promote/*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @resource		 customCSS https://raw.githubusercontent.com/DylanBanta/Tampermonkey/master/RedBubble/savebtn.css
// @grant         GM_getResourceText
// @grant         GM_addStyle
// @run-at document-end
// ==/UserScript==

//Add custom css
var cssTxt = GM_getResourceText("customCSS");
GM_addStyle(cssTxt);

//returns a 12 hour clock timestamp
//MM/DD/YYYY HH:MM:SS AM/PM
function timestamp() {
    var cd = new Date(); //current date
    var month = (cd.getMonth() + 1);
    var year = cd.getFullYear();
    var date = cd.getDate();
    var hours = cd.getHours();
    var min = cd.getMinutes();
    var sec = cd.getSeconds();
    var amBool = "AM";

    if (hours == 0) {
        hours = 12; //0 is 12 am
    } else if (hours > 12) { //24 hour clock to 12 hour
        hours = hours - 12;
        amBool = "PM";
    }

    if (min <= 9) {
        min = "0" + min;
    }

    if (sec <= 9) {
        sec = "0" + sec;
    }

    var stamp = month + "/"
         + date + "/"
         + year + " "
         + hours + ":"
         + min + ":"
         + sec + " "
         + amBool;

    return stamp;
}

//Custom console log, will output caller function and a timestamp in addition to each log
function logger(data) {
	var call = logger.caller.name; //get caller function
    var ts = timestamp(); //get a timestamp
    
	//Log caller function, timestamp, and log data
    console.log(
        "Caller Function | " + call
         + "\nTimestamp | " + ts
         + "\n	Log | " + data);
}

//Creates an element and appendeds it to selector
function createElements(selector) {
    logger(selector);

    //Create Download div
    $(selector).append('<div class="downloadAll">');

    //apply css for class customCss
    $('.downloadAll').append('<input type="button" value="Save All" class="saveBtn"/> '); //Save Settings Button

    //Close div
    $(selector).append('</div>'); //close chainChecker div

    //Save UI Button
    $('.saveBtn').click(function () {
        save(); //save button function
    });
}

function save() {
    logger("Save");
}

//waits for a jQuery element to exist then runs callback function
//syntax waitForElement(jQuery selector, function onec element exists, timout in milliseconds)
function waitForElement(selector, callback, ms) {
    if ($(selector).length) {
        callback(selector);
    } else {
        setTimeout(function () {
            waitForElement(selector, callback);
        }, ms);
    }
}

function run() {

    logger("run start");
    var select = ".node_modules--redbubble-design-system-react-Box-styles__box--206r9.node_modules--redbubble-design-system-react-Text-styles__text--NLf2i.node_modules--redbubble-design-system-react-Text-styles__display1--2XY2m";
    waitForElement(select, createElements, 100);
    logger("run end");
}

run();
