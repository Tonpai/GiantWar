"use strict";

var titleScreen = function(game){};

titleScreen.prototype = {
    preload : function(){
        game.load.pack("title-screen-asset", "assets/asset-pack-1.json");
    },
    create : function(){
        this.titleBackground = game.add.image(0,0,"title-background");
        this.startGameButton = game.add.button((game.width-160)/2,(game.height-60+310)/2, "btn-game-start");
        console.log("titleScreen is loaded.");
    }
};