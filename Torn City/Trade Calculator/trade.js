// ==UserScript==
// @name         FLAT Profit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Torn City Trade Price Calculator
// @author       Fuzzyketchup[2206068]
// @match        https://www.torn.com/trade.php*
// @grant        none
// ==/UserScript==

/*
var contents = '';
var htmlData = '<div class="m-top10" style=""><div class="title-red top-round" role="heading" aria-level="5"> <span class="tutorial-title">Trade Calculator</span></div><div class="tutorial-desc bottom-round cont-gray p10" tabindex="0"><p><div class="tradeCalc">' + contents + '</div></p></div><hr class="page-head-delimiter m-top10"></div>';
var colorsArr = ['color1', 'color2', 'color3', 'color4', 'color8']; //Money, Items, Properties, Stock, Company

var lUser = $('.user.left');
var lName = $('.name.left');
var rUser = $('.user.right');
var rName = $('.name.right');

// var users = document.querySelectorAll(".cont");
// var leftUser = users[0];
// var rightUser = users[1];
// var leftColors = [leftUser.querySelector(".color1"), leftUser.querySelector(".color2"), leftUser.querySelector(".color3"), leftUser.querySelector(".color4")];
// var leftTrade = [];

console.log('lUser.length', lUser.length);
var list = lUser.find(lName).text();

$('.content-title.m-bottom10').append(htmlData);
$('.tradeCalc').html(list);
*/

function logArr(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
    }
}

function querySel(user) {
    var colors = [user.querySelector(".color1"), user.querySelector(".color2"), user.querySelector(".color3"), user.querySelector(".color4"), user.querySelector(".color8")];
    return colors;
}

function getLiData(query) {
    if (query[0] != null) {
        var liData = new Array();
        for (var i = 0; i < query.length; i++) {
            liData.push(query[i].querySelector("ul").querySelectorAll("li"));
        }
        return liData;
    } else {
        return null;
    }
}

function buildOutArr(liArr) {
    var data;
    var priceArr = new Array();
    var itemArr = new Array();
    var propArr = new Array();
    var stockArr = new Array();
    var outArr = new Array();

    for (var i = 0; i < liArr.length; i++) {
        for (var j = 0; j < liArr[i].length; j++) {
            data = liArr[i][j].querySelector(".name.left").innerText;
            //console.log(data);

            switch (i) {
                case 0:
                    priceArr.push(data);
                    break;
                case 1:
                    itemArr.push(data);
                    break;
                case 2:
                    propArr.push(data);
                    break;
                case 3:
                    stockArr.push(data);
                default:
                    break;
            }
        }
    }

    outArr.push(priceArr);
    outArr.push(itemArr);
    outArr.push(propArr);
    outArr.push(stockArr);

    return outArr;
}

function onLoad() {
    var users = document.querySelectorAll(".cont");
    var leftUser = users[0];
    var rightUser = users[1];

    var leftQuery = querySel(leftUser);
    var rightQuery = querySel(rightUser);

    var leftLi = getLiData(leftQuery);
    var rightLi = getLiData(rightQuery);

    var leftOut = buildOutArr(leftLi);

    for (var i = 0; i < leftOut.length; i++) {
        for (var j = 0; j < leftOut[i].length; j++) {
            console.log('leftOut[' + i + '][' + j + '] | ' + leftOut[i][j]);
        }
    }

    var rightOut = buildOutArr(rightLi);
}

$(window).load(function() {
    onLoad();
});