// ==UserScript==
// @name         Redbubble Download Promotional Images BETA
// @namespace    http://tampermonkey.net/
// @version      BETA 1.0.0
// @description  (*IN DEVELOPMENT*) Downloads all promo images from a RedBubble promotion page
// @author       Dylan Nonya
// @match        https://www.redbubble.com/studio/promote/*
// @require      https://greasyfork.org/scripts/404462-my-logger-util/code/My_Logger_Util.js?version=811196
// @require 	 https://greasyfork.org/scripts/404464-task-array-util/code/Task_Array_Util.js?version=811281
// @require 	 https://greasyfork.org/scripts/404600-my-general-utils/code/My_General_Utils.js?version=812027
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require 	 https://greasyfork.org/scripts/404470-timing-jquery/code/Timing_JQuery.js?version=811203
// @resource 	 customCSS https://raw.githubusercontent.com/DylanBanta/Tampermonkey/master/RedBubble/savebtn.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at document-end
// ==/UserScript==

//Calls custom log util
function log(logs, forceOn) {
    var call = log.caller.name; //get caller function
    var debug = true;
    logger(logs, debug, call, forceOn);
}

const ms = 100; //number of milliseconds for timers

//const class elements from RedBubble
const ariaSelector = ".node_modules--redbubble-design-system-react-Popover-styles__popover--3R4aF.node_modules--redbubble-design-system-react-Popover-styles__medium--PRJnY";

const modu = ".node_modules--redbubble-design-system-react-Modal-ModalCard-styles__card--zujT9";

const waiter = ".node_modules--redbubble-design-system-react-Box-styles__box--206r9.shared-components-pages-PromotePage-AvailableProducts-AvailableProducts__modalAssetCard--3WR4C";

const dwnlBtns = ".node_modules--redbubble-design-system-react-Button-styles__button--1wSNn.node_modules--redbubble-design-system-react-Button-styles__neutral--17MuV.node_modules--redbubble-design-system-react-Button-styles__circle--3zgIv.node_modules--redbubble-design-system-react-Button-styles__small--127Kw";

var settingsBtns = ".node_modules--redbubble-design-system-react-Box-styles__box--206r9.node_modules--redbubble-design-system-react-Text-styles__text--NLf2i.node_modules--redbubble-design-system-react-Text-styles__display1--2XY2m";

var closeBtn = ".node_modules--redbubble-design-system-react-Modal-ModalOverlay-styles__dismiss--Y3Ul2";

const downshift = "#downshift-";
const item0 = "-item-0";

//Custom css
var cssTxt = GM_getResourceText("customCSS");
GM_addStyle(cssTxt);

//will be run when script loads
function run() {
    log("run Enter", true);
    //check every ms for select to exist, when exists runs createSaveBtn
    waitForElement(settingsBtns, createSaveBtn);
}

//Creates the save button on the page
function createSaveBtn(select) {
    log("createSaveBtn Enter", true);
    var saveButtonElement = '<div><input type="button" value="Save All" class="saveBtn"/></div>'; //saveBtn html

    //run createElements with saveButtonElement as element, and select as append location
    createElements(saveButtonElement, select);

    //Add save() function to btn click
    $('.saveBtn').click(function () {
        save(); //save button function
    });
}

//saveBtn function
function save() {
    log("save Enter", true);

    var btnArr = arryElements(dwnlBtns);
    var taskArr = [];
    var data;

    for (var i = 0; i < btnArr.length; i++) {
        if (i <= 1) {
            data = $(btnArr)[i];
            data.click();
            waitForAria();
            downloadImages();
        }
    }
}

function waitForAria() {
    log("waitForAria enter", true);

    //vars to check for aria-hidden value
    var hideCheck;
    var hideVal;
    var args;

    //child element vars for Download Images button
    var child;
    var nj; //j--

    //for each ariaSelector, wait 1ms, then run function
    $(ariaSelector).each($).wait(1, function (j) {
        hideVal = $(ariaSelector)[j];
        hideCheck = $(hideVal).attr("aria-hidden");
        if (hideCheck == "false") { //Download Images button visible
            nj = j - 1;
            child = downshift + nj + item0; //child element attributes
            $(hideVal).find(child).click(); //clicks Download Images button
        }
    });
}

function downloadImages() {
    log("downloadImages enter", true);    

    var holder;

	setTimeout(function () {
        clickDwnlBtns();
	}, 5000);
		
		
	/*
	waitForElement(waiter, function () {
        clickDwnlBtns(modu);
    });
	*/
}

function clickDwnlBtns() {
    log("clickDwnlBtns enter", true);
	
	var btns;
	
	var jqModu = $(modu);
    var btns = jqModu.find("img").each(function() {
        var source = $(this).attr("src");
		log("source | " + source);
    });
	
	setTimeout(function () {
        closeDownload();
	}, 1500);
}

function closeDownload() {
    log("closeDownload enter", true);
	
	$(closeBtn).click();
}

//When script loads run();
run();