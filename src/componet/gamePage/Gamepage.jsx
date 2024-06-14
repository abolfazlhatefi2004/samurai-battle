import { useState, useRef, useEffect } from "react";
// js files
import Sprite from './GameJs/Sprite';
import Fighter from './GameJs/Fighter';
import rectangularCollision from './GameJs/RectangularCollision';
// images
import imageSrc from "../../image/background.png";
import shopImageSrc from "../../image/shop.png";
import samuraiMackImg from "../../image/samuraiMack/Idle.png";
import samuraiMackImgRun from "../../image/samuraiMack/Run.png";
import samuraiMackImgAttack from "../../image/samuraiMack/Attack1.png";
import samuraiMackImgJump from "../../image/samuraiMack/Jump.png";
import samuraiMackImgFall from "../../image/samuraiMack/Fall.png";
import samuraiMackImgTakeHit from "../../image/samuraiMack/TakeHit-white-silhouette.png";
import samuraiMackImgDeath from "../../image/samuraiMack/Death.png";
import evilWizard from "../../image/evilWizard/Idle.png";
import evilWizardRun from "../../image/evilWizard/Run.png";
import evilWizardAttack from "../../image/evilWizard/Attack2.png";
import evilWizardJump from "../../image/evilWizard/Jump.png";
import evilWizardFall from "../../image/evilWizard/Fall.png";
import evilWizardTakeHit from "../../image/evilWizard/TakeHit.png";
import evilWizardDeath from "../../image/evilWizard/Death.png";
// component
import HealthBar from "./Healthbar";
import EndingModal from "./EndingModal";


const initialModalInfo = { flag: false, massage: '', };
const initialPlayersHealth = { playerHealth: 100, enemyHealth: 100, };
let animationloop = null;

