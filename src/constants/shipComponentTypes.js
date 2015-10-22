
import toMap from 'to-map'

// Immutable key-value map of
// Use a flat map, makes life a little easier
const SC_TYPES = toMap({
    HULL: 'sc:hull',
    THRUSTER: 'sc:thruster',
    TURRET: 'sc:turret'
})


export default SC_TYPES
