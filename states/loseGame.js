"use strict";

var loseGame = function(game){}

loseGame.prototype = {
    preload : function(){
        //----- load asset -----
        game.load.pack("lose-game-asset", "assets/asset-pack-1.json");
        //----------------------
    },
    create : function(){
        //----- set background -----
        game.add.image(0,0,"lose-game-background");
        //--------------------------
        game.add.button(320,230, "end-game-button", StartTitle, this);
    },
    update : function(){

    }
};