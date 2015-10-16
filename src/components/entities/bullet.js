
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
    }

    update() {
        super()
    }
}
