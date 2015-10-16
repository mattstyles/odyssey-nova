
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

        this.turnThrust = .005
        this.thrust = .05

        this.position[1] = 80
        this.angularDamping = .05


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
                'px': this.position[ 0 ].toFixed( 2 ),
                'py': this.position[ 1 ].toFixed( 2 ),
                'pa': wrap( toDegrees( this.angle ), 0, 360 ).toFixed( 2 ),
                'vx': this.velocity[ 0 ].toFixed( 4 ),
                'vy': this.velocity[ 1 ].toFixed( 4 ),
                'va': this.angularVelocity.toFixed( 4 )
            }
        })

        this.ship.position.set( ...this.position )
        this.ship.rotation = this.angle
    }

    forward = () => {
        // Apply thrust from directly behind the ship
        // Use force local to account for body rotation
        this.applyForceLocal( [ 0, this.thrust ] )
    }

    backward = () => {
        // @TODO
    }

    left = () => {
        this.angularVelocity = -this.turnThrust
    }

    right = () => {
        this.angularVelocity = this.turnThrust
    }
}
