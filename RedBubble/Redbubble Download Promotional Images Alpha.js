// ==UserScript==
// @name         Redbubble Download Promotional Images
// @namespace    http://tampermonkey.net/
// @version      0.4.0
// @description  Downloads all promo images from a RedBubble promotion page
// @author       Dylan Nonya
// @match        https://www.redbubble.com/studio/promote/*
// @require 	 https://greasyfork.org/scripts/404462-my-logger-util/code/My_Logger_Util.js?version=811167
// @require 	 https://greasyfork.org/scripts/404464-task-array-util/code/Task_Array_Util.js?version=811172
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      http://creativecouple.github.com/jquery-timing/jquery-timing.min.js
// @resource 	 customCSS https://raw.githubusercontent.com/DylanBanta/Tampermonkey/master/RedBubble/savebtn.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at document-end
// ==/UserScript==

var ms = 100; //number of milliseconds for timers

//Add custom css
var cssTxt = GM_getResourceText("customCSS");
GM_addStyle(cssTxt);

function log(logs, forceOn) {
    var debug = true;
    logger(logs, debug, forceOn);
}

//Takes strings of html elements and appendeds it to the selector
function createElements(elements, selector) {
    log(selector);
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

//Feed class string for html elemnt, returns array of all matching elements
function arryElements(element) {
    //Create an array of all (...) settings buttons
    var elemCount = $(element).length;
    var elemArr = new Array(elemCount);
    elemArr = $(element).each($).toArray();

    return elemArr;
}

function clickBtn(btn) {
    log("click");
    btn.click();
}

function ariaHidden() {
    var dlImg = ".node_modules--redbubble-design-system-react-Popover-styles__popover--3R4aF.node_modules--redbubble-design-system-react-Popover-styles__medium--PRJnY";

    var dlArr = arryElements(dlImg);
    for (var i = 0; i < dlArr.length; i++) {
        log("i | " + i + "\ndlArr | " + $(dlArr)[i]);
    }
}

function func(num){
	logger(num);
}

//saveBtn function
function save() {
    log("Enter Save");

    var btns = ".node_modules--redbubble-design-system-react-Button-styles__button--1wSNn.node_modules--redbubble-design-system-react-Button-styles__neutral--17MuV.node_modules--redbubble-design-system-react-Button-styles__circle--3zgIv.node_modules--redbubble-design-system-react-Button-styles__small--127Kw";

    var btnArr = arryElements(btns);
	
	var taskArr = [logger(1), logger(2), logger(3)];
	
	queueTask(taskArr);
	
    /*
	for (var i in btnArr) {
        if (i == 0) {
            clickBtn(btnArr[i]);
            taskArr.push(ariaHidden);
            queueTask(taskArr);
        }
    }
	*/

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
    log("createSave Start");
    var saveButtonElement = '<div><input type="button" value="Save All" class="saveBtn"/></div>'; //saveBtn html

    //run createElements with saveButtonElement as element, and select as append location
    createElements(saveButtonElement, select);

    //Add save() function to btn click
    $('.saveBtn').click(function () {
        save(); //save button function
    });
    log("createSave end");
}

//will be run when script loads
function run() {
    log("run Start");

    var select = ".node_modules--redbubble-design-system-react-Box-styles__box--206r9.node_modules--redbubble-design-system-react-Text-styles__text--NLf2i.node_modules--redbubble-design-system-react-Text-styles__display1--2XY2m";

    //check every ms for select to exist, when exists runs createSave
    waitForElement(select, createSave, ms);
    log("run End");
}

//When script loads run();
run();
