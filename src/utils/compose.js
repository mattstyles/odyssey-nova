/**
 * Based on [this gist](https://gist.github.com/sebmarkbage/fac0830dbb13ccbff596)
 * by [Sebastian Markbåge](https://github.com/sebmarkbage)
 */

import noop from 'utils/noop'

/**
 * @see modules/README.md for the use of the compose function
 * In essence, the first argument can be a function that simply returns a class
 * (this allows that class to extend whatever it likes),
 * although all other argument must return a function that extends the its
 * argument to return a new class that inherits from the argument.
 * This function then composes those modules together by chaining one class
 * into the last, hence, order is important and the first class can inherit
 * nothing or whatever it likes whereas subsequent classes must inherit the
 * previous class in the list.
 */
export default function compose( ...modules ) {
    // Add methods here to avoid throwing errors
    var base = class {
        update() {}
        render() {}
    }

    modules.forEach( mod => {
        base = mod( base )
    })

    return base
}
