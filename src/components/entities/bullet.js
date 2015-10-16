
import P2 from 'p2'
import Pixi from 'pixi.js'

import Entity from 'entities/entity'



export default class Bullet extends Entity {
    constructor( opts = {} ) {
        super( Object.assign({
            radius: 3,
            mass: 5
        }, opts ))

        this.body.damping = .0005

        // Force is linked to mass, but this should all be controlled somewhere
        // else. To negate mass manually set velocity, but thats a bit shit.
        // This should probably be set by the firer based on some properties.
        this.body.applyForceLocal( [ 0, .1 ] )

        // An option for bullets is to turn off collision response (body.collisionResponse)
        // which would fire events so kill bullet on event, but save
        // cycles on collision physics
        // Bullets should probably also be kinematic to save cycles, but
        // only if kinematic emit collision events
        // Bullets should almost certainly not collide with each other
    }

    update() {
        super()
    }
}
