"use strict"

//Create state object
var gamePlay2 = function(game){}

gamePlay2.prototype = {
    preload : function(){
        //load backgroud
        //load sprite
        //load button
        //load sound
    },
    create : function(){

    },
    update : function(){

    }
}

function Game(){
    var field;
    var panel;
    var money;
    var human;
    var giant;
}

function Field(){
    // add position for click in each position
    var fieldButton = [];
    // add group for separate human and giant
    var humanGroup = [];
    var giantGroup = [];

    var create = function(width, height){
        //TODO :: generate fieldButton width x height BUTTON table
        //     :: initial group of human and giant
    }
}

function Panel(){
    var panelButton = [];

    var create = function(arr){
        // TODO :: generate panel button ref from value of after step 
    }
}

function Money(game){

}

function Human(){
    function generate(){

    }
}

function Giant(){
    function generate(){

    }
}