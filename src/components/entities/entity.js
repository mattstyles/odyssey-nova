
import Pixi from 'pixi.js'
import P2 from 'p2'
import random from 'lodash.random'

import materials from 'entities/materials'

export default class Entity {
    constructor( opts = {
        radius: random( 10, 30 ),
        mass: random( 10, 30 )
    }) {
        this.sprite = new Pixi.Sprite()

        this.radius = opts.radius
        opts.mass = opts.radius

        this.shape = new P2.Circle({
            radius: this.radius
        })
        this.shape.material = materials.get( '_default' )
        this.body = new P2.Body({
            mass: opts.mass,
            position: [ 0, 0 ],
            angularVelocity: 0
        })

        this.body.addShape( this.shape )

        // Play with the damping
        this.body.damping = .005
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
        this.update()
        this.graphics.clear()
        this.graphics.beginFill( 0xffffff, .25 )
        this.graphics.drawCircle(
            0,
            0,
            this.radius
        )
        this.graphics.endFill()
        this.graphics.lineStyle( 1, 0xffffff, .85 )
        this.graphics.arc(
            0,
            0,
            this.radius,
            0, Math.PI * 2, false
        )
        this.graphics.lineTo( 0, 0 )
    }

    update() {
        this.graphics.position.x = this.body.position[ 0 ]
        this.graphics.position.y = this.body.position[ 1 ]
        this.graphics.rotation = this.body.angle
    }
}
