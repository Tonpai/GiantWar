"use strict";

var gamePlay = function(game){};

var tilesWidth = 50;
var tilesHeight = 60;
var tilesSpace = 2;

//buttonSize
var buttonSize = 3;

//characterImport
var characterList = [
    "character-1"
];

gamePlay.prototype = {
    tableRows : 5,
    tableCols : 9,
    preload :function(){
        // Load all asset from the list in JSON file.
        game.load.pack("game-play-assets-1", "assets/asset-pack-1.json");
        game.load.pack("tiles-1", "assets/asset-pack-1.json");
        // Test script for Show character
        game.load.pack("character-1", "assets/asset-pack-1.json");
    },
    create : function(){
        var gamePlayBackground = game.add.image(0,0,"game-play-background-1");
        this.prepareField();
        this.prepareSelectCharacter();
        this.player = game.add.sprite(game.world.centerX, game.world.centerY,  "character-1");
        this.player.anchor.setTo(0.5,0.5);
        // Set object to Arcade physics engine
        this.cursor = game.input.keyboard.createCursorKeys();
        game.physics.arcade.enable(this.player);
    },
    update : function(){
        this.movePlayer();
        this.player.body.velocity.x = -10;
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
    },
    prepareSelectCharacter : function(){
        var leftSpace = 5;
        var topSpace = 5;
        for(var i=0 ; i<buttonSize ; i++){
            var btnSelect = game.add.button(leftSpace, topSpace + i*(tilesHeight + tilesSpace),"tiles-1-1",
            this.onClickTiles, this);
        }
    },
    prepareField : function(){
        //Prepare field
        var leftSpace = (game.width - (this.tableCols * tilesWidth)- ((this.tableCols-1) * tilesSpace)) / 2;
        var topSpace = (game.height - (this.tableRows * tilesHeight)- ((this.tableRows-1) * tilesSpace)) / 2;
        for(var i=0 ; i < this.tableRows ; i++) {
            for(var j=0 ; j < this.tableCols ; j++) {
                var tiles = game.add.button(leftSpace+ 40 + j*(tilesWidth + tilesSpace), topSpace +20+ i*(tilesHeight + tilesSpace),"tiles-1-1",
                    this.onClickTiles, this);
            }
        }
    },
    onClickTiles : function(){
        console.log("Click But");
    }
}