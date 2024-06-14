import Sprite from "./Sprite";


export default class Fighter extends Sprite {
    constructor({
        position,
        ctx,
        velocity,
        canvas,
        color,
        imageSrc,
        scale = 1,
        frameMax = 1,
        offset = { x: 0, y: 0 },
        sprites,
        frameDirectionRtl = true,
        attackBox = { offset: {}, width: undefined, height: undefined },
    }) {
        super({
            canvas,
            ctx,
            position,
            imageSrc,
            scale,
            frameMax,
            offset,
            frameDirectionRtl,
        });
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.gravity = 0.7;
        this.color = color;
        this.lastKey = '';
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        };
        this.isAttacking = false;
        this.health = 100;
        this.frameCurrent = this.frameDirectionRtl ? 0 : this.frameMax;
        this.frameElapsed = 0;
        this.frameHold = 10;
        this.sprites = sprites;
        this.dead = false;


        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
        }
    }
    update() {
        this.draw();
        (!this.dead) && this.animateFrame();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // attack box draw
        // this.ctx.fillRect(
        //     this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        // );

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= this.canvas.height - 96) {
            this.velocity.y = 0;
            this.position.y = 330
        } else {
            this.velocity.y += this.gravity;
        }
    };

    //  attack function
    attack() {
        this.switchSprite('attack');
        this.isAttacking = true;
    };

    takeHit() {
        this.health -= 20;
        (this.health <= 0) ? this.switchSprite('death') : this.switchSprite('takeHit');
    }

    frameDirectionChecker(frameMax) {
        return this.frameDirectionRtl ? 0 : frameMax - 1;

    }

    switchSprite(sprite) {
        // overriding when fighter gate hit
        if (this.image === this.sprites.attack.image) {
            if (this.frameDirectionRtl) {
                if (this.frameCurrent < this.sprites.attack.frameMax - 1) return;
            } else if (this.frameCurrent > 0) return;
        }
        // overriding all other animaitons with thie attack animation
        if (this.image === this.sprites.takeHit.image) {
            if (this.frameDirectionRtl) {
                if (this.frameCurrent < this.sprites.takeHit.frameMax - 1) return;
            } else if (this.frameCurrent > 0) return;
        }

        // generate death    
        if (this.image === this.sprites.death.image) {
            if (this.frameDirectionRtl) {
                if (this.frameCurrent === this.sprites.death.frameMax - 1) this.dead = true;
            } else if (this.frameCurrent === 0) this.dead = true;
            return;
        }


        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.frameMax = this.sprites.idle.frameMax;
                    this.frameCurrent = this.frameDirectionChecker(this.sprites.idle.frameMax);
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.frameMax = this.sprites.run.frameMax;
                    this.frameCurrent = this.frameDirectionChecker(this.sprites.run.frameMax);
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.frameMax = this.sprites.jump.frameMax;
                    this.frameCurrent = this.frameDirectionChecker(this.sprites.jump.frameMax);
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.frameMax = this.sprites.fall.frameMax;
                    this.frameCurrent = this.frameDirectionChecker(this.sprites.fall.frameMax);
                }
                break;
            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image;
                    this.frameMax = this.sprites.attack.frameMax;
                    this.frameCurrent = this.frameDirectionChecker(this.sprites.attack.frameMax);
                }
                break;
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image;
                    this.frameMax = this.sprites.takeHit.frameMax;
                    this.frameCurrent = this.frameDirectionChecker(this.sprites.takeHit.frameMax);
                }
                break;
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.frameMax = this.sprites.death.frameMax;
                    this.frameCurrent = this.frameDirectionChecker(this.sprites.death.frameMax);
                }
                break;
        }

    }

};