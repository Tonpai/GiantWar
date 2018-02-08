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
var arrowWeapon = [];
//-------------------------

//----- Money -----
var money = 10;
var moneyTextShow;
var styleMoneyTextShow = {
    font : "20px Arial",
    fill : "#ffffff",
    align : "center"
};
//-----------------

//----- Weapon Sound -----
var arrowSound;
var arrowSoundImpact;
//------------------------
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

        //arrow sound
        arrowSound = game.add.audio("arrow-sound", 1);
        arrowSoundImpact = game.add.audio("arrow-sound-impact", 1);

        //Money
        moneyTextShow = game.add.text(530,18, money, styleMoneyTextShow);


        //--------สร้าง Weapon ธนู---------
        for(var i = 0 ; i < 5 ; i++){
            arrowWeapon.push(game.add.weapon(30, "arrow"));
            arrowWeapon[i].bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            arrowWeapon[i].fireAngle = 0;
            arrowWeapon[i].bulletSpeed = 400;
        }
        //-------------------------------
        console.log("[state] : create weapon finished");
        console.log(arrowWeapon.bullets);

    },
    update : function(){
        if(totalTime < 30 && game.time.now > timer){
            GenerateGiant(5, 9, 50, 60, 2, 20, 40);
            console.log("generate giant");
        }

        for(var i=0 ; i<5 ; i++){
            game.physics.arcade.overlap(giantFieldRowsGroup[i], arrowWeapon[i].bullets, onCollide, null, this);
        }
    }
}

function onCollide(giant, bullet){
    //-----------------------------------------
    // pseudo code
    // if bullet.value.row != giant.value.row
    //  return
    // giant.value--
    // bullet.kill()
    // if giant.value.hp == 0
    //  giant.changeAnimation(dead)
    //  wait_time(5)
    //  giant.destroy();
    // PROBLEM :: bullet.value.row, giant.value.row
    //-----------------------------------------

    // if(bullet.value.row != giant.value.row){
    //     return;
    // }

    // giant.value.hp--;
    // bullet.kill();
    // if(giant.value.hp == 0){
    //     // TODO :: Change dead animation
    //     // TODO :: Wait time
    //     giant.destroy();  
    // }
    arrowSoundImpact.play();
    console.log("giant.value.row : " + giant.value.row);
    bullet.kill();
    giant.value.hp--;
    giant.body.velocity.x -= 100;
    
    if(giant.value.hp == 0){

        giant.destroy();
    }
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

function LoseGame(){
    game.state.start("loseGame");
}

function attackerAnimationLooped(sprite, animation){
    //-----Fire arrowWeapon-----
    arrowSound.play();
    var bullet = arrowWeapon[sprite.value.row].fire(sprite, sprite.x, sprite.y);
    console.log(bullet);
    //--------------------------
}

function minerAnimationLooped(sprite, animation){
    // TODO :: เพิ่มเงิน
    money += 1;
    moneyTextShow.text = money.toString();
}

var CharacterObject = {
    createByGroup : function(x, y, spritesheet, group, characterClass,rowNumber){
        var character = game.add.sprite(x, y, spritesheet, 0, group);
        var anim = this.addAnimation(character, 'stand', [2,1,0], 3);
        if(characterClass == "attacker"){
            anim.onLoop.add(attackerAnimationLooped, this);
        }else if(characterClass == "preventer"){

        }else if(characterClass == "miner"){
            anim.onLoop.add(minerAnimationLooped, this);
            
        }


        character.anchor.setTo(0.5, 0.5);
        character.value = {
            row : rowNumber
        };
        return character;
    },
    addAnimation : function(character, animationName, animationSequence, frameRate){
        var anim = character.animations.add(animationName, animationSequence, frameRate, true);
        return anim;
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
            var characterIndex = buttonSelectedCharacter.pop();

            if(characterList[characterIndex.value].characterCost > money){
                buttonSelectedCharacter.push(characterIndex);
                return;
            }
            
            money -= characterList[characterIndex.value].characterCost;
            moneyTextShow.text = money.toString();
            
            // var character = game.add.sprite(target.x+(tileWidth/2), target.y, characterList[characterIndex].characterSpriteKey, 0, fieldRowsGroup[target.value.row]);
            // var anim = character.animations.add('stand',[2,1,0], 3, true);
            // character.anchor.setTo(0.5, 0.5);
            // character.play('stand');

            // var character = 
            var x = target.x+(tileWidth/2);
            var y = target.y;
            var spriteKey = characterList[characterIndex.value].characterSpriteKey;
            var characterGroup = fieldRowsGroup[target.value.row];
            var characterClass = characterList[characterIndex.value].characterClass;
            
            var character = CharacterObject.createByGroup(x, y, spriteKey, characterGroup, characterClass, target.value.row);
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
    timer = game.time.now+10000;
    giant.value = {
        hp : 10,
        row : rand-1
    }
    giant.tween = game.add.tween(giant).to({ x: winPoint }, 100000, Phaser.Easing.Linear.None, true);
    giant.tween.onComplete.add(LoseGame,this);
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

