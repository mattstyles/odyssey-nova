import { Dispatcher } from 'flux'

/**
 * Main dispatcher class
 * ---
 * @class
 */
class AppDispatcher extends Dispatcher {
    constructor() {
        super()
    }
}

// Export singleton
export default new AppDispatcher()
