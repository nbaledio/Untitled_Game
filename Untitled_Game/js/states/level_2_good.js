//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//level_2_good.js
//Second level of game, good karma variant

var level_2_good = function(game){};
var theta = 1;

level_2_good.prototype = {
	init: function() {
		this.peopleHelped = 0;
		this.balance = 0;
		this.state = 'level_2.good';
	},
	create: function(){
		
		//Resets theta so circular platform doesn't glitch to random places
		theta = 1;
		
		//Setting the size of the world
		game.world.setBounds(0, 0, 1600, 450);

		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//Add and play music
		//NOTE: Chrome will not play music until user
		//has interacted with the screen at least once
		bgm = game.add.audio('bgm');
		bgm.loop = true;
		bgm.play();
		
		//Add background
		background = game.add.sprite(0,0,'background');
		
		//Platforms group
		platformgroup = game.add.group();

		//Enable physics for every object in platforms group
		platformgroup.enableBody = true;
		
		//Ground group
		groundgroup = game.add.group();
		
		//Enable physics for every object in ground group
		groundgroup.enableBody = true;
		
		
		//Add platforms (Left to right) (second/third/etc. just means multiple
		//platforms next to each other to make one big platform since scaling 
		//makes it look weird.)
		platform5 = new platform(game,5,107,'platform',platformgroup);
		platform5_second = new platform(game,69,107,'platform',platformgroup);
		platform0 = new platform(game,230,280,'platform',platformgroup);
		platform7 = new platform(game,400,210,'platform',platformgroup);
		platform7.sprite.body.setSize(62,5,0,32);
		platform7_second = new platform(game,464,210,'platform',platformgroup);
		platform6 = new platform(game,1435,156,'platform',platformgroup);
		platform6_second = new platform(game,1499,156,'platform',platformgroup);
		platform1 = new platform(game,570,100,'platform',platformgroup);
		platform2 = new platform(game,380,126,'platform',platformgroup);
		platform2_second = new platform(game,444,126,'platform',platformgroup);
		platform3 = new platform(game,1090,126,'platform',platformgroup);
		platform3_second = new platform(game,1154,126,'platform',platformgroup);
		platform4 = new platform(game,1070,200,'platform',platformgroup);
		platform8 = new platform(game,1180,270,'platform',platformgroup);
		platform9 = new platform(game,1295,280,'platform',platformgroup);
		platform10 = new platform(game,800,160,'platform',platformgroup);
		platform11 = new platform(game,940,280,'platform',platformgroup);
		
		//Add ground to the bottom,enable their physics, and resize their hitboxes
		ground1 = game.add.sprite(0,0,'ground');
		groundgroup.add(ground1);
		ground1.body.immovable = true;
		ground1.body.setSize(800,50,0,400);
		
		ground2 = game.add.sprite(800,0,'ground');
		groundgroup.add(ground2);
		ground2.body.immovable = true;
		ground2.body.setSize(800,50,0,400);
		
		//Add houses
		house1 = game.add.sprite(40,270,'house');
		house1.scale.setTo(.8,.8);
		house2 = game.add.sprite(700,270,'house');
		house2.scale.setTo(.8,.8);
		house3 = game.add.sprite(390,30,'house');
		house3.scale.setTo(.8,.8);
		house4 = game.add.sprite(10,10,'house');
		house4.scale.setTo(.8,.8);
		house5 = game.add.sprite(1430,270,'house');
		house5.scale.setTo(.8,.8);
		house6 = game.add.sprite(1450,60,'house');
		house6.scale.setTo(.8,.8);
		house7 = game.add.sprite(1100,30,'house');
		house7.scale.setTo(.8,.8);
		
		//Add villager group
		villagergroup = game.add.group();
		villagergroup.enableBody = true;
		
		//Add villagers
		villager1 = new villager();
		villager1.spawn(game,30,75,'villager',1,'Family1','chat');
		villagergroup.add(villager1.sprite);
		villager1.setText('Find me one of those chat bubbles');
		
		villager2 = new villager();
		villager2.spawn(game,720,337,'villager',0,'Family2','chat');
		villagergroup.add(villager2.sprite);
		villager2.setText('Find me one of those chat bubbles');
		
		
		villager3 = new villager();
		villager3.spawn(game,410,95,'villager',1,'Family2','chat');
		villagergroup.add(villager3.sprite);
		villager3.setText('Find me one of those chat bubbles');
		
		villager4 = new villager();
		villager4.spawn(game,1120,96,'villager',0,'Family2','chat');
		villagergroup.add(villager4.sprite);
		villager4.setText('Find me one of those chat bubbles');
		
		villager5 = new villager();
		villager5.spawn(game,1450,337,'villager',1,'Family2','chat');
		villagergroup.add(villager5.sprite);
		villager5.setText('Find me one of those chat bubbles');
		
		villager6 = new villager();
		villager6.spawn(game,1470,125,'villager',0,'Family2','chat');
		villagergroup.add(villager6.sprite);
		villager6.setText('Find me one of those chat bubbles');
				
		//Add player
		p1 = new player();
		p1.spawn(game,110,325,'dude');
		p1.sprite.scale.setTo(.9,.9);
		p1.addAnimations('left', [0, 1, 2, 3], 10, true);
		p1.addAnimations('right', [5, 6, 7, 8], 10, true);
		
		//Focus camera on player
		game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		
		//Enable controls
		cursors = game.input.keyboard.createCursorKeys();
		
		
	},
	update: function(){
		//Variables to check if player is on platform or ground
		var onPlatform = game.physics.arcade.collide(p1.sprite, platformgroup);
		var onGround = game.physics.arcade.collide(p1.sprite, groundgroup);
		
		//  Reset the players velocity (movement)
		p1.sprite.body.velocity.x = 0;
		
		// Keeps player in horizontal bounds
		if(p1.sprite.x <= 0){
			p1.sprite.x += 2.5;
		}else if(p1.sprite.x > 1570){
			p1.sprite.x -= 2.5;
		}
		
		//Check if left is input
		if (cursors.left.isDown)
		{
			//  Move to the left
			p1.sprite.body.velocity.x = -150;
			//  Play left animation
			p1.sprite.animations.play('left');
		}
		//Check if right is input
		else if (cursors.right.isDown)
		{
			//  Move to the right
			p1.sprite.body.velocity.x = 150;
			//  Play right animation
			p1.sprite.animations.play('right');
		}
		else
		{
			//  Stand still
			p1.sprite.animations.stop();
			p1.sprite.frame = 4;
		}
		
		//Push player downwards if on platform for more consistent jumps
		if(onGround || onPlatform){
			p1.sprite.y +=1;
		}
		
		//  Enable player to jump if they are standing on the ground/platform
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)  && ( onGround || onPlatform))
		{
			p1.sprite.body.velocity.y = -500;
		}
		
		//  Enable player to drop through platforms
		if (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN)  && onPlatform)
		{
			p1.sprite.y +=8;
		}
		
		//Allow player to pass through platforms from the bottom
		if(p1.sprite.body.velocity.y < -50 && !( onGround || onPlatform)){
			p1.sprite.body.setSize(0,0,0,-1000);
		}else{
			p1.sprite.body.setSize(32,48,0,0);
		}
		
		//  Enables player to fall on platforms
		game.physics.arcade.collide(p1.sprite, platformgroup);
		
		//Enables villagers to fall on platforms
		game.physics.arcade.collide(villagergroup, platformgroup);
		
		//Bounce platform0 up and down
		if(platform0.sprite.y >= 280){
			platform0.sprite.body.velocity.y = -60;
		}
		if(platform0.sprite.y <= 100){
			platform0.sprite.body.velocity.y = 60;
		}
		
		//Bounce platform1 up and down
		if(platform1.sprite.y >= 280){
			platform1.sprite.body.velocity.y = -60;
		}
		if(platform1.sprite.y <= 100){
			platform1.sprite.body.velocity.y = 60;
		}
		
		//Bounce platform9 up and down
		if(platform9.sprite.y >= 280){
			platform9.sprite.body.velocity.y = -60;
		}
		if(platform9.sprite.y <= 100){
			platform9.sprite.body.velocity.y = 60;
		}
		
		//Move platform7/second in a circle
		theta += .02;
		platform7.sprite.body.velocity.x =  Math.cos(theta)*50;
		platform7_second.sprite.body.velocity.x =  Math.cos(theta)*50;
		platform7.sprite.body.velocity.y =  Math.sin(theta)*50;
		platform7_second.sprite.body.velocity.y =  Math.sin(theta)*50;
		
		//Check if player if overlapping villager
		// call update on villager to respond accordingly
		villager6.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager6.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager6.complete();
			if (villager6.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager5.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager5.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager5.complete();
			if (villager5.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager4.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager4.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager4.complete();
			if (villager4.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager3.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager3.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager3.complete();
			if (villager3.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager2.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager2.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager2.complete();
			if (villager2.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager1.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager1.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager1.complete();
			if (villager1.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		
		if(game.input.keyboard.justPressed(Phaser.Keyboard.ONE)){
			game.state.start('level_1')
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.TWO)){
			game.state.start('level_2_good')
		} else if(game.input.keyboard.justPressed(Phaser.Keyboard.THREE)){
			game.state.start('level_2_bad')
		}
		

		// the player will either quit or finish the game by helping everyone
		if (this.peopleHelped == 2 ||
			game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			game.state.start('GameOver', true, false, this.peopleHelped, this.balance);
		}
	}
}

// helper function for when task is done
function finishTask(p1, task){
	task.kill();
	this.peopleHelped++;
}