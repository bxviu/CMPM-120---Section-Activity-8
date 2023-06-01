class GameScene extends Phaser.Scene {
    reset() {
        this.scene.restart();
        this.time.delayedCall(500, () => {
            this.scene.resume();
            this.player.setX(100);
            this.player.setY(300);
            this.enemy1.setX(600);
            this.enemy1.setY(400);
            this.enemy2.setX(800);
            this.enemy2.setY(400);
        });
    }
    
    create() {
        console.log(this);
        // player
        this.player = this.add.rectangle(100, 300, 50, 50, 0xFFFFFF);
        this.physics.add.existing(this.player);
        // this.player.body.collideWorldBounds = true;
        
        // ground
        this.ground = this.add.rectangle(400,600,800,100, 0xFFFFFF);
        this.physics.add.existing(this.ground, true);
        
        this.physics.add.collider(this.player, this.ground);
        
        // left wall for player
        this.wall = this.add.rectangle(-20,300,50,800, 0xFFFFFF);
        this.physics.add.existing(this.wall, true);

        this.physics.add.collider(this.player, this.wall);

        this.enemies = [];
        
        this.enemy1 = this.add.circle(600,400, 30, 0xFF0000);
        this.physics.add.existing(this.enemy1);
        this.physics.add.collider(this.enemy1, this.ground);
        this.enemies.push(this.enemy1);
        
        this.enemy2 = this.add.circle(800,400, 30, 0xFF0000);
        this.physics.add.existing(this.enemy2);
        this.physics.add.collider(this.enemy2, this.ground);
        this.enemies.push(this.enemy2);


        this.physics.add.collider(this.player, this.enemies, () => {
            //game over
            this.reset();
        });
        
        this.add.text(400, 400, "W to jump");
        this.add.text(100, 450, "D to move");

        this.wkey = this.input.keyboard.addKey('W');
        this.akey = this.input.keyboard.addKey('A');
        this.dkey = this.input.keyboard.addKey('D');
    }
    update() {
        this.enemy1.body.velocity.x = -70;
        this.enemy2.body.velocity.x = -50;

        if (this.akey.isDown) {
            this.player.body.velocity.x = -160;
        }
        else if (this.dkey.isDown) {
            this.player.body.velocity.x = 160;
        }
        else {
            this.player.body.velocity.x = 0;
        }

        if (this.wkey.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -250;

        }

        // win condition
        if (this.player.body.x > 800){
            this.reset();
        }
    }
}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [GameScene],
};

let game = new Phaser.Game(config);