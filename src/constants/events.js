
import toMap from 'to-map'

// Immutable key-value map of
const EVENTS = toMap({
    UPDATE: 'app:update',

    CHANGE_STATE: 'app:changeState',

    /**
     * Engine level dispatches
     */
    ENTITY_ADD: 'engine:entity:add',
    ENTITY_REMOVE: 'engine:entity:remove'
})


export default EVENTS
