"use strict";

var gamePlay = function(game){};

//Relate with Field Function.
var fieldRowsGroup = [];
var buttonSelectedCharacter= [];
var buttonSelectedField = [];

gamePlay.prototype = {
    preload :function(){
        //Load asset
        game.load.pack("game-play-assets-1", "assets/asset-pack-1.json");

        for (let index = 0; index < characterList.length; index++) {
            game.load.pack(characterList[index].characterArrayName,"assets/asset-pack-1.json");
            console.log(characterList[index].characterImageKey);
        }
    },
    create : function(){
        console.log(buttonSelectedCharacter.length < 1);

        console.log("Load gamePlay background");
        this.gamePlayBackground = game.add.image(0,0,"game-play-background-1");

        this.field = new Field(5, 9, "tiles-1-1", 50, 60, 2, 20, 40, this.onClickTiles, this);
        this.characterPanel = new CharacterPanel(characterList, 90, 50, 2, 5, 5,this.onClickSelectCharacter, this);
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
    onClickTiles : function(target){
        //never click before and it's not the same button clicking
        if(buttonSelectedField.length == 0 && buttonSelectedField.indexOf(target) == -1){
            buttonSelectedField.push(target);
        }else if(buttonSelectedField.length == 1 && buttonSelectedField.indexOf(target) != -1){
            buttonSelectedField.length = 0;
        }

        // if(buttonSelectedCharacter.length == 1)

        console.log(buttonSelectedField.length);
    },
    onClickSelectCharacter : function(target){
        //never click before and it's not the same button clicking
        if(buttonSelectedCharacter.length == 0 && buttonSelectedCharacter.indexOf(target) == -1){
            buttonSelectedCharacter.push(target);
        }else if(buttonSelectedCharacter.length == 1 && buttonSelectedCharacter.indexOf(target) != -1){
            buttonSelectedCharacter.length = 0;
        }
        console.log(buttonSelectedCharacter.length);
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
                var x = leftSpace + this.biasLeft + j * (this.tileWidth + this.tileSpace);
                var y = topSpace + this.biasTop + i * (this.tileHeight + this.tileSpace);
                var fieldTile = game.add.button(x, y, tileImageName, this.callbackFunction, context);
                
            }
            //สร้าง group ให้ fieldRowsGroup`
            fieldRowsGroup.push(game.add.group());
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
            var button = game.add.button(this.leftSpace, this.topSpace + i * (this.tileHeight + this.tileSpace), this.characterList[i].characterImageKey, this.callbackFunction,this.context);
            button.value = i;
        }
    }
}