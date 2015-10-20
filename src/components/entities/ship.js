
import P2 from 'p2'
import Pixi from 'pixi.js'

import compose from 'utils/compose'
import SC_TYPES from 'constants/shipComponentTypes'
import materials from 'world/materials'
import shipComponents from 'stores/shipComponents'

import PhysicalEntity from 'entities/physical'
import ThrustModule from 'entities/modules/thrust'
import AttackModule from 'entities/modules/attack'
import DebugModule from 'entities/modules/debug'

/**
 * Main ship entity
 * @see modules/README.md for the use of the mixin function
 * @class
 */
export default class Ship extends compose(
    PhysicalEntity.compose,
    AttackModule,
    ThrustModule,
    DebugModule ) {
    /**
     * @constructs
     * @return this
     */
    constructor( opts ) {
        super( opts )

        /**
         * The components refer to things installed on the ship, like thrusters,
         * weapons and shields
         */
        this.components = new Map()

        // Ships dont have components by default, they need to be added when the
        // ship is instantiated. They can have a default radius though.
        this.radius = opts.radius || 10


        // Set application forces
        // @TODO should be calculated from components
        // Thrust components should determine offset and magnitude of thrusts
        // applied per action i.e. main forward thrust should be a composite of
        // all the thrusters connected with the 'main:thrust' behaviour
        this.turnThrust = .25
        this.bankThrust = 50

        // Linear thrust is now recalculated from thrust components
        // @TODO Currently all thrust components contribute, this needs further
        // refinement
        this.linearThrust = [
            {
                offset: [ 0, 0 ],
                magnitude: [ 0, 150 ]
            }
        ]

        // Set up damping
        // @TODO again, this should be calculated as damping components are added
        // or removed from the entity
        this.body.damping = .05
        this.body.angularDamping = .01

        return this
    }

    addComponent( component ) {
        this.components.set( component.id, component )

        if ( component.shape ) {
            this.addShape( component.shape, component.offset || [ 0, 0 ], component.angle || 0 )
        }

        if ( component.type === SC_TYPES.get( 'THRUSTER' ) ) {
            this.calcLinearThrust()
        }

        return this
    }

    removeComponent( component ) {
        this.components.delete( component.id )

        if ( component.shape ) {
            this.removeShape( component.shape )
        }

        return this
    }

    /**
     * Loops through components, grabs thruster components and appends their
     * data to the linearThrust array.
     * This is done every time a component is added, which is better than doing
     * it every time we need to use the linear thrust to calculate momentum.
     * @returns this
     */
    calcLinearThrust() {
        // Filter component map to thruster types and generate a new array of
        // linear thrust components
        this.linearThrust = []
        this.components.forEach( component => {
            if ( component.type !== SC_TYPES.get( 'THRUSTER' ) ) {
                return
            }

            this.linearThrust.push({
                offset: component.offset,
                magnitude: component.magnitude
            })
        })
    }
}
