// ==UserScript==
// @name         FLAT Profit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Torn City Trade Price Calculator
// @author       Fuzzyketchup[2206068]
// @match        https://www.torn.com/trade.php*
// @grant        none
// ==/UserScript==

function onLoad() {
    var contents = '';
    var data = '<div class="m-top10" style=""><div class="title-red top-round" role="heading" aria-level="5"> <span class="tutorial-title">Trade Calculator</span></div><div class="tutorial-desc bottom-round cont-gray p10" tabindex="0"><p><div class="tradeCalc">' + contents + '</div></p></div><hr class="page-head-delimiter m-top10"></div>';
    var colorsArr = ['color1', 'color2', 'color3', 'color4', 'color8']; //Money, Items, Properties, Stock, Company

    var lUser = $('.user.left');
    var lName = $('.name.left');

    var users = document.querySelectorAll(".cont");
    var leftUser = users[0];
    var rightUser = users[1];
    var leftColors = [leftUser.querySelector(".color1"), leftUser.querySelector(".color2"), leftUser.querySelector(".color3"), leftUser.querySelector(".color4")];
    var leftTrade = [];


    var list = lUser.find(lName).text();
    $('.content-title.m-bottom10').append(data);
    $('.tradeCalc').html(list);
}

$(window).load(function() {
    onLoad();
});