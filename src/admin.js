import { __ } from '@wordpress/i18n';

import './admin.scss';

const wholesomeHelpers = {};

/**
 * Deactivate Plugin Fetch.
 * 
 * Fetch command to deactivate the plugin.
 * 
 * @param {string} path API Path.
 * @returns {object}
 */
wholesomeHelpers.deactivatePluginFetch = async function( path ) {
    try {
        const response = await fetch( path );
        return response;
    } catch( e ) {
        // Error.
        return e;
    }
};

/**
 * Deactivate Plugin Buttons.
 * 
 * Click listeners for the deactivate links.
 */
wholesomeHelpers.deactivatePluginLinks = function() {
    const deactivateLinks = document.querySelectorAll( '[data-deactivate]' );
    deactivateLinks.forEach( ( link ) => {
        link.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            const apiPath = link.attributes['data-deactivate'].value;
            wholesomeHelpers.deactivatePluginFetch( apiPath )
                .then( () => {
                    location.reload();
                    return;
                } );
            return false;
        } );
    } );
};

/**
 * Add Network Active Class.
 * 
 * Add network active class to rows that have network active plugins.
 */
wholesomeHelpers.addNetworkActiveClass = function() {
    const tableRows = document.querySelectorAll( 'table tr' );
    tableRows.forEach( ( row ) => {
        if ( row.querySelector( '.wholesome-network-active-plugins' ) ) {
            row.classList.remove( 'inactive' );
            row.classList.add( 'active' );
            row.classList.add( 'active--network' );
        }
    } );
};

/**
 * Run.
 */
document.addEventListener( 'DOMContentLoaded', () => {
    const network_plugins_page = document.querySelector( 'body.plugins-php.network-admin' );

    if ( ! network_plugins_page ) {
        return;
    }

    wholesomeHelpers.deactivatePluginLinks();
    wholesomeHelpers.addNetworkActiveClass();
} );