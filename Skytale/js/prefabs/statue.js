//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//statue.js
//a prefab for our statue character/feature

function statue() {
	var sprite;
	var interacted;

	var dialogue;
	var bubble;
	var textDisplay;
	
	var timer;
}

statue.prototype = {
	spawn: function(game) {
		this.sprite = game.add.sprite(10, 290, 'statue');
		this.sprite.animations.add('sparkle',[0,1,2],4, true);
		
		//indicate what stage of interaction is happening
		this.interacted = 'intro';

		//set dialogue
		this.dialogue = ['Young hero...','text1','text2','text3','','stats'];
		this.dialogue[4] = "Press\nto show you\nunderstand";

		this.timer = 0;

		//create text bubble
		this.bubble = game.add.sprite(100, 350, 'statuetextbub');
		this.bubble.anchor.set(0,1);
		this.bubble.width = 0;
		this.bubble.height = 0;
	},
	//allows the user to set the text depending on level
	//pre-con: arguments must be 12 words or less each
	setText: function(text1, text2) {
		this.dialogue[1] = textWrap(text1);
		this.dialogue[2] = textWrap(text2);
	},
	//plays the introduction to each level
	startLevel: function() {
		this.timer++;
		// this runs on framerate and hope
		if (this.interacted == 'ready') {
			if (this.timer == 120) {
				this.sprite.animations.stop('sparkle', 0);
				this.bubble.destroy();
				this.textDisplay.destroy();
				this.timer = 0;
				this.interacted = 'playLevel';
			}
		} else {
			this.sprite.animations.play('sparkle');
			if (this.timer <= 25) {
				this.bubble.width+=12;
				this.bubble.height+=8.2;
			} else if (this.timer == 26) {
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', this.dialogue[0], 48);
			} else if (this.timer == 100) {
				this.textDisplay.destroy();
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', this.dialogue[1], 48);
			} else if (this.timer == 340) {
				this.textDisplay.destroy();
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', this.dialogue[2], 48);
			} else if (this.timer == 580) {
				this.textDisplay.destroy();
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', this.dialogue[4], 48);
				space = game.add.sprite(230, 170, 'spacebar');
			} else if (this.timer > 600 && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
				space.destroy();
				this.textDisplay.destroy();
				this.timer = 0;
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', "I wish you luck\nin this lifetime.\nReturn to me\nonce finished.", 48);
				this.interacted = 'ready';
			}
		}
	},
	endTutorial: function() {
		this.timer++;
		if (this.interacted == 'readyToLeave') {
			if (this.timer == 60) {
				this.sprite.animations.stop('sparkle', 0);
				this.bubble.destroy();
				this.textDisplay.destroy();
				this.timer = 0;
				this.interacted = 'endLevel';
			}
		} else if (this.interacted != 'endLevel') {
			this.sprite.animations.play('sparkle');
			if (this.timer < 5) {
				this.bubble = game.add.sprite(100, 350, 'statuetextbub');
				this.bubble.anchor.set(0,1);
				this.bubble.width = 0;
				this.bubble.height = 0;
				this.timer = 5;
			} else if (this.timer <= 30) {
				this.bubble.width+=12;
				this.bubble.height+=8.2;
			} else if (this.timer == 31) {
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', "One last thing...", 48);
			} else if (this.timer == 90) {
				this.textDisplay.destroy();
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', "This  indicates\nthe good forces\nyou bring into\nthe next life.", 48);
				symbol = game.add.sprite(190, 160, 'karma');
			} else if (this.timer == 360) {
				symbol.destroy();
				this.textDisplay.destroy();
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', "Watch this\nclosely and\nremember:\nbalance is key.", 48);
			} else if (this.timer == 560) {
				this.textDisplay.destroy();
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', "The real work\nbegins when you\nare ready for it.\nPress", 48);
				space = game.add.sprite(220, 280, 'spacebar');
			} else if (this.timer > 560 && game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
				space.destroy();
				this.textDisplay.destroy();
				this.timer = 0;
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', "I will see you\nagain soon...", 48);
				this.interacted = 'readyToLeave';
			}
		}
	},
	endLevel: function(numKarma, player) {
		this.dialogue[0] = "You have\nreturned...";
		if (numKarma < 5) {
			this.dialogue[1] = "I am worried about the\nprosperity of my town but...";
			this.dialogue[1] = textWrap(this.dialogue[1]);
		} else {
			this.dialogue[1] = "You have done well to ensure prosperity in my town...";
			this.dialogue[1] = textWrap(this.dialogue[1]);
		}
		this.dialogue[2] = textWrap("Are you ready to move on?");

		this.timer++;

		//decide whether player is continuing or moving on
		if (this.interacted == 'continueLevel' || this.interacted == 'readyToLeave') {
			if (this.timer == 60) {
				this.bubble.destroy();
				this.textDisplay.destroy();
				this.timer = 0;
				player.sprite.x = 101;
				this.sprite.animations.stop('sparkle', 0);
				if(this.interacted == 'readyToLeave') {this.interacted = 'endLevel';}
				if(this.interacted == 'continueLevel') {
					this.interacted = 'playLevel';
					player.interacting = 'none';
				}
			}
		} else if (this.interacted != 'endLevel') {
			this.sprite.animations.play('sparkle');
			player.interacting = 'statue';
			if (this.timer < 5) {
				this.bubble = game.add.sprite(100, 350, 'statuetextbub');
				this.bubble.anchor.set(0,1);
				this.bubble.width = 0;
				this.bubble.height = 0;
				this.timer = 5;
			} else if (this.timer <= 30) {
				this.bubble.width+=12;
				this.bubble.height+=8.2;
			} else if (this.timer == 31) {
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', this.dialogue[0], 48);
			} else if (this.timer == 90) {
				this.textDisplay.destroy();
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', this.dialogue[1], 48);
			} else if (this.timer == 260) {
				this.textDisplay.destroy();
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', this.dialogue[2]+"\n   yes\n   no", 48);
				yes = game.add.sprite(130, 240, 'ykey');
				no = game.add.sprite(130, 280, 'nkey');
			} else if (this.timer > 280 && game.input.keyboard.justPressed(Phaser.Keyboard.Y)) {
				this.textDisplay.destroy();
				yes.destroy();
				no.destroy();
				this.timer = 0;
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', "I will see you\nagain soon...", 48);
				this.interacted = 'readyToLeave';
			} else if (this.timer > 50 && game.input.keyboard.justPressed(Phaser.Keyboard.N)) {
				this.textDisplay.destroy();
				yes.destroy();
				no.destroy();
				this.timer = 0;
				this.textDisplay = game.add.bitmapText(124, 154,'myfont', "Then by all\nmeans, continue\nyour work.", 48);
				this.interacted = "continueLevel";
			}
		}
	}
}

//helper function that inserts a newline every three words
function textWrap(text) {
	var wordCount = 0;
	var result = '';
	var prevI = 0;

	for (i=0; i<text.length; i++) {
		if(text.charAt(i) == ' ') {
			wordCount++;
			if (wordCount % 3 == 0) {
				result += text.substring(prevI, i+1) + "\n";
				prevI = i+1;
			}
		}
	}
	result += text.substring(prevI)
	return result;
}