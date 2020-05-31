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

var debug = true;
var ms = 100; //number of milliseconds for timers

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
//forceOn overload is not required, if passed true the logger will output even if debug is false
function logger(data, forceOn) {

    if (forceOn == null) { //check forceOn
        forceOn = false;
    }

    if (debug || forceOn) { //if debug or forceOn are true
        var call = logger.caller.name; //get caller function
        var ts = timestamp(); //get a timestamp

        //Log caller function, timestamp, and log data
        console.log(
            "Caller Function | " + call
             + "\nTimestamp | " + ts
             + "\n	Log | " + data);
    }
}

//Takes strings of html elements and appendeds it to the selector
function createElements(elements, selector) {
    logger(selector);

    //append element to selector
    $(selector).append(elements);
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

//saveBtn function
function save() {
    logger("Enter Save");
}

//Creates the save button
function createSave(select) {
    logger("createSave Start");
    var saveButtonElement = '<div><input type="button" value="Save All" class="saveBtn"/></div>'; //saveBtn html

    //run createElements with saveButtonElement as element, and select as append location
    createElements(saveButtonElement, select);

    //Add save() function to btn click
    $('.saveBtn').click(function () {
        save(); //save button function
    });
    logger("createSave end");
}

//will be run when script loads
function run() {
    logger("run Start");

    var select = ".node_modules--redbubble-design-system-react-Box-styles__box--206r9.node_modules--redbubble-design-system-react-Text-styles__text--NLf2i.node_modules--redbubble-design-system-react-Text-styles__display1--2XY2m";

    //check every ms for select to exist, when exists runs createSave
    waitForElement(select, createSave, ms);
    logger("run End");
}

//When script loads run();
run();
