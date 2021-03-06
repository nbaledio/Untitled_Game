//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//main.js:
//Creates game and manages states in the StateManager

// be strict
'use strict';

//Variables
var width = 800;
var height = 450;
var style = null;

//Game
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser');

// add states to StateManager
game.state.add('Menu', Menu);
game.state.add('tutorial', tutorial);

game.state.add('level_1', level_1);
game.state.add('level_2_bad', level_2_bad);
game.state.add('level_2_good', level_2_good);
game.state.add('level_3_bad', level_3_bad);
game.state.add('level_3_good', level_3_good);

game.state.add('GameOver', GameOver);

// begin at the menu
game.state.start('Menu');
