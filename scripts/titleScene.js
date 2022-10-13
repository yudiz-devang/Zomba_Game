class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });
    }
    preload() {
        this.load.image('sky', 'assets/images/sky.png')
        this.load.image('ground', 'assets/images/platform.png')
        this.load.image('star', 'assets/images/star.png')
        this.load.image('bomb', 'assets/images/bomb.png')
        this.load.image('back', 'assets/images/back.jpeg')
        this.load.image('game_over', 'assets/images/gameover.jpg')
        this.load.image('play', 'assets/images/play.png')
        this.load.image('replay', 'assets/images/replay.png')
        this.load.image('pause', 'assets/images/pause.png')
        this.load.audio('default', 'assets/sounds/default-sound.mp3')
        this.load.audio('jump', 'assets/sounds/mario jump.mp3')
        this.load.audio('star', 'assets/sounds/star.mp3')
        this.load.audio('die', 'assets/sounds/die.mp3')
        this.load.spritesheet('dude', 'assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create() {
        this.add.image(400, 300, 'back').setScale(2);
        var text = this.add.text(490, 100, 'Welcome to my game!', { fontSize: '32px', fill: '#0C090A' });
        // setTimeout(function () {game.scene.start('gameScene'); }, 3000);
        const play = this.add.image(660, 250, 'play');
        play.setInteractive();
        play.on('pointerup', () => {
            game.scene.stop('titleScene');
            game.scene.start('gameScene');
        });
        play.on('pointerout', () => {
            play.setScale(1)
        });
        play.on('pointerover', () => {
            play.setScale(1.02)
        });
    }
}