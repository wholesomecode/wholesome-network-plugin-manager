/**
 * Buttons.
 */

// Import modules.
// Import modules.
import { setNetworkActiveStatus } from './dashboard';
import { createAdminNotice } from './notices';
import { fetchEndpoint } from './rest';

/**
 * Toggle Activation Plugin Buttons.
 * 
 * Click listeners for the deactivate and activate links.
 */
export function toggleActivationLinks() {
    const deactivateCheckboxes = document.querySelectorAll( '[data-toggle-activation-link]' );
    deactivateCheckboxes.forEach( ( checkbox ) => {
        checkbox.addEventListener( 'change', ( e ) => {
            e.preventDefault();
            const pathRoot = WholesomeNetworkPluginManagerSettings.restUrl;
            const path = 'site/' + e.target.attributes[ 'data-site' ].value + '/plugin/' + e.target.attributes[ 'data-plugin' ].value + '/?_wpnonce=' + WholesomeNetworkPluginManagerSettings.restNonce;
            if ( e.target.checked ) {
                fetchEndpoint( pathRoot + '/activate/' + path )
                    .then( response => response.json() )
                    .then( response => createAdminNotice( response ) );
            } else {
                fetchEndpoint( pathRoot + '/deactivate/' + path )
                .then( response => response.json() )
                .then( response => createAdminNotice( response ) );
            }
            
            setNetworkActiveStatus();

            return false;
        } );
    } );
};
