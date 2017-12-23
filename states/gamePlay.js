"use strict";

var gamePlay = function(game){};

//buttonSize
var buttonSize = 3;

//characterImport
var characterList = [
    "character-1"
];

gamePlay.prototype = {
    tableRows : 5,
    tableCols : 9,
    field : new Field(5, 9, "tiles-1-1", 50, 60, 2, 20, 40, this.onClickTiles, this),
    characterPanel : new CharacterPanel(characterList, 90, 50, 2, 5, 5,this.onClickTiles, this),
    preload :function(){
        // Load all asset from the list in JSON file.
        game.load.pack("game-play-assets-1", "assets/asset-pack-1.json");
        game.load.pack("tiles-1", "assets/asset-pack-1.json");
        // Test script for Show character
        for(var i=0 ; i<characterList.length ; i++){
            game.load.json(characterList[i],"assets/asset-pack-1.json");
            game.load.pack(characterList[i], "assets/asset-pack-1.json");
        }
        
    },
    create : function(){
        var gamePlayBackground = game.add.image(0,0,"game-play-background-1");
        // this.prepareField();
        this.field.create();
        // this.prepareSelectCharacter();
        this.characterPanel.create();
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
    },
    prepareSelectCharacter : function(){
        // var leftSpace = 5;
        // var topSpace = 5;
        // for(var i=0 ; i<buttonSize ; i++){
        //     var btnSelect = game.add.button(leftSpace, topSpace + i*(tilesHeight + tilesSpace),"tiles-1-1",
        //     this.onClickTiles, this);
        //     btnSelect.value = i;
        // }
    },
    onClickTiles : function(){
        console.log("Click But");
    }
}

function Field(fieldRows, fieldCols, tileImageName, tileWidth, tileHeight, tileSpace, biasTop, biasLeft, callbackFunction, context){
    this.fieldRows = fieldRows;
    this.fieldCols = fieldCols;
    this.biasTop = biasTop;
    this.biasLeft = biasLeft;
    this.tileImageName = tileImageName;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileSpace = tileSpace;
    this.callbackFunction = callbackFunction;
    this.context = context;

    this.create = function(){
        // Calculate for making the field is center.
        var leftSpace = (game.width - (this.fieldCols * this.tileWidth)- ((this.fieldCols-1) * this.tileSpace)) / 2;
        var topSpace = (game.height - (this.fieldRows * this.tileHeight)- ((this.fieldRows-1) * this.tileSpace)) / 2;
        console.log(game.width);
        for(var i=0 ; i < this.fieldRows ; i++){
            for(var j=0 ; j < this.fieldCols ; j++){
                // var x = this.biasLeft + this.leftSpace + j * (this.tileWidth + this.tileSpace);
                // var y = this.biasTop + this.topSpace + i * (this.tileHeight + this.tileSpace);
                var x = leftSpace + this.biasLeft + j * (this.tileWidth + this.tileSpace);
                var y = topSpace + this.biasTop + i * (this.tileHeight + this.tileSpace);
                var fieldTile = game.add.button(x, y, tileImageName, this.callbackFunction, context);
            }
        }
    };
}

function CharacterPanel(characterList, tileWidth, tileHeight, tileSpace, leftSpace, topSpace, callbackFunction, context){
    this.characterList = characterList;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileSpace = tileSpace;
    this.leftSpace = leftSpace;
    this.topSpace = topSpace;
    this.callbackFunction = callbackFunction;
    this.context = context;

    this.create = function(){
        for(var i=0; i < characterList.length; i++){
            var character = game.cache.getJSON(characterList[i]);

            var button = game.add.button(this.leftSpace, this.topSpace + i * (this.tileHeight + this.tileSpace), characterList[i], this.callbackFunction,this.context);
            button.value = i;
        }
    }
}