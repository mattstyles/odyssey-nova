
import Pixi from 'pixi.js'
import P2 from 'p2'
import random from 'lodash.random'

import materials from 'entities/materials'

export default class Entity extends P2.Body {
    constructor( options = {} ) {
        opts = Object.assign({
            radius: random( 10, 30 ),
            mass: random( 10, 30 ),
            position: [ 0, 0 ],
            velocity: [ 0, 0 ],
            angle: 0
        }, options )

        super( opts )

        this.sprite = new Pixi.Sprite()

        this.radius = opts.radius

        this.addShape( new P2.Circle({
            radius: this.radius,
            material: materials.get( '_default' ),
            position: [ 0, 0 ],
            angle: this.angle + Math.PI * .5
        }))

        //Play with the damping
        this.damping = .0025
        this.angularDamping = .00085

        this.container = new Pixi.Container()
        this.graphics = new Pixi.Graphics()

        this.container.addChild( this.graphics )
    }

    // All movement values are relative to graphics.position, which is body.position
    _drawDebug() {
        this.graphics.clear()

        var drawCircle = ( x, y, r, angle ) => {
            this.graphics.moveTo( x, y )
            this.graphics.beginFill( 0xffffff, .1 )
            this.graphics.drawCircle(
                x,
                y,
                r
            )
            this.graphics.endFill()
            this.graphics.lineStyle( 1, 0xffffff, .3 )
            this.graphics.arc(
                x,
                y,
                r,
                angle + Math.PI * .5, angle + Math.PI * 2.5, false
            )
            this.graphics.lineTo( x, y )
        }

        this.shapes.forEach( shape => {
            drawCircle( shape.position[ 0 ], shape.position[ 1 ], shape.radius, shape.angle )
        })

    }

    /**
     * Moves visuals in line with the underlying physics body
     */
    update() {
        this.graphics.position.set( ...this.position )
        this.graphics.rotation = this.angle

        this.sprite.position.set( ...this.position )
        this.sprite.rotation = this.angle
    }
}
