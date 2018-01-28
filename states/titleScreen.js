"use strict";

var titleScreen = function(game){};

var audioBackground;

titleScreen.prototype = {
    preload : function(){
        game.load.pack("title-screen-asset", "assets/asset-pack-1.json");
        game.load.pack("audio-background-1", "assets/asset-pack-1.json");

        console.log("audio-background-1 is loaded.");
    },
    create : function(){
        this.titleBackground = game.add.image(0,0,"title-background");
        this.startGameButton = game.add.button((game.width-160)/2,(game.height-60+310)/2, "btn-game-start", this.startSelectChapter, this);
        
        audioBackground = game.add.audio("bensound-theduel", 1);
        audioBackground.loop = true;
        audioBackground.play();
        console.log("titleScreen is loaded.");
    },
    startSelectChapter : function(){
        ClickButtonFeedback();
        game.state.start("selectChapter");
    }
};

function ClickButtonFeedback(){
    var audio = game.add.audio("click-sound");
    audio.play();
}