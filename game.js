"use strict";

window.onload = function(){
    var game = new Phaser.Game(600,400); 
    game.state.add("loadSrc",loadSrc);
    
    //fist stage start
    game.state.start("loadSrc");
}
