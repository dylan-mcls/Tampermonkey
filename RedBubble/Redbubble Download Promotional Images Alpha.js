// ==UserScript==
// @name         Redbubble Download Promotional Images
// @namespace    http://tampermonkey.net/
// @version      0.4.0
// @description  Downloads all promo images from a RedBubble promotion page
// @author       Dylan Nonya
// @match        https://www.redbubble.com/studio/promote/*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      http://creativecouple.github.com/jquery-timing/jquery-timing.min.js
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

    if (debug && forceOn != false || forceOn) { //if debug or forceOn are true
        var call = logger.caller.name; //get caller function
        var ts = timestamp(); //get a timestamp

        //Log caller function, timestamp, and log data
        console.log(
            "Log | " + data
             + "\n	Caller Function | " + call
             + "\n	Timestamp | " + ts);
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

//https://stackoverflow.com/questions/15504921/asynchronous-loop-of-jquery-deferreds-promises?answertab=votes#tab-top
function doTask(taskNum) {
	logger("doTask Enter");
    var time = Math.floor(Math.random() * 3000);

    setTimeout(function () {
        console.log(taskNum);
        dequeTask();
    }, time)
}

function createTask(taskNum) {
	logger("createTask Enter");
    return function () {
        doTask(taskNum);
    }
}

function queueTask(tasks) {
	logger("queTask Enter");
    //Loops through task array
    for (var i in tasks) {
        $(document).queue('tasks', function(){
			createTask(tasks[i]);
		});
    }

    //Add a logger to the end of the task stating that all tasks have been completed
    $(document).queue('tasks', function () {
        logger("All tasks completed");
    });
}

function dequeueTask() {
    $(document).dequeue('tasks');
}

//Feed class string for html elemnt, returns array of all matching elements
function findElement(element) {
    //Create an array of all (...) settings buttons
    var elemCount = $(element).length;
    var elemArr = new Array(elemCount);
    elemArr = $(element).each($).toArray();

    return elemArr;
}

function clickBtn(btn) {
	logger("click");
    btn.click();
}

function ariaHidden() {
    var dlImg = ".node_modules--redbubble-design-system-react-Popover-styles__popover--3R4aF.node_modules--redbubble-design-system-react-Popover-styles__medium--PRJnY";

    var dlArr = findElement(dlImg);
    for (var i = 0; i < dlArr.length; i++) {
		logger("i | " + i + "\ndlArr | " + $(dlArr)[i]);
	}
}

//saveBtn function
function save() {
    logger("Enter Save");

    var btns = ".node_modules--redbubble-design-system-react-Button-styles__button--1wSNn.node_modules--redbubble-design-system-react-Button-styles__neutral--17MuV.node_modules--redbubble-design-system-react-Button-styles__circle--3zgIv.node_modules--redbubble-design-system-react-Button-styles__small--127Kw";

    var btnArr = findElement(btns);

    var taskArr = [];

	for (var i in btnArr){
		if (i == 0) {
			clickBtn(btnArr[i]);
            taskArr.push(ariaHidden);
			queueTask(taskArr);
        }
	}

    /*
    TODO Functions for task list
    Find all select buttons //Task 0
    Return current button //Task 0{ LOOP START
    Click Current Button //Task 1
    WAIT for button click //Task 2
    Find aria-hidden false Download Images Button //Task 2
    Click Download Images Button //Task 2
    WAIT for button click //Task 3
    Find all download buttons for selected options //Task 3
    Add EACH option to the queue //Task 4, 5, 6, 7, and 8 (in thie pseudocode example)
    Close current Download page. //Task 9
    } LOOP again starting at task 10 until task 0 is complete
     */

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
