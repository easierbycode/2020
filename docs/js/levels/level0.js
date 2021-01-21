import AudioManager from '../audio.js'
import Constants from '../constants.js'
import Properties from '../properties.js'
import { fadeInOutTitle, playerSpriteThrow } from '../helpers.js'

// Additional processing of sprites from tilemap
const PROCESSING = {
    '0-ball': saveBall
}

// Tennis ball sprite
let ball


export default {
    preloadLevel: function() {
        Properties.map.getObjectLayer('level0').objects.forEach(image => {
            let sprite = Properties.addMapImage(image)

            if (image.name in PROCESSING)  PROCESSING[image.name](sprite)
        })
        // Intro music
        AudioManager.base.intro = Properties.scene.sound.add('intro', { loop: true })
    },
    checkpoint0: function() {
        // Set initial checkpoint
        Properties.checkpoint = 0
        // Play theme
        AudioManager.fadeIn('intro', Constants.VOLUME.intro)
        // Yandex.Metrika
        ym(70640851, 'reachGoal', 'CHECKPOINT_0')
    },
    addBird: function() {
        // Add bird to a distance from player's position
        let initialY = Properties.sceneSize.height * 0.2
        let initialX = Properties.player.x + Properties.sceneSize.width
        let bird = Properties.scene.add.sprite(initialX, initialY, '0-bird').setScale(2)
        // Create animation for the bird
        if (!Properties.scene.anims.exists('0-bird')) {
            Properties.scene.anims.create({
                key: '0-bird',
                frames: Properties.scene.anims.generateFrameNumbers('0-bird', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            })
        }
        // Play animation
        bird.anims.play('0-bird')
        // Add tween
        let tween = Properties.scene.tweens.add({
            targets: bird,
            x: Properties.player.x - Properties.sceneSize.width * 0.2,
            y: { value: Properties.sceneSize.height * 0.1, ease: 'Cubic.easeInOut' },
            duration: Constants.DURATION.bird,
            onComplete: () => {
                // Destroy bird and animation, stop tween
                bird.destroy()
                tween.stop()
            }
        })
    },
    showTitle: function() {
        fadeInOutTitle('2019')
    },
    throwBall: function() {
        // Get control
        Properties.takeControl()

        Properties.scene.time.delayedCall(500, () => {
            ball.destroy()
            
            playerSpriteThrow()

            Properties.scene.time.delayedCall(500, () => { Properties.giveControl() })
        })
    }
}

function saveBall(sprite) {
    ball = sprite
}