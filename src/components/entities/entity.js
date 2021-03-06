
import Pixi from 'pixi.js'
import P2 from 'p2'
import random from 'lodash.random'

import materials from 'world/materials'

/**
 * Entity is a fairly abstract class, usually it’ll be instantiated with either
 * a body (ShellEntity), a renderable (GhostEntity) or both (PhysicalEntity).
 */
export default class Entity {
    constructor( opts = {} ) {
        // Id is assigned when the entity joins an engine
        this.id = null

        // All entities need a position
        this.position = opts.position || [ 0, 0 ]
    }

    /**
     * Render is called as infrequently as possible, usually at instantiation
     * but also after entity mutations which alter appearance
     */
    render() {
        // abstract
    }

    /**
     * Entities usually need to update themselves. A world update sorts out
     * the physics update but those values will need bouncing back to the
     * renderable
     */
    update() {

    }

    /**
     * In order to save state there needs to be a way to stringify each entity,
     * this gets tricky when p2.bodies and p2.shapes are pixi stuff are added
     * the entity object. A dedicated toString or toJSON will help.
     */
    toJSON() {

    }
}
