"use strict";

var game;

window.onload = function(){
    game = new Phaser.Game(600,400, Phaser.AUTO);
    
    game.state.add("loadSrc",loadSrc);
    game.state.add("titleScreen", titleScreen);
    game.state.add("selectCharacter", selectCharacter);
    game.state.add("selectChapter", selectChapter);
    game.state.add("gamePlay", gamePlay);
    game.state.add("loseGame", loseGame);
    game.state.add("winGame", winGame);
    
    //fist stage start
    // game.state.start("loadSrc");
    //TODO : DELETE WHEN gamePlay STATE is ALLREADY.
    game.state.start("titleScreen");
}
