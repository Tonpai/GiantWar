"use strict";

var loadSrc = function(game){};

loadSrc.prototype = {
    preload : function(){
        
    },
    create : function(){
        game.state.start("titleScreen");
    }
};