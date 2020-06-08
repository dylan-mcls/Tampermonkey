// ==UserScript==
// @name         Redbubble Get Promotional Image URLs
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Gets urls for all promo images from a RedBubble promotion page and saves a txt file contianing urls
// @author       Dylan Banta
// @match        https://www.redbubble.com/studio/promote/*
// @require 	 https://greasyfork.org/scripts/404462-my-logger-util/code/My_Logger_Util.js?version=812560
// @require 	 https://greasyfork.org/scripts/404600-my-general-utils/code/My_General_Utils.js?version=812567
// @require 	 https://greasyfork.org/scripts/404687-file-saver-util/code/File_Saver_Util.js?version=812568
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require 	 https://greasyfork.org/scripts/404687-file-saver-util/code/File_Saver_Util.js?version=812564
// @resource 	 customCSS https://raw.githubusercontent.com/DylanBanta/Tampermonkey/master/RedBubble_Get_Promotional_Image_URLs/savebtn.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at document-end
// ==/UserScript==

//Global vars
var btnCount = 0;
var title;
var outputArr = [];
var productArr = [];

//Calls custom log util
function log(logs, forceOn) {
    var call = log.caller.name; //get caller function
    var debug = false;
    logger(logs, debug, call, forceOn);
}

//Custom css
var cssTxt = GM_getResourceText("customCSS");
GM_addStyle(cssTxt);

//will be run when script loads
function run() {
    log("run Enter", true);

    var settingsBtns = ".node_modules--redbubble-design-system-react-Box-styles__box--206r9.node_modules--redbubble-design-system-react-Text-styles__text--NLf2i.node_modules--redbubble-design-system-react-Text-styles__display1--2XY2m";
    waitForElement(settingsBtns, createSaveBtn);
}

//Creates the save button on the page
function createSaveBtn(select) {
    log("createSaveBtn Enter", true);
    var saveButtonElement = '<div><input type="button" value="Save All" class="saveBtn"/></div>'; //saveBtn html
    title = $(".node_modules--redbubble-design-system-react-Box-styles__box--206r9.node_modules--redbubble-design-system-react-Text-styles__text--NLf2i.node_modules--redbubble-design-system-react-Text-styles__display1--2XY2m").text().replace(/ /g,"_") + "_";
    log("title | " + title);
    //run createElements with saveButtonElement as element, and select as append location
    createElements(saveButtonElement, select);
    //Add save() function to btn click
    $('.saveBtn').click(function () {
        save(); //save button function
    });
}

//saveBtn function
async function save() {
    // Select the buttons that open the download menu from the DOM
    const $buttons = document.querySelectorAll(".node_modules--redbubble-design-system-react-Button-styles__small--127Kw");
    // For every button found, run the following

    var imgArr = [];

    for (const $button of $buttons) {
        if (btnCount != 0) {
            // Click the button
            log($button);
            $button.click();
            // Wait 50ms because menu doesn't immediately open
            await sleep(50);
            // Select the download button (its really a list item) from the DOM
            const $download = document.querySelector("li[id$=item-0]");
            // Click the download button
            $download.click();
            // Do everything needed when a modal is opened
            await modal()
            // Wait 50ms before performing the next iteration
            await sleep(50);
            btnCount++;
        } else {
            btnCount++;
        }
    }

    var fileData;

    for (var i = 0; i < outputArr.length; i++) {
		var output = outputArr[i];
		
		if(i == 0){
			fileData = productArr[i];
		} else {
			fileData = fileData + "\n" + productArr[i];
		}
		
        for (var j = 0; j < output.length; j++) {
            log("outputArr[" + i + "][" + j + "] | " + output[j], true);
            fileData = fileData + "\n" + output[j];
        }
    }
	var urlData = window.location.href.split("/");
	var productID = urlData[urlData.length-1];
    saveLocalFile(fileData, title +  productID + "_urls.txt");

}

function saveToFile(data) {
    log("saveToFile Enter");
    var userInput = document.getElementById("myText").value;
    var txt = getCurrentProductID + "_product_urls.txt";
    var blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, txt);
}

/*
This function runs every time a new modal is opened
It is defined with the async keyword which lets us use await inside the function
 */
async function modal() {

    var modalArr = [];
    // Wait for 1.5 seconds for that dumb loading icon to go away
    await sleep(2000);
    // Select the modal element from the DOM
    const $modal = document.querySelector(".node_modules--redbubble-design-system-react-Modal-ModalCard-styles__card--zujT9");
    // Select all the img elements from the modal element
	
	const product = $(".node_modules--redbubble-design-system-react-Box-styles__box--206r9.node_modules--redbubble-design-system-react-Text-styles__text--NLf2i.node_modules--redbubble-design-system-react-Text-styles__display2--3ZwPH.node_modules--redbubble-design-system-react-Box-styles__display-block--2XANJ").text();
	
	
    const $images = $modal.querySelectorAll("img");
    // Get the last image found and scroll it into view to lazy load all the images in the modal
    $images[$images.length - 1].scrollIntoView({
        behavior: "smooth"
    });
    // Wait 1 second for the images to finish loading
    await sleep(1000);
    // For each image element in the array (technically an array-like object), log the src attribute of the image
    $images.forEach(img => {
        var sourceImg = img.getAttribute("src");
        modalArr.push(sourceImg);
    })
	productArr.push(product);
    outputArr.push(modalArr);
    // Select the close button from the DOM
    const $close = document.querySelector("button[aria-label='Dismiss modal']")
        // Click the close button
        $close.click();
}
//When script loads run();
run();
