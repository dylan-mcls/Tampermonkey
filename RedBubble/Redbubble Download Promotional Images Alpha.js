// ==UserScript==
// @name         Redbubble Download Promotional Images
// @namespace    http://tampermonkey.net/
// @version      0.3.4
// @description  Downloads all promo images from a RedBubble promotion page
// @author       Dylan Nonya
// @match        https://www.redbubble.com/studio/promote/*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @grant        none
// @run-at document-end
// ==/UserScript==

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

    var data = month + "/"
         + date + "/"
         + year + " "
         + hours + ":"
         + min + ":"
         + sec + " "
         + amBool;

    return data;
}

function cLog(log) {
    var ts = timestamp();

    var call = cLog.caller.name;
    console.log(
        "Caller Function | " + call
         + "\nTimestamp | " + ts
         + "\n	Log | " + log);
}

function createElements(selector) {
    cLog(selector);
    //Css variables
    var cssHref = "";

    //Create Download div
    $(selector).append('<span id="downloadAllDiv">');

    //Create CSS Styles
    $('#downloadAllDiv').append('<link rel="stylesheet" href="' + cssHref + '">'); //apply css for class customCss
    $('#downloadAllDiv').append('<input type="button" value="Save All" class="customCss" id="saveBtn"/> '); //Save Settings Button

    //Close div
    $(selector).append('</span>'); //close chainChecker div

    //Save UI Button
    $('#saveBtn').click(function () {
        save(); //save button function
    });
}

function save() {
    cLog("Save");
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

    cLog("run start");
    var select = ".node_modules--redbubble-design-system-react-Box-styles__box--206r9.node_modules--redbubble-design-system-react-Text-styles__text--NLf2i.node_modules--redbubble-design-system-react-Text-styles__display1--2XY2m";
    waitForElement(select, createElements, 100);
    cLog("run end");
}

run();
