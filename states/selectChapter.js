"use strict";

var selectChapter = function(game){};

selectChapter.prototype = {
    preload : function(){
        game.load.pack("select-chapter-asset", "assets/asset-pack-1.json");
    },
    create : function(){
        this.titleBackground = game.add.image(0,0,"select-chapter-background");
        console.log("selectChapter is loaded.");
    }
};