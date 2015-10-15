
import Pixi from 'pixi.js'
import P2 from 'p2'
import { Vector2, toRadians } from 'mathutil'


/**
 * User data should be bounced back to the appState, but, benchmark it once there
 * are some tick updates updating the physics
 */
export default class User {
    constructor() {
        this.sprite = new Pixi.Sprite()

        // @TODO remove, or at least sort out a better debug
        this.posX = document.querySelector( '.posx' )
        this.posY = document.querySelector( '.posy' )

        this.angularForce = .04
        this.engineForce = .025

        // Bounds
        this.shape = new P2.Circle({
            radius: 1
        })

        // Body physics
        this.body = new P2.Body({
            mass: 1,
            position: [ 0, 0 ],
            angularVelocity: 0,
            angle: 0
        })
        this.body.addShape( this.shape )


        // @TODO just for debug
        this.graphics = new Pixi.Graphics()
        // this.graphics.beginFill( 0xb3e5fc )
        this.graphics.lineStyle( 1, 0xb3e5fc, 1 )
        this.graphics.arc(
            this.body.position[ 0 ],
            this.body.position[ 1 ],
            10 * this.shape.radius,
            toRadians( 220 ), toRadians( 320 ), false
        )
        this.graphics.lineTo( 0, 10 )
    }

    update() {
        // @TODO update this debug info
        this.posX.innerHTML = this.body.position[ 0 ].toFixed( 2 )
        this.posY.innerHTML = this.body.position[ 1 ].toFixed( 2 )

        this.graphics.position.x = this.body.position[ 0 ]
        this.graphics.position.y = this.body.position[ 1 ]
        this.graphics.rotation = this.body.angle

    }

    forward = () => {
        // Apply thrust from directly behind the ship
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
