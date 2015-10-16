
import Pixi from 'pixi.js'
import P2 from 'p2'
import { Vector2, toRadians, toDegrees, wrap } from 'mathutil'

import Entity from 'entities/entity'
import materials from 'entities/materials'

// @TODO only for registering debug info
import appState from 'stores/appState'

function updateDebug( obj ) {
    // These are expensive for cycles, not sure its going to work like this
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
        this.bankThrust = .025

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
                'va': this.angularVelocity.toFixed( 4 ),
                'fx': this.force[ 0 ].toFixed( 6 ),
                'fy': this.force[ 1 ].toFixed( 6 )
            }
        })

        this.ship.position.set( ...this.position )
        this.ship.rotation = this.angle
    }

    forward = () => {
        // Use force local to account for body rotation
        // Apply force from behind the craft, simulating a single engine mounted
        // centrally at the back of the craft
        this.applyForceLocal( [ 0, this.thrust ], [ 0, -1 ] )

        // This has to be set here because by the time we get to the next update
        // the force has already dissipated
        // appState.get().cursor([ 'main', 'debug', 'user' ]).update( cursor => {
        //     return cursor.merge( {
        //         'fx': this.force[ 0 ].toFixed( 6 ),
        //         'fy': this.force[ 1 ].toFixed( 6 )
        //     } )
        // })
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

    // Banking is almost like strafing, but results in a slight opposite turn as well
    // The slight offset implies the banking thrusters are located behind the
    // center of gravity, which accounts for the slight turn imparted
    bankLeft = () => {
        this.applyForceLocal( [ this.bankThrust, 0 ], [ 0, -1 ] )
    }
    bankRight = () => {
        this.applyForceLocal( [ -this.bankThrust, 0 ], [ 0, -1 ] )
    }
}
