
import Pixi from 'pixi.js'
import P2 from 'p2'
import random from 'lodash.random'

import materials from 'entities/materials'

export default class Entity {
    constructor( opts = {
        radius: random( 10, 30 ),
        mass: random( 10, 30 ),
        position: [ 0, 0 ]
    }) {
        this.sprite = new Pixi.Sprite()

        this.radius = opts.radius

        this.shape = new P2.Circle({
            radius: this.radius,
            material: materials.get( '_default' )
        })

        this.body = new P2.Body({
            mass: opts.mass,
            position: opts.position,
            angularVelocity: 0
        })

        this.body.addShape( this.shape )

        // Play with the damping
        this.body.damping = .0025
        this.body.angularDamping = .05

        this.container = new Pixi.Container()
        this.graphics = new Pixi.Graphics()

        this.container.addChild( this.graphics )

        this._drawDebug()
    }

    setRadius( r ) {
        this.radius = r
        this.shape.radius = r

        this._drawDebug()
    }

    // All movement values are relative to graphics.position, which is body.position
    _drawDebug() {
        this.graphics.clear()
        this.graphics.beginFill( 0xffffff, .1 )
        this.graphics.drawCircle(
            0,
            0,
            this.radius
        )
        this.graphics.endFill()
        this.graphics.lineStyle( 1, 0xffffff, .3 )
        this.graphics.arc(
            0,
            0,
            this.radius,
            Math.PI * .5, Math.PI * 2.5, false
        )
        this.graphics.lineTo( 0, 0 )
    }

    /**
     * Moves visuals in line with the underlying physics body
     */
    update() {
        // this.graphics.position.x = this.body.position[ 0 ]
        // this.graphics.position.y = this.body.position[ 1 ]
        this.graphics.position.set( ...this.body.position )
        this.graphics.rotation = this.body.angle

        this.sprite.position.set( ...this.body.position )
        this.sprite.rotation = this.body.angle
    }
}
