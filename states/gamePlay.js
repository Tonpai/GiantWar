"use strict";

var gamePlay = function(game){};

//Relate with Field Function.
var buttonSelectedCharacter= [];
var buttonSelectedField = [];
var enemyFieldRowsGroup = [];
var fieldRowsGroup = [];
var giantFieldRowsGroup = [];

// Audio
// Background audio
var gamePlayBackgroundAudio;
// onClickSound
var standHumanAudio;
var onClickSelectCharacterAudio;

gamePlay.prototype = {
    preload :function(){
        //Load asset
        game.load.pack("game-play-assets-1", "assets/asset-pack-1.json");

        for (let index = 0; index < characterList.length; index++) {
            game.load.pack(characterList[index].characterArrayName,"assets/asset-pack-1.json");
            console.log("import " + characterList[index].characterArrayName);
        }

        //LoadGiant
        game.load.pack("giant-1", "assets/asset-pack-1.json");

        // audioBackground pause
        audioBackground.pause();
    },
    create : function(){
        console.log(buttonSelectedCharacter.length < 1);

        console.log("Load gamePlay background");
        this.gamePlayBackground = game.add.image(0,0,"game-play-background-1");

        this.field = new Field(5, 9, "tiles-1-1", 50, 60, 2, 20, 40, this);
        this.characterPanel = new CharacterPanel(characterList, 90, 50, 2, 5, 5, this);
        // this.prepareField();
        this.field.create();
        // this.prepareSelectCharacter();
        this.characterPanel.create();
        // Set object to Arcade physics engine
        this.cursor = game.input.keyboard.createCursorKeys();

        // add sound effect.
        standHumanAudio = game.add.audio("stand-human", 1);
        onClickSelectCharacterAudio = game.add.audio("onclick-select-character", 1);

        //play music
        gamePlayBackgroundAudio = game.add.audio("last-warrior-epic-cinematic", 1);
        gamePlayBackgroundAudio.loop = true;
        gamePlayBackgroundAudio.play();

    },
    update : function(){
        if(totalTime < 5 && game.time.now > timer){
            GenerateGiant(5, 9, 50, 60, 2, 20, 40);
            console.log("generate giant");
        }
    }
}

function Field(fieldRows, fieldCols, tileImageName, tileWidth, tileHeight, tileSpace, biasTop, biasLeft, context){
    this.fieldRows = fieldRows;
    this.fieldCols = fieldCols;
    this.biasTop = biasTop;
    this.biasLeft = biasLeft;
    this.tileImageName = tileImageName;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileSpace = tileSpace;
    this.context = context;

    this.create = function(){
        // Calculate for making the field is center.
        var leftSpace = (game.width - (this.fieldCols * this.tileWidth)- ((this.fieldCols-1) * this.tileSpace)) / 2;
        var topSpace = (game.height - (this.fieldRows * this.tileHeight)- ((this.fieldRows-1) * this.tileSpace)) / 2;
        for(var i=0 ; i < this.fieldRows ; i++){
            for(var j=0 ; j < this.fieldCols ; j++){
                var x = leftSpace + this.biasLeft + j * (this.tileWidth + this.tileSpace);
                var y = topSpace + this.biasTop + i * (this.tileHeight + this.tileSpace);
                var fieldTile = game.add.button(x, y, tileImageName, this.onClickTiles, context);
                fieldTile.value = {
                    row : i,
                    col : j,
                    stand : false
                };
            }
            console.log("adding group to array");
            fieldRowsGroup.push(game.add.group());
            fieldRowsGroup[i].enableBody = true;
            //Create field for giant
            giantFieldRowsGroup.push(game.add.group());
            giantFieldRowsGroup[i].enableBody = true;
        }
    };

    this.onClickTiles = function(target){
        // ถ้าไม่มีตัวละครในฟิลด์สามารถลงได้
        // ถ้าตัวละครถูกเลือกแล้วสามารถลงได้
        if(target.value.stand != true && buttonSelectedCharacter.length != 0){
            target.value.stand = true;
            console.log("row : " + target.value.row + ", y-axis : " + target.y);
            var characterIndex = buttonSelectedCharacter.pop().value;
            var character = game.add.sprite(target.x+(tileWidth/2), target.y, characterList[characterIndex].characterSpriteKey, 0, fieldRowsGroup[target.value.row]);
            character.animations.add('stand',[0,1,2], 6, true);
            character.play('stand');
            character.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(character);
            //indexOf()returns index of array
            standHumanAudio.play();
            console.log("standed the human");
        }

        // if(buttonSelectedCharacter.length == 1)
    }
}


function CharacterPanel(characterList, tileWidth, tileHeight, tileSpace, leftSpace, topSpace, context){
    this.characterList = characterList;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileSpace = tileSpace;
    this.leftSpace = leftSpace;
    this.topSpace = topSpace;
    this.context = context;

    this.create = function(){
        for(var i=0; i < characterList.length; i++){
            var button = game.add.button(this.leftSpace, this.topSpace + i * (this.tileHeight + this.tileSpace), this.characterList[i].characterImageKey, this.onClickSelectCharacter,this.context);
            button.value = i;
        }
    }
    this.onClickSelectCharacter = function(target){
        //never click before and it's not the same button clicking
        if(buttonSelectedCharacter.length == 0 && buttonSelectedCharacter.indexOf(target) == -1){
            console.log("Player select character : " + target.value);
            buttonSelectedCharacter.push(target);
            onClickSelectCharacterAudio.play();
        }else if(buttonSelectedCharacter.length == 1 && buttonSelectedCharacter.indexOf(target) != -1){
            console.log("Player unselect character : " + target.value);
            buttonSelectedCharacter.length = 0;
        }else if(buttonSelectedCharacter.length == 1&& buttonSelectedCharacter.indexOf(target) == -1){
            buttonSelectedCharacter.pop()
            buttonSelectedCharacter.push(target);
            console.log("Player select character : " + target.value);
            onClickSelectCharacterAudio.play();
        }
    }
}
var totalTime = 0;
var timer = 0;
function GenerateGiant(fieldNumRows, fieldNumCols, tileWidth, tileHeight, tileSpace, biasTop, biasLeft){
    var rand = game.rnd.integerInRange(1, 5);
    var winPoint = (game.width - (fieldNumCols * tileWidth)- ((fieldNumCols-1) * tileSpace)) / 2;
    winPoint += biasLeft;
    var firstPoint = (game.height - (fieldNumRows * tileHeight)- ((fieldNumRows-1) * tileSpace)) / 2;
    firstPoint += biasTop;
    var giant = game.add.sprite(600,firstPoint + ((tileHeight + tileSpace)*(rand-1)) , "spritesheet-giant-1", 0, giantFieldRowsGroup[rand-1]);
    giant.animations.add("walk", [0,1,2,3,4], 5, true);
    giant.animations.play("walk");
    giant.anchor.setTo(0.5, 0.5);
    totalTime++;
    timer = game.time.now+25000;
    giant.tween = game.add.tween(giant).to({ x: winPoint }, 100000, Phaser.Easing.Linear.None, true);
}

// Level = function(){ };
// Level.prototype.job = function(){

// }

// Level2 = function(){};
// Level2.prototype = Object.create(Level);

// x = new Level2();
// x.job();

// Level = function(){ };
// Level.prototype.job = function(){

// }

// Level2 = function(){};
// Level2.prototype = Object.create(Level);

// x = new Level2();
// x.job();

