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
        this.player = game.add.sprite(game.world.centerX, game.world.centerY,  "character-1");
        this.player.anchor.setTo(0.5,0.5);
        // Set object to Arcade physics engine
        this.cursor = game.input.keyboard.createCursorKeys();
        game.physics.arcade.enable(this.player);
    },
    update : function(){
        this.movePlayer();
    },
    movePlayer : function(){
        if(this.cursor.left.isDown){
            this.player.body.velocity.x = -10;
        }
        else if(this.cursor.right.isDown){
            this.player.body.velocity.x = 10;
        }
        else{
            this.player.body.velocity.x = 0;
        }
    }
}