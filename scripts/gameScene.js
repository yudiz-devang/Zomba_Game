class gameScene extends Phaser.Scene {
    constructor(cursors = null, music = null, platforms = null, ScoreText = null, bomb = null, player = null) {
        super({ key: 'gameScene' });
        this.cursors = cursors;
        this.music = music;
        this.platforms = platforms;
        this.scoreText = scoreText;
        this.score = score;
        this.bombs = bombs;
        this.player = player;
        this.level = level;
    }
    create() {
        game.scene.stop('titleScene');
        this.add.image(400, 300, 'back');
        this.song = this.sound.add('default', { volume: 0.2 });
        this.song.play();
        this.song.loop = true;

        this.platform = this.physics.add.staticGroup();
        this.platform.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platform.create(950, 568, 'ground').setScale(2).refreshBody();
        this.platform.create(620, 360, 'ground');
        this.platform.create(50, 250, 'ground');
        this.platform.create(1220, 190, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 18,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
        this.bombs = this.physics.add.group();
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.levelText = this.add.text(1200, 16, 'Level: 1', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.stars, this.platform);
        this.physics.add.collider(this.bombs, this.platform);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    }

    update() {
        this.levelText.setText('Level:' + this.level)
        if (this.a.isDown) {
            this.player.setVelocityX(-250);

            this.player.anims.play('left', true);
        }
        else if (this.d.isDown) {
            this.player.setVelocityX(250);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.w.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-400);
            this.jmp = this.sound.add('jump', { volume: 0.5 });
            this.jmp.play();
        }
        if (this.space.isDown && this.gameOver) {

            window.location.reload()
        }

    }

    collectStar(player, star) {
        star.disableBody(true, true)
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0) {
            this.level++;
            this.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            for (let i = 1; i < this.level; i++) {
                bomb = this.bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        }
        this.str = this.sound.add('star', { volume: 0.3 });
        this.str.play();
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.song.stop();
        this.gameOver = true;
        this.die = this.sound.add('die', { volume: 0.5 });
        this.die.play();
        setTimeout(function () {
            game.scene.stop('gameScene'), game.scene.start('gameOver')
        }, 2000);
        this.level = 1;
    }
}