
import Pixi from 'pixi.js'
import { Vector2, toRadians } from 'mathutil'


/**
 * User data should be bounced back to the appState, but, benchmark it once there
 * are some tick updates updating the physics
 */
export default class User {
    constructor() {
        this.sprite = new Pixi.Sprite()
        this.pos = new Vector2( 0, 0 )
        this.dir = new Vector2( 0, 1 ).unit()
        this.acceleration = 0
        this.angular = 0

        this.accelerationForce = 1.5
        this.angularForce = 1.1

        // @TODO remove, or at least sort out a better debug
        this.posX = document.querySelector( '.posx' )
        this.posY = document.querySelector( '.posy' )
    }

    update() {
        // @TODO update this debug info
        this.posX.innerHTML = this.pos.x.toFixed( 2 )
        this.posY.innerHTML = this.pos.y.toFixed( 2 )

        // Apply some friction
        this.acceleration *= .95

        // Apply shield to stop us if we're close to stopping
        if ( this.acceleration > -.25 && this.acceleration < .5 ) {
            this.acceleration = 0
        }

        if ( this.acceleration ) {
            this.pos = this.pos.add( this.dir.scalar( this.acceleration ) )
        }

        // Handle rotation
        this.angular *= .9
        if ( this.angular > -.75 && this.angular < .75 ) {
            this.angular = 0
        }

        if ( this.angular ) {
            this.dir = this.dir.rotate( toRadians( this.angular ) )
        }
    }

    forward = () => {
        if ( this.acceleration < .5 ) {
            this.acceleration = .5
        }

        if ( this.acceleration < 4.75 ) {
            this.acceleration *= this.accelerationForce
        }
    }

    backward = () => {
        this.acceleration *= .85

        if ( this.acceleration > .5 ) {
            this.acceleration *= this.accelerationForce / 2
            return
        }

        if ( this.acceleration === 0 ) {
            this.acceleration = -.5
        }

        if ( this.acceleration > -2 ) {
            this.acceleration *= this.accelerationForce * .75
        }
    }

    left = () => {
        if ( this.angular <= -4 ) {
            return
        }

        this.angular -= this.angularForce
    }

    right = () => {
        if ( this.angular >= 4 ) {
            return
        }
        this.angular += this.angularForce
    }
}
