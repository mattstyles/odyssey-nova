/**
 * Based on [this gist](https://gist.github.com/sebmarkbage/fac0830dbb13ccbff596)
 * by [Sebastian Markbåge](https://github.com/sebmarkbage)
 */

import noop from 'utils/noop'

export default function mixin( ...components ) {
    // Add methods here to avoid throwing errors
    var base = class {
        // update() {}
        render() {}
    }

    components.forEach( component => {
        base = component( base )
    })

    return base
}
