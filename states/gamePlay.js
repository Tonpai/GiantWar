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

//-----Weapon Variable-----
var arrowWeapon;
//-------------------------

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
        //-----Set physics engine-----
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(game.world, true);
        //----------------------------

        //-----Load Background-----
        this.gamePlayBackground = game.add.image(0,0,"game-play-background-1");
        //-------------------------

        //-----Create Field-----
        this.field = new Field(5, 9, "tiles-1-1", 50, 60, 2, 20, 40, this);
        this.characterPanel = new CharacterPanel(characterList, 90, 50, 2, 5, 5, this);
        this.field.create();
        //----------------------

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


        //--------สร้าง Weapon ธนู---------
        arrowWeapon = game.add.weapon(30, "arrow");
        arrowWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        arrowWeapon.fireAngle = 0;
        arrowWeapon.bulletSpeed = 400;
        //-------------------------------
        console.log("[state] : create weapon finished");
        console.log(arrowWeapon.bullets);

    },
    update : function(){
        if(totalTime < 5 && game.time.now > timer){
            GenerateGiant(5, 9, 50, 60, 2, 20, 40);
            console.log("generate giant");
        }
        game.physics.arcade.overlap(giantFieldRowsGroup[0], arrowWeapon.bullets, onCollide, null, this);
        game.physics.arcade.overlap(giantFieldRowsGroup[1], arrowWeapon.bullets, onCollide, null, this);
        game.physics.arcade.overlap(giantFieldRowsGroup[2], arrowWeapon.bullets, onCollide, null, this);
        game.physics.arcade.overlap(giantFieldRowsGroup[3], arrowWeapon.bullets, onCollide, null, this);
        game.physics.arcade.overlap(giantFieldRowsGroup[4], arrowWeapon.bullets, onCollide, null, this);
    }
}

function onCollide(giant, bullet){
    bullet.kill();
    giant.value.hp--;
    if(giant.value.hp == 0){
        giant.destroy();
    }
    console.log('touch the giant');
}
// var CharacterObject = function(){
//     var createByGroup = function(x, y, spritesheet, group){
//         var character = game.add.sprite(x, y, spritesheet, 0, group);
//         this.addAnimation(character, 'stand', [2,1,0], 3);
//         character.anchor.setTo(0.5, 0.5);

//         // return character;
//     }
//     var addAnimation = function(character, animationName, animationSequence, frameRate){
//         var anim = character.animations.add(animationName, animationSequence, frameRate, true);
//     }

//     var playAnimation = function(character, animationName){
//         character.play(animationName);
//     }
// }

function animationLooped(sprite, animation){
    //-----Fire arrowWeapon-----
    arrowWeapon.fire(sprite, sprite.x, sprite.y);
    //--------------------------
}

var CharacterObject = {
    createByGroup : function(x, y, spritesheet, group){
        var character = game.add.sprite(x, y, spritesheet, 0, group);
        this.addAnimation(character, 'stand', [2,1,0], 3);
        character.anchor.setTo(0.5, 0.5);
        return character;
    },
    addAnimation : function(character, animationName, animationSequence, frameRate){
        var anim = character.animations.add(animationName, animationSequence, frameRate, true);
        anim.onLoop.add(animationLooped, this);
    },
    playAnimation : function(character, animationName){
        character.play(animationName);
    }
};


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
            
            game.physics.enable(giantFieldRowsGroup[i], Phaser.Physics.ARCADE);
            console.log("Set ARCADE Physics Engine to giantFieldRowsGroups["+i+"]");

        }
    };

    this.onClickTiles = function(target){
        // ถ้าไม่มีตัวละครในฟิลด์สามารถลงได้
        // ถ้าตัวละครถูกเลือกแล้วสามารถลงได้
        if(target.value.stand != true && buttonSelectedCharacter.length != 0){
            target.value.stand = true;
            console.log("row : " + target.value.row + ", y-axis : " + target.y);
            
            // สร้างตัวละคร
            // - สร้างตัวละคร(พิกัด, กลุ่ม)
            // - กำหนด character.animation
            // - กำหนด character.anchor
            // TODO :: กำหนด character.physicsEngine
            // TODO :: กำหนด characterWeapon
            // TODO :: ผูก Weapon เข้ากับ Character ที่สร้าง
            // - สั่งเล่น character.animation
            var characterIndex = buttonSelectedCharacter.pop().value;
            // var character = game.add.sprite(target.x+(tileWidth/2), target.y, characterList[characterIndex].characterSpriteKey, 0, fieldRowsGroup[target.value.row]);
            // var anim = character.animations.add('stand',[2,1,0], 3, true);
            // character.anchor.setTo(0.5, 0.5);
            // character.play('stand');

            // var character = 
            var x = target.x+(tileWidth/2);
            var y = target.y;
            var spriteKey = characterList[characterIndex].characterSpriteKey;
            var characterGroup = fieldRowsGroup[target.value.row];
            
            var character = CharacterObject.createByGroup(x, y, spriteKey, characterGroup);
            CharacterObject.playAnimation(character, 'stand');

            // character.weapon = game.add.weapon(10, "arrow");
            // character.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            // character.weapon.trackSprite(character, 0, 0);
            // character.weapon.fireAngle = 0;
            // character.weapon.bulletSpeed = 400;
            // character.weapon.fire();


            // character.weapon.bulletAngleVariance = -90;
            // character.weapon.rate = 1200;



            // anim.onLoop.add(animationLooped, context);
            


            //set physics character.weapon and giant in the row
            //indexOf()returns index of array
            standHumanAudio.play();
            console.log("standed the human on target row " + target.value.row );
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
    var giant = game.add.sprite(600,firstPoint + ((tileHeight + tileSpace)*(rand-1)) , "spritesheet-giant-1", 0, giantFieldRowsGroup[(rand-1)]);
    console.log("Generate giant to : " + (rand-1));


    giant.animations.add("walk", [0,1,2,3,4], 5, true);
    giant.animations.play("walk");
    giant.anchor.setTo(0.5, 0.5);
    totalTime++;
    timer = game.time.now+25000;
    giant.value = {
        hp : 10
    }
    giant.tween = game.add.tween(giant).to({ x: winPoint }, 100000, Phaser.Easing.Linear.None, true);
}


// function createWeapon(CharacterContext){
//     // Create weapon
//     this.weapon = game.add.weapon(10, "arrow");
//     this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
//     this.weapon.trackSprite(CharacterContext, 0, 0);
//     this.weapon.bulletAngleVariance = 15;
// 	this.weapon.fireAngle = 270;
// 	this.weapon.bulletSpeed = 550;
// 	this.weapon.rate = 600;
// }

// function Weapon(CharacterContext){

//         this.weapon = game.add.weapon(10, "arrow");
//         this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
//         this.weapon.trackSprite(CharacterContext, 0, 0);
//         this.weapon.bulletAngleVariance = 15;
//         this.weapon.fireAngle = 270;
//         this.weapon.bulletSpeed = 550;
//         this.weapon.rate = 600;

//     function fireWeapon(){
//         this.weapon.fire();
//     }
// }

// ยิงด้วยคำสั่ง this.weapon.fire()

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