export default function GamePage() {
    const preCanvas = useRef();
    const [modalInfo, setModalInfo] = useState(initialModalInfo);
    const [playersHealth, setPlayersHealth] = useState(initialPlayersHealth);
    const [playAgain, setPlayAgain] = useState(false);


    useEffect(() => {
        const canvas = preCanvas.current;
        //  function game
        function generateGame() {
            canvas.width = 1024;
            canvas.height = 576;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = 'pink';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const keys = {
                a: {
                    pressed: false
                },
                d: {
                    pressed: false
                },
                w: {
                    pressed: false
                },
                ArrowRight: {
                    pressed: false
                },
                ArrowLeft: {
                    pressed: false
                },
            };
            // make backgroundImage
            const background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                ctx,
                canvas,
                imageSrc,
            });
            // make shopImage
            const shop = new Sprite({
                position: {
                    x: 600,
                    y: 127,
                },
                ctx,
                canvas,
                imageSrc: shopImageSrc,
                scale: 2.75,
                frameMax: 6,
            });
            // make player
            const player = new Fighter({
                position: {
                    x: 0,
                    y: 0
                },
                ctx,
                velocity: {
                    x: 0,
                    y: 0
                },
                canvas,
                color: 'red',
                offset: {
                    x: 0,
                    y: 0,
                },
                imageSrc: samuraiMackImg,
                scale: 2.5,
                frameMax: 8,
                offset: {
                    x: 150,
                    y: 156
                },
                sprites: {
                    idle: {
                        imageSrc: samuraiMackImg,
                        frameMax: 8,
                    },
                    run: {
                        imageSrc: samuraiMackImgRun,
                        frameMax: 8,
                    },
                    attack: {
                        imageSrc: samuraiMackImgAttack,
                        frameMax: 6,
                    },
                    jump: {
                        imageSrc: samuraiMackImgJump,
                        frameMax: 2,
                    },
                    fall: {
                        imageSrc: samuraiMackImgFall,
                        frameMax: 2,
                    },
                    takeHit: {
                        imageSrc: samuraiMackImgTakeHit,
                        frameMax: 4,
                    },
                    death: {
                        imageSrc: samuraiMackImgDeath,
                        frameMax: 6,
                    },
                },
                attackBox: {
                    offset: {
                        x: 120,
                        y: 40,
                    },
                    width: 160,
                    height: 30,
                },
            });
            player.draw();
            // make enemy
            const enemy = new Fighter({
                position: {
                    x: 400,
                    y: 200
                },
                ctx,
                velocity: {
                    x: 0,
                    y: 0
                },
                canvas,
                color: 'green',
                // offset: {
                //     x: -50,
                //     y: 0,
                // },
                imageSrc: evilWizard,
                scale: 2.6,
                frameMax: 8,
                offset: {
                    x: 215,
                    y: 285
                },
                sprites: {
                    idle: {
                        imageSrc: evilWizard,
                        frameMax: 8,
                    },
                    run: {
                        imageSrc: evilWizardRun,
                        frameMax: 8,
                    },
                    attack: {
                        imageSrc: evilWizardAttack,
                        frameMax: 8,
                    },
                    jump: {
                        imageSrc: evilWizardJump,
                        frameMax: 2,
                    },
                    fall: {
                        imageSrc: evilWizardFall,
                        frameMax: 2,
                    },
                    takeHit: {
                        imageSrc: evilWizardTakeHit,
                        frameMax: 3,
                    },
                    death: {
                        imageSrc: evilWizardDeath,
                        frameMax: 7,
                    },
                },
                frameDirectionRtl: false,
                attackBox: {
                    offset: {
                        x: -251,
                        y: 0,
                    },
                    width: 351,
                    height: 30,
                },
            });
            enemy.draw();

            window.addEventListener('keydown', e => {
                if (!player.dead) {
                    switch (e.key) {
                        case 'd':
                            keys.d.pressed = true;
                            player.lastKey = 'd';
                            break;
                        case 'a':
                            keys.a.pressed = true;
                            player.lastKey = 'a';
                            break;
                        case 'w':
                            player.velocity.y = -20;
                            break;
                        case 's':
                            player.attack();
                            break;
                    }
                }
                if (!enemy.dead) {
                    switch (e.key) {
                        case 'ArrowRight':
                            keys.ArrowRight.pressed = true;
                            enemy.lastKey = 'ArrowRight';
                            break;
                        case 'ArrowLeft':
                            keys.ArrowLeft.pressed = true;
                            enemy.lastKey = 'ArrowLeft';
                            break;
                        case 'ArrowUp':
                            enemy.velocity.y = -20;
                            break;
                        case 'ArrowDown':
                            enemy.attack();
                            break;
                    }
                }
            });
            window.addEventListener('keyup', e => {
                switch (e.key) {
                    case 'd':
                        keys.d.pressed = false;
                        break;
                    case 'a':
                        keys.a.pressed = false;
                        break;
                    case 'ArrowRight':
                        keys.ArrowRight.pressed = false;
                        break;
                    case 'ArrowLeft':
                        keys.ArrowLeft.pressed = false;
                        break;
                }
            });
            function determineWinner({ player, enemy }) {
                (enemy.health === player.health) ? setModalInfo({ flag: true, massage: 'Tie' }) :
                    (enemy.health < player.health) ? setModalInfo({ flag: true, massage: 'Samurai Mack is won' }) :
                        setModalInfo({ flag: true, massage: 'Evil Wizard is won' });
                // cancel the animation loop 
                setTimeout(() => cancelAnimationFrame(animationloop), 1000);
            }
            // animating function
            function Animation() {
                animationloop = window.requestAnimationFrame(Animation);
                ctx.fillStyle = 'pink';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                background.update();
                shop.update();
                ctx.fillStyle = 'rgba(255 , 255, 255, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                player.update();
                enemy.update();

                // player movement 
                player.velocity.x = 0;
                if (keys.a.pressed && player.lastKey === 'a') {
                    player.switchSprite('run');
                    player.velocity.x = -5;
                } else if (keys.d.pressed && player.lastKey === 'd') {
                    player.switchSprite('run');
                    player.velocity.x = 5;
                } else {
                    player.switchSprite('idle');
                }

                // player jumping
                (player.velocity.y < 0) ? player.switchSprite('jump') :
                    (player.velocity.y > 0) && player.switchSprite('fall');
                // enemy movement
                enemy.velocity.x = 0;
                if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
                    enemy.switchSprite('run');
                    enemy.velocity.x = 5;
                } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
                    enemy.switchSprite('run');
                    enemy.velocity.x = -5;
                } else {
                    enemy.switchSprite('idle');
                }
                // enemy jumping
                (enemy.velocity.y < 0) ? enemy.switchSprite('jump') :
                    (enemy.velocity.y > 0) && enemy.switchSprite('fall');


                // detect for collision for player = take hit for enemy
                if (rectangularCollision({
                    rectangle1: player,
                    rectangle2: enemy,
                }) && player.frameCurrent === 4
                ) {
                    enemy.takeHit();
                    player.isAttacking = false;
                    setPlayersHealth(prev => {
                        return {
                            ...prev,
                            enemyHealth: enemy.health
                        }
                    });
                }

                //         // if player misses
                if (player.isAttacking && player.frameCurrent === 4) {
                    player.isAttacking = false;
                }
                //         // detect for collision for enemy
                if (rectangularCollision({
                    rectangle1: enemy,
                    rectangle2: player,
                }) && enemy.frameCurrent === 3
                ) {
                    player.takeHit();
                    enemy.isAttacking = false;
                    setPlayersHealth(prev => {
                        return {
                            ...prev,
                            playerHealth: player.health
                        }
                    });
                }
                // if enemy misses
                if (enemy.isAttacking && enemy.frameCurrent === 3) {
                    enemy.isAttacking = false;
                }
                // end game based in health
                ((enemy.health <= 0 || player.health <= 0) && !modalInfo.flag) && determineWinner({ player, enemy });


            }
            Animation();
        }
        generateGame();
    }, [playAgain]);


    let playAgainHandler = e => {
        e.preventDefault();
        setModalInfo(initialModalInfo);
        setPlayersHealth(initialPlayersHealth);
        setPlayAgain(prev => !prev);
    }



    return (
        <div className="h-screen flex justify-center">
            <canvas ref={preCanvas}></canvas>
            <HealthBar  playersHealth={playersHealth} />
            {modalInfo.flag && <EndingModal modalInfo={modalInfo} playAgainHandler={playAgainHandler} />}
        </div>
    );
}