
import P2 from 'p2'
import Pixi from 'pixi.js'

import PhysicalEntity from 'entities/physical'



export default class Bullet extends PhysicalEntity {
    constructor( opts = {} ) {
        super( opts )

        this.damping = .005

        // @TODO set velocity to match that of firer
        // Easy enough, extract this into a craft class and use it on
        // craft.fire to create the bullet particle, then add velocity and
        // finally add a little more retro thrust to kick it out from the craft.
        // Can not just add force because acceleration is proportionate to force
        // over mass and the mass of the projectile will not match that of the
        // craft, resulting is massively higher acceleration.


        // Force is linked to mass, but this should all be controlled somewhere
        // else. To negate mass manually set velocity, but thats a bit shit.
        // This should probably be set by the firer based on some properties.
        //this.applyForceLocal( [ 0, .1 ] )

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
