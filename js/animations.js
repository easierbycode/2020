import Properties from './properties.js'

export function initAnimations() {
    // Create animations with postfixes for sprites and keys
    ['', '-koala', '-mask'].forEach(postfix => {
        Properties.scene.anims.create({
            key: `idle${postfix}`,
            frames: `player-idle${postfix}`,
            frameRate: 10,
            repeat: -1
        })
        Properties.scene.anims.create({
            key: `run${postfix}`,
            frames: `player-run${postfix}`,
            frameRate: 10,
            repeat: -1
        })
        Properties.scene.anims.create({
            key: `jump${postfix}`,
            frames: `player-jump${postfix}`,
            frameRate: 5
        })
    })
    // Fall animation for player withou mask or koala
    Properties.scene.anims.create({
        key: 'fall',
        frames: Properties.scene.anims.generateFrameNumbers('player-jump', { start: 1, end: 2 }),
        frameRate: 10,
        repeat: -1
    })
}
