class gameOver extends Phaser.Scene {

	constructor() {
		super({ key: 'gameOver' });
		this.score = score;

	}


	create() {
		
		this.add.image(400, 300, 'game_over');
		const replay = this.add.image(950, 280, 'replay');
		replay.setInteractive();
		replay.on('pointerup', () => {
			game.scene.stop('gameOver');
			game.scene.start('titleScene');
		});
		replay.on('pointerout', () => {
			replay.setScale(1)
		});
		replay.on('pointerover', () => {
			replay.setScale(1.02)
		});
	}

}
