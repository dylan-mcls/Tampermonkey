// ==UserScript==
// @name         Torn City | Trade Calculator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Fuzzyketchup [2206068]
// @match        https://www.torn.com/trade.php
// @grant        none
// ==/UserScript==

function log(text){
    console.log(text);
}

function onLoad(){
  var users = document.querySelectorAll(".cont");
  var leftUser = users[0];
  var rightUser = users[1];
  var leftColors = [leftUser.querySelector(".color1"), leftUser.querySelector(".color2"), leftUser.querySelector(".color3"), leftUser.querySelector(".color4")];
  var leftTrade = [];


  for(var i = 0; i < leftColors.length; i++){
    var text = leftColors[i].querySelector("ul").querySelectorAll("li");
    log("text.length "+i+" | " + text.length);
    for(var j = 0; j < text.length; j++){
      text[j].querySelector(".name.left");
      log("text["+j+"] | " + text[j].innerText);
      leftTrade.push(text[j].innerText);
    }
    //log("leftColors["+i+"] text | " + text);
  }

  //var text = leftColors[i].querySelector("ul").querySelector("li").querySelector(".name.left").innerText;
  //var leftColors = leftUser.querySelector(".color1").querySelector("ul").querySelector("li").querySelector(".name.left").innerText;
  //log("leftColors | " + leftColors);
}

//Wait for the page to finished loading then run checkChain()
$(window).load(function(){
    onLoad();
});
