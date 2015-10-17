
import P2 from 'p2'



const _mats = Symbol( '_materials' )


/**
 * Holds a map of materials
 * ---
 * Contacts must be registered with the world for the properties to have an effect
 * when entities collide
 */
class Materials {
    constructor() {
        this[ _mats ] = new Map()

        this.add( '_default', new P2.Material() )
        this.addContact( '_defaultContact', new P2.ContactMaterial(
            this.get( '_default' ),
            this.get( '_default' ),
            {
                friction: .175,
                restitution: .45
            }
        ))
        this.add( 'metal', new P2.Material() )
        this.add( 'plasma', new P2.Material() )
    }

    get( id ) {
        if ( !this[ _mats ].has( id ) ) {
            throw new Error( 'Material ' + id + ' has not been created' )
        }

        return this[ _mats ].get( id )
    }

    addContact( id, contactMaterial ) {
        if ( !( contactMaterial instanceof P2.ContactMaterial ) ) {
            throw new Error( 'Material ' + id + ' must be a P2.ContactMaterial' )
        }

        this[ _mats ].set( id, contactMaterial )
    }

    add( id, material ) {
        if ( !( material instanceof P2.Material ) ) {
            throw new Error( 'Material ' + id + ' must be a P2.Material' )
        }

        this[ _mats ].set( id, material )
    }

}

export default new Materials()
