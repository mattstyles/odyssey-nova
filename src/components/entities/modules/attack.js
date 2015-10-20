
import Projectile from 'entities/projectile'

import config from 'stores/config'
import EVENTS from 'constants/events'
import engineDispatcher from 'dispatchers/engineDispatcher'

/**
 * Composed modules should call the super constructor to use the inheritance
 * chain and then add properties within a namespace, in this case 'attack' is
 * used as a namespace
 * @function returns @class
 */
export default Base => class AttackModule extends Base {
    /**
     * 'attack' namespaced properties
     * @constructs
     */
    constructor( opts ) {
        super( opts )

        /**
         * @namespace attack
         */
        this.attack = {}

        // Attack is currently rate limited to the user event registered with Quay,
        // which is clamped to the animation frame refresh rate.
        this.attack.fireRate = 1 / 60

        // Turrets should implement their own refresh rate, which determines their
        // rate of fire. This module should just attempt to fire as quickly as
        // possible and let the turret component sort out fulfilling that request.
        this.attack.lastTime = 0
    }

    /**
     * Currently fires all turrets associated with the entity
     */
    fire() {
        if ( config.get( 'worldTime' ) - this.attack.lastTime < this.attack.fireRate ) {
            return
        }

        // For now assume a turret position of ship center and dictate that
        // the projectile creation zone is directly in front, to stop instant
        // collisions with the firer
        let r = ( this.radius + 3 ) * 1.5
        let angle = this.angle + Math.PI * .5
        let mag = 50

        let turretPos = [
            r * Math.cos( angle ) + this.position[ 0 ],
            r * Math.sin( angle ) + this.position[ 1 ],
        ]

        let velocity = [
            mag * Math.cos( angle ) + this.body.velocity[ 0 ],
            mag * Math.sin( angle ) + this.body.velocity[ 1 ]
        ]

        let projectile = new Projectile({
            position: turretPos,
            velocity: velocity,
            angle: this.angle
        })

        // Now need some way of adding the entity to the engine world
        engineDispatcher.dispatch({
            type: EVENTS.get( 'ENTITY_ADD' ),
            payload: {
                entities: [ projectile ]
            }
        })
    }
}
