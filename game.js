"use strict";

var game;

window.onload = function(){
    game = new Phaser.Game(600,400); 
    game.state.add("loadSrc",loadSrc);
    game.state.add("titleScreen", titleScreen);
    game.state.add("selectCharacter", selectCharacter);
    game.state.add("selectChapter", selectChapter);
    game.state.add("gamePlay", gamePlay);
    
    //fist stage start
    // game.state.start("loadSrc");
    //TODO : DELETE WHEN gamePlay STATE is ALLREADY.
    game.state.start("titleScreen");
}
