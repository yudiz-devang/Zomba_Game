var config = {
    type: Phaser.AUTO,
    width: 1350,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 250 },
            debug: false
        }
    },

    scene: [TitleScene, gameScene, gameOver]
};

var game = new Phaser.Game(config);
var player;
var stars;
var bombs;
var platform;
var cursors;
var a, d, w, space;
var score = 0;
var level = 1;
var bomb;
var button;
var scoreText, levelText, msg;