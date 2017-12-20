"use strict";

var gamePlay = function(game){};

gamePlay.prototype = {
    preload :function(){
        // Load all asset from the list in JSON file.
        game.load.pack("game-play-assets-1","assets/asset-pack-1.json");
    },
    create : function(){
        var gamePlayBackground = game.add.image("game-play-background-1");
    }
}