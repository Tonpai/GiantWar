"use strict";

var selectCharacter = function(game){};
var characterList = [];

selectCharacter.prototype = {
    preload : function(){
        //FixInBeta :: load from select character state.
        game.load.json("characterHuman", "character/character-human.json");
    },
    create : function(){
        //FixInBeta :: delete when select character state is finish.
        characterList = game.cache.getJSON("characterHuman");
        console.log(characterList);

        game.state.start("gamePlay");
    }
};