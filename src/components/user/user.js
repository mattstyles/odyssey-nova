
import Pixi from 'pixi.js'
import P2 from 'p2'
import { Vector2, toRadians } from 'mathutil'

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
export default class User {
    constructor() {
        this.sprite = new Pixi.Sprite()

        this.angularForce = .04
        this.engineForce = .025

        this.circularSize = 10

        // Bounds
        this.shape = new P2.Circle({
            radius: this.circularSize
        })

        // Body physics
        this.body = new P2.Body({
            mass: 2,
            position: [ 0, 0 ],
            angularVelocity: 0,
            angle: 0
        })
        this.body.addShape( this.shape )


        // @TODO just for debug
        this.graphics = new Pixi.Graphics()
        this.graphics.beginFill( 0x040414 )
        this.graphics.lineStyle( 1, 0xb3e5fc, 1 )
        this.graphics.arc(
            this.body.position[ 0 ],
            this.body.position[ 1 ],
            this.circularSize,
            toRadians( 220 ), toRadians( 320 ), false
        )
        this.graphics.lineTo( 0, this.circularSize )
    }

    update() {
        // update this debug info
        updateDebug({
            'user': {
                'position x': this.body.position[ 0 ].toFixed( 2 ),
                'position y': this.body.position[ 1 ].toFixed( 2 ),
                'force x': this.body.force[ 0 ].toFixed( 2 ),
                'force y': this.body.force[ 1 ].toFixed( 2 )
            }
        })

        this.graphics.position.x = this.body.position[ 0 ]
        this.graphics.position.y = this.body.position[ 1 ]
        this.graphics.rotation = this.body.angle

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
