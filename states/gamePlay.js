"use strict";

var gamePlay = function(game){};

gamePlay.prototype = {
    preload :function(){
        // Load all asset from the list in JSON file.
        game.load.pack("game-play-assets-1", "assets/asset-pack-1.json");

        // Test script for Show character
        game.load.pack("character-1", "assets/asset-pack-1.json");
    },
    create : function(){
        var gamePlayBackground = game.add.image(0,0,"game-play-background-1");
    }
}