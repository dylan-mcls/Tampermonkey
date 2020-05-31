// ==UserScript==
// @name         Redbubble Download Promotional Images
// @namespace    http://tampermonkey.net/
// @version      0.3.1
// @description  Downloads all promo images from a RedBubble promotion page
// @author       Dylan Nonya
// @match        https://www.redbubble.com/studio/promote/*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @grant        none
// ==/UserScript==

//Css variables
var customCss = ".customCss{}";

function cLog(str) {
    console.log(str);
}

function createElements() {
    var select = $("node_modules--redbubble-design-system-react-Box-styles__box--206r9.node_modules--redbubble-design-system-react-Text-styles__text--NLf2i.node_modules--redbubble-design-system-react-Text-styles__display1--2XY2m");

    //Create Download div
    $(select).append(' <span id="downloadAllDiv">');

    //Create CSS Styles
    $('#downloadAllDiv').append('<style>' + customCss + '</style>'); //apply css for class customCss
    $('#downloadAllDiv').append('<input type="button" value="Save All" class="customCss" id="saveBtn"/> '); //Save Settings Button

    //Close div
    $(select).append('</span>'); //close chainChecker div

    //Save UI Button
    $('#saveBtn').click(function () {
        save(); //save button function
    });
}

function save(){
	cLog("Save");
}

createElements();
cLog("Test");
