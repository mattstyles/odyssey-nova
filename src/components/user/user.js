
import Pixi from 'pixi.js'
import P2 from 'p2'
import { Vector2, toRadians, toDegrees, wrap } from 'mathutil'

import Entity from 'entities/entity'
import materials from 'entities/materials'

// @TODO only for registering debug info
import appState from 'stores/appState'

function updateDebug( obj ) {
    appState.get().cursor([ 'main', 'debug' ]).update( cursor => {
        return cursor.merge( obj )
    })
}


/**
 * User data should be bounced back to the appState, but, benchmark it once there
 * are some tick updates updating the physics
 */
export default class User extends Entity {
    constructor() {
        super({
            radius: 10,
            mass: 20
        })

        this.angularForce = .005
        this.engineForce = .05

        this.body.position[1] = 80


        // @TODO replace with sprite
        this.ship = new Pixi.Graphics()
        this.container.addChild( this.ship )

        this._drawShip()
    }

    _drawShip() {
        this.ship.beginFill( 0x040414 )
        this.ship.lineStyle( 1, 0xb3e5fc, 1 )
        this.ship.arc(
            0,
            0,
            this.radius * .5,
            toRadians( 220 ), toRadians( 320 ), false
        )
        this.ship.lineTo( 0, this.radius * .75 )
        this.ship.endFill()
    }

    update() {
        super()

        // update this debug info
        updateDebug({
            'user': {
                'px': this.body.position[ 0 ].toFixed( 2 ),
                'py': this.body.position[ 1 ].toFixed( 2 ),
                'pa': wrap( toDegrees( this.body.angle ), 0, 360 ).toFixed( 2 ),
                'vx': this.body.velocity[ 0 ].toFixed( 4 ),
                'vy': this.body.velocity[ 1 ].toFixed( 4 ),
                'va': this.body.angularVelocity.toFixed( 4 )
            }
        })

        this.ship.position.set( ...this.body.position )
        this.ship.rotation = this.body.angle
    }

    forward = () => {
        // Apply thrust from directly behind the ship
        // Use force local to account for body rotation
        this.body.applyForceLocal( [ 0, this.engineForce ] )
    }

    backward = () => {
        // @TODO
    }

    left = () => {
        this.body.angularVelocity = -this.angularForce
    }

    right = () => {
        this.body.angularVelocity = this.angularForce
    }
}
