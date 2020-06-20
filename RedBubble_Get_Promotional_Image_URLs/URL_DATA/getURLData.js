var currentFile;
const templateFile = "urlTemplate.txt";
var templateList = [];

var list = [];
var fullList = [];

function getTemplate() {
  console.log("getTemplate enter");
  var fs = require('fs');
  fs.readFile('test.txt', "utf-8", function(err, data) {
      if (err) throw err;
      var array = Array.from(data); //convert char array
      console.log(array);
    }
  }

  function fileSelector(event) {
    console.log("fileSelector enter");
    fullList = [];
    var fileList = event.target.files;
    var currentList;
    for (var i = 0; i < fileList.length; i++) {
      currentList = readFile(fileList[i]);
    }
    console.log(fullList);
  }

  function readFile(file) {
    console.log("readFile enter");
    var reader = new FileReader();
    reader.onload = function(progressEvent) {
      var lines = this.result.split('\n');
      list = [];
      for (var line = 0; line < lines.length; line++) {
        list.push(lines[line]);
      }
      fullList.push(list);
      // for(var i = 0; i <list.length; i++){
      //   console.log(list[i]);
      // }
    }
    reader.readAsText(file);
  }

  getTemplate();
