"use strict";

var winGame = function(game){};

winGame.prototype = {
    preload : function(){
        //----- load asset -----
        game.load.pack("win-game-asset", "assets/asset-pack-1.json");
        //----------------------
    },
    create : function(){
        //----- set background -----
        game.add.image(0,0,"win-game-background");
        //--------------------------
        game.add.button(320,230, "end-game-button", StartTitle, this);
    },
    update : function(){
        
    }
};

function StartTitle(){
    game.state.start("titleScreen")
}
// TODO :: 