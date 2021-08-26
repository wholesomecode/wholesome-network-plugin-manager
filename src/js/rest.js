/**
 * REST.
 */

/**
 * Fetch Endpoint.
 * 
 * Fetch command to activate and deactivate the plugin.
 * 
 * @param {string} path API Path.
 * @returns {object}
 */
export async function fetchEndpoint( path ) {
    try {
        const response = await fetch( path );
        return response;
    } catch( e ) {
        // Error.
        return e;
    }
};
