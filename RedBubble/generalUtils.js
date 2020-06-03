//general utils.js

//Takes strings of html elements and appendeds it to the selector
function createElements(elements, selector) {
    log("createElements Enter", true);
    //append element to selector
    $(selector).append(elements);
}

//waits for a jQuery element to exist then runs callback function
//syntax waitForElement(jQuery selector, function onec element exists, timout in milliseconds)
function waitForElement(selector, callback) {
    log("waitForElement Enter", true);
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
    //log("arryElements Enter", true);
    //Create an array of all (...) settings buttons
    var elemCount = $(element).length;
    var elemArr = new Array(elemCount);
    elemArr = $(element).each($).toArray();

    return elemArr;
}

//Will sleep until ms number of milliseconds have passed

/*
ms = milliseconds to sleep

//synchronous
sleep(ms).then(function() { //do stuff });

//asynchronous
await sleep(ms);

 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
