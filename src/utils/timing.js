
/**
 * Returns a dirty promise to appease await
 */
export async function wait( ms ) {
    return {
        then: cb => setTimeout( cb, ms )
    }
}
