//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//menu.js
//menu screen for the game (also temporarily providing instructions)

var Menu = function(game) {};
var message;
var selection = 'play';


Menu.prototype = {
	preload: function() {
		//Preload Game assets
		//misc background assets
		game.load.image('background', 'assets/img/sky.png');
		game.load.image('badbackground', 'assets/img/badsky.png');
		game.load.image('homebackground', 'assets/img/homebackground.png');
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('ground2', 'assets/img/ground2.png');
		game.load.image('house', 'assets/img/house.png');
		game.load.image('house2', 'assets/img/brokenhouse.png');
		game.load.image('villager', 'assets/img/owl.png');
		game.load.image('villager2', 'assets/img/auk.png');
		game.load.image('chat', 'assets/img/chat.png');
		game.load.image('textbubble', 'assets/img/textbubble.png');
		game.load.image('platform', 'assets/img/rockplatform.png');
		game.load.image('platform2', 'assets/img/sciplatform.png');
		//various collectibles
		game.load.image('goat', 'assets/img/goat.png');
		game.load.image('totem', 'assets/img/totem.png');
		game.load.image('flag', 'assets/img/flag.png');
		game.load.image('hat', 'assets/img/hat.png');
		game.load.image('gem', 'assets/img/gem.png');
		//multiple outfits for player
		game.load.spritesheet('dude', 'assets/img/playerone.png',164/5, 129/2);
		game.load.spritesheet('dude2', 'assets/img/player2.png',192/3, 192/3);
		game.load.spritesheet('dude3', 'assets/img/player3.png',192/3, 192/3);
		// statue assets
		game.load.image('statuetextbub', 'assets/img/statuetextbub.png');
		game.load.spritesheet('statue', 'assets/img/statue.png',192/2, 224/2);

		//menu items
		game.load.image('title', 'assets/img/title.png');
		game.load.image('playButton', 'assets/img/playButton.png');
		game.load.image('tutorialButton', 'assets/img/tutorialButton.png');

		//tutorial assets
		game.load.image('arrow', 'assets/img/arrow.png');
		game.load.image('spacebar', 'assets/img/spacebar.png');
		game.load.image('ykey', 'assets/img/ykey.png');
		game.load.image('nkey', 'assets/img/nkey.png');

		// karma assets
		game.load.image('container', 'assets/img/meterbg.png');
		game.load.image('karma', 'assets/img/karmabox.png');

		// cutscene assets
		game.load.image('goodwelcome', 'assets/img/goodwelcome.png');
		game.load.image('badwelcome', 'assets/img/badwelcome.png');

		//gameover assets
		game.load.image('ending', 'assets/img/ending.png');
		game.load.image('bigtextbub', 'assets/img/bigstatuetextbub.png');
		game.load.image('credits', 'assets/img/credits.png');

		//music cred
		// "Dreamy Flashback" Kevin MacLeod (incompetech.com)
		// Licensed under Creative Commons: By Attribution 3.0 License
		// http://creativecommons.org/licenses/by/3.0/
		game.load.audio('bgm', 'assets/audio/dreamy_flashback.mp3');
		// Additional sound effects from https://www.zapsplat.com

		//Font from: https://www.dafont.com/exepixelperfect.font
		game.load.bitmapFont('myfont', 'assets/font/font.png', 'assets/font/font.fnt');


	},
	create: function() {
		//add titlescreen
		game.add.sprite(0,0, 'title');

		// add instructions
		message = game.add.bitmapText(width/2, 300, 'myfont', " Press              to play", 48);
		message.anchor.set(0.5);
		message = game.add.bitmapText((width/2)+100, 355, 'myfont', "to start tutorial", 48);

		//visual menu
		playButton = game.add.sprite(width/2, 300, 'playButton');
		playButton.anchor.set(0.5);

		tutorialButton = game.add.sprite(width/2, 380, 'tutorialButton');
		tutorialButton.anchor.set(0.5);
	},
	update: function() {
		//if space is pressed, play game
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('level_1', true, false);
		}
		//if shift is pressed, enter tutorial
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT)) {
			game.state.start('tutorial', true, false);
		}
	}
}