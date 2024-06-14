export default class Sprite {
    constructor({ position, ctx, canvas, imageSrc, scale = 1, frameMax = 1, offset = { x: 0, y: 0 }, frameDirectionRtl = true }) {
        this.position = position;
        this.ctx = ctx;
        this.canvas = canvas;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.frameMax = frameMax;
        this.frameCurrent = this.frameDirectionRtl ? 0 : this.frameMax - 1;
        this.frameElapsed = 0;
        this.frameHold = 7;
        this.offset = offset;
        this.frameDirectionRtl = frameDirectionRtl;
    }

    draw() {
        // console.log(this.image);
        this.ctx.drawImage(this.image,
            this.frameCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.frameMax) * this.scale,
            this.image.height * this.scale,);
    };

    animateFrame() {
        this.frameElapsed++;
        if (this.frameElapsed % this.frameHold === 0) {
            if (this.frameDirectionRtl) {
                (this.frameCurrent < this.frameMax - 1) ?
                    this.frameCurrent++ :
                    this.frameCurrent = 0;
            } else {
                (this.frameCurrent > 0) ?
                    this.frameCurrent-- :
                    this.frameCurrent = this.frameMax - 1;
            }

        }
    }

    update() {
        this.draw();
        this.animateFrame();

    };
}