"use strict";

var selectChapter = function(game){};

selectChapter.prototype = {
    preload : function(){
        game.load.pack("select-chapter-asset", "assets/asset-pack-1.json");
    },
    create : function(){
        this.titleBackground = game.add.image(0,0,"select-chapter-background");
        PrepareUI(this);
        console.log("selectChapter is loaded.");
    }
};

var pageNum = 1;
var selectChapterButton = [];
var leftArrow;
var rightArrow;


function PrepareUI(context){
    // Image property
    var arrowWidth = 85;
    var arrowHeight = 55;
    var selectChapterButtonWidth = 77;
    var selectChapterButtonHeight = 77;
    // Space
    var arrowSpace = 20;   
    var btnSelectChapterSpace = 50;
    // Number
    var btnNumber = 3;
    // Border Calculation
    var borderAllObject = Math.max(selectChapterButtonHeight, arrowHeight);
    // Bias
    var biasTop = 60;
    var biasLeft = 30;
    
    // Calculate Center :: Equation is fixible for changing parameter above.
    var leftSpace = (game.width + biasLeft - (arrowWidth * 2 + arrowSpace * 2 +
                    btnNumber * arrowWidth + (btnNumber - 1) * btnSelectChapterSpace)) / 2;
    var topSpace = (game.height + biasTop - borderAllObject) / 2;
    
    // Arrow position
    // leftArrow position
    var leftArrowX = leftSpace;
    var leftArrowY = topSpace + borderAllObject - Math.min(selectChapterButtonHeight, arrowHeight);
    // rightArrow position
    var rightArrowX = leftSpace + arrowWidth + arrowSpace * 2 + btnNumber * selectChapterButtonWidth + (btnNumber - 1) * btnSelectChapterSpace;
    var rightArrowY = leftArrowY;

    leftArrow = game.add.button(leftArrowX, leftArrowY, "btn-left-arrow", shiftChapter, context);
    rightArrow = game.add.button(rightArrowX, rightArrowY, "btn-right-arrow", shiftChapter, context);

    var startPointX = leftSpace + arrowWidth + arrowSpace;
    var startPointY = topSpace;
    for (var index = 0; index < btnNumber; index++) {
        selectChapterButton.push(game.add.button(startPointX, startPointY, "btn-selection-background", onClickChapter, context));
        startPointX += btnSelectChapterSpace + selectChapterButtonWidth;

    }

}

function shiftChapter(){
    ClickButtonFeedback();
}

function onClickChapter(){
    ClickButtonFeedback();
}