"use strict";

var selectChapter = function(game){};

selectChapter.prototype = {
    preload : function(){
        game.load.pack("select-chapter-asset", "assets/asset-pack-1.json");
    },
    create : function(){
        this.titleBackground = game.add.image(0,0,"select-chapter-background");
        console.log("selectChapter is loaded.");
    }
};

var pageNum = 1;
var selectChapterButton = [];
var leftArrow;
var rightArrow;


function PrepareUI(){
    // Image property
    var arrowWidth = 85;
    var arrowHeight = 55;
    var selectChapterButtonWidth = 77;
    var selectChapterButtonHeight = 77;
    // Space
    var arrowSpace = 10;   
    var btnSelectChapterSpace = 5;
    //Number
    var btnNumber = 3;
    
    // Calculate Center :: Equation is fixible for changing parameter above.
    var leftSpace = (game.width - (arrowWidth * 2 + arrowSpace * 2 +
                    btnNumber * arrowWidth + (btnNumber - 1) * btnSelectChapterSpace)) / 2;
    var topSpace = (game-height - max(selectChapterButtonHeight, arrowHeight)) / 2;
    
    
}