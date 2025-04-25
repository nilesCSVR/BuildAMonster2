class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = { sprite: {} };
        this.bodyX = 300;
        this.bodyY = 350;
        this.speed = 2;
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        document.getElementById('description').innerHTML = 
        '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>';
    }

    create() {
        let my = this.my;

        
        // Legs
        my.sprite.legL = this.add.sprite(this.bodyX - 50, this.bodyY + 130, "monsterParts", "leg_blueA.png");
        my.sprite.legR = this.add.sprite(this.bodyX + 50, this.bodyY + 130, "monsterParts", "leg_blueA.png");
        my.sprite.legL.flipX = true;

        // Arms
        my.sprite.armL = this.add.sprite(this.bodyX - 100, this.bodyY + 80, "monsterParts", "arm_blueD.png");
        my.sprite.armR = this.add.sprite(this.bodyX + 100, this.bodyY + 80, "monsterParts", "arm_blueD.png");
        my.sprite.armL.flipX = true;

        // Monster body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueB.png");

        // Eye
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 50, "monsterParts", "eye_cute_dark.png");

        // Mouths
        my.sprite.mouthSmile = this.add.sprite(this.bodyX, this.bodyY + 30, "monsterParts", "mouth_closed_happy.png");
        my.sprite.mouthFangs = this.add.sprite(this.bodyX, this.bodyY + 30, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.mouthFangs.visible = false; 

        // Accessories
        my.sprite.antennaR = this.add.sprite(this.bodyX - 40, this.bodyY - 110, "monsterParts", "detail_blue_antenna_large.png");
        my.sprite.antennaL = this.add.sprite(this.bodyX + 40, this.bodyY - 110, "monsterParts", "detail_blue_antenna_large.png");
        my.sprite.antennaR.flipX = true;

        // Keyboard input
        this.cursors = this.input.keyboard.addKeys({
            left: 'A',
            right: 'D',
            smile: 'S',
            fangs: 'F'
        });
    }

    update() {
        let my = this.my;

        // smiles/fang keyboard inputs
        if (Phaser.Input.Keyboard.JustDown(this.cursors.smile)) {
            my.sprite.mouthSmile.visible = true;
            my.sprite.mouthFangs.visible = false;
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.fangs)) {
            my.sprite.mouthSmile.visible = false;
            my.sprite.mouthFangs.visible = true;
        }

        // moving left and right
        let moveX = 0;
        if (this.cursors.left.isDown) {
            moveX = -this.speed;
        } else if (this.cursors.right.isDown) {
            moveX = this.speed;
        }

        if (moveX !== 0) {
            for (let part in my.sprite) {
                my.sprite[part].x += moveX;
            }
        }
    }
}
