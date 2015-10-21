
import Pixi from 'pixi.js'
import P2 from 'p2'
import { Vector2, toRadians, toDegrees, wrap } from 'mathutil'

import Ship from 'entities/ship'
import materials from 'world/materials'
import shipComponents from 'stores/shipComponents'

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
 * are some tick updates updating the physics.
 */
export default class User extends Ship {
    constructor() {
        super()

        // Update damping for the user to make it more controllable
        this.body.damping = .1
        this.body.angularDamping = .75

        this.lineColor = 0xb3e5fc

        // @TODO replace with sprite
        this.sprite = new Pixi.Graphics()
        this.container.addChild( this.sprite )

        // Add hardpoints
        this.hardpoints.set( 'hull', null )
        this.hardpoints.set( 'linearThrust', null )

        // Add a hull component
        let hull = shipComponents.get( 'userHull' )
        this.mountHardpoint( 'hull', hull )

        // Add a main engine thruster
        let thruster = shipComponents.get( 'defaultThruster' )
        // @TODO hardpoints should have the position, not the component
        thruster.offset = [ 0, thruster.radius - hull.radius ]
        this.mountHardpoint( 'linearThrust', thruster )
    }

    render() {
        super()

        let radius = this.hardpoints.get( 'hull' ).radius

        this.sprite.beginFill( 0x040414 )
        this.sprite.lineStyle( 1, this.lineColor, 1 )
        this.sprite.arc(
            0,
            0,
            radius * .5,
            toRadians( 220 ), toRadians( 320 ), false
        )
        this.sprite.lineTo( 0, radius * .75 )
        this.sprite.endFill()
    }

    update() {
        super()

        // update this debug info
        updateDebug({
            'user': {
                'px': this.position[ 0 ].toFixed( 2 ),
                'py': this.position[ 1 ].toFixed( 2 ),
                'pa': wrap( toDegrees( this.angle ), 0, 360 ).toFixed( 2 ),
                'vx': this.body.velocity[ 0 ].toFixed( 4 ),
                'vy': this.body.velocity[ 1 ].toFixed( 4 ),
                'va': this.body.angularVelocity.toFixed( 4 ),
                'fx': this.body.force[ 0 ].toFixed( 6 ),
                'fy': this.body.force[ 1 ].toFixed( 6 )
            }
        })
    }
}
