// ==UserScript==
// @name         Redbubble Download Promotional Images
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Downloads all promo images from a RedBubble promotion page
// @author       Dylan Nonya
// @match        https://www.redbubble.com/studio/promote/*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/--version--/jquery.min.js
// @require      http://creativecouple.github.com/jquery-timing/jquery-timing.min.js
// @grant        none
// ==/UserScript==

//Css variables
var customCss = ".customCss{}";

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

(function() {
    'use strict';

    //Element that must be loaded before script runs
    var select = $(".node_modules--redbubble-design-system-react-Box-styles__alignItems-center--2ayqI");

    //feed an element and script will wait until that elemnt exists
    var waitForEl = function(selector, callback) {
        if (jQuery(selector).length) {
            callback();
        } else {
            setTimeout(function() {
                waitForEl(selector, callback);
            }, 100);
        }
    };

    //once the element exists, create save button
    waitForEl(select, function() {

        //Create callYourHitsDiv div
        $(select).append(' <span id="downloadAllDiv">');

        //Create CSS Styles
        $('#downloadAllDiv').append('<style>'+customCss+'</style>'); //apply css for class customCss
        $('#downloadAllDiv').append('<input type="button" value="Save All" class="customCss" id="saveBtn"/> '); //Save Settings Button

        //Close div
        $(select).append('</span>'); //close chainChecker div

        //Save UI Button
        $('#saveBtn').click(function(){
            save(); //save button function
        });
    });

    //on save button click
    function save(){
        console.log("Save");

        //Page class data
        var optionsBtn = ".node_modules--redbubble-design-system-react-Button-styles__button--1wSNn.node_modules--redbubble-design-system-react-Button-styles__neutral--17MuV.node_modules--redbubble-design-system-react-Button-styles__circle--3zgIv.node_modules--redbubble-design-system-react-Button-styles__small--127Kw";
        var clik = ".node_modules--redbubble-design-system-react-Popover-styles__popover--3R4aF.node_modules--redbubble-design-system-react-Popover-styles__medium--PRJnY";
        var modu = ".node_modules--redbubble-design-system-react-Modal-ModalCard-styles__card--zujT9";
        var fnds = "#downshift-";
        var fnde = "-item-0";
        var fnd;
        var dwnl = ".node_modules--redbubble-design-system-react-Button-styles__button--1wSNn.node_modules--redbubble-design-system-react-Button-styles__neutral--17MuV.node_modules--redbubble-design-system-react-Button-styles__elevation--2fhDh.node_modules--redbubble-design-system-react-Button-styles__elevationLow--3NTre.node_modules--redbubble-design-system-react-Button-styles__circle--3zgIv.node_modules--redbubble-design-system-react-Button-styles__medium--1QKLW";
        var close = ".node_modules--redbubble-design-system-react-Modal-ModalOverlay-styles__underlay--3eFGe";

        //true false bool
        var tf;
        var btns;
        var btnCnt;
        var nj;
        var cls;

        var v;
        var w;
        var x;

        //Finds each options button on the page
        $(optionsBtn).each($).wait(100, function(i) {
            v = $(optionsBtn)[i]; //assigns current options button to v
            if(i!=0) {
                console.log(v);
                $(v).click();

                $(clik).each($).wait(1, function(j) {
                    w = $(clik)[j];
                    tf = $(w).attr("aria-hidden");
                    if(tf == "false"){ //Finds non-hidden option
                        console.log("FALSE!");
                        console.log($(w));
                        console.log("j | " + j);
                        nj = j - 1;
                        fnd = fnds + nj + fnde;
                        $(w).find(fnd).click(); //click Download option, opens download screen for product
                        console.log("Download Screen Open");
                        $(btns).each($).wait(1000, function(k) {
                            btns = $(modu).find(":button");
                            btnCnt = btns.length;
                            if(k==btnCnt){
                                console.log("TEST");
                                console.log(btnCnt);
                            }
                            x = $(btns)[k];
                            console.log($(x));
                            $(x).click();
                            console.log("click");
                        })
                    }
                })
            }

        });
    }
})();
