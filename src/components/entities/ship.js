
import P2 from 'p2'
import Pixi from 'pixi.js'

import PhysicalEntity from 'entities/physical'
import materials from 'world/materials'

export default class Ship extends PhysicalEntity {
    /**
     * @constructs
     * @return this
     */
    constructor( opts ) {
        super( opts )

        // @TODO Apply hull component, for now just set a radius and add a shape
        this.radius = opts.radius || 10
        this.addShape( new P2.Circle({
            radius: this.radius,
            material: materials.get( '_default' )
        }))

        // Set application forces
        // @TODO should be calculated from components
        // Thrust components should determine offset and magnitude of thrusts
        // applied per action i.e. main forward thrust should be a composite of
        // all the thrusters connected with the 'main:thrust' behaviour
        this.turnThrust = .25
        this.linearThrust = [
            {
                offset: [ 0, 0 ],
                magnitude: [ 0, 150 ]
            }
        ]
        this.bankThrust = 50

        // Set up damping
        // @TODO again, this should be calculated as damping components are added
        // or removed from the entity
        this.body.damping = .05
        this.body.angularDamping = .01

        // @TODO
        this._debug = true

        return this
    }

    /*-----------------------------------------------------------*
     *
     *  Add thrust behaviours
     *
     *-----------------------------------------------------------*/

    applyMainThruster = () => {
        this.linearThrust.forEach( thruster => {
            this.body.applyForceLocal( thruster.magnitude, thruster.offset )
        })
    }

    applyTurnLeft = () => {
        this.body.angularVelocity = -this.turnThrust
    }

    applyTurnRight = () => {
        this.body.angularVelocity = this.turnThrust
    }

    // Banking is almost like strafing, but results in a slight opposite turn as well
    // The slight offset implies the banking thrusters are located behind the
    // center of gravity, which accounts for the slight turn imparted
    applyBankLeft = () => {
        this.body.applyForceLocal( [ this.bankThrust, 0 ], [ 0, -1 ] )
    }
    
    applyBankRight = () => {
        this.body.applyForceLocal( [ -this.bankThrust, 0 ], [ 0, -1 ] )
    }


}