import { __ } from '@wordpress/i18n';

import './admin.scss';

document.addEventListener( 'DOMContentLoaded', ( event ) => {
    
    async function deactivatePlugin( path ) {
        try {
            const response = await fetch( path );
            return response;
        } catch(e) {
            console.log(e)
        }
    }

    const deactivateButtons = document.querySelectorAll( '[data-deactivate]' );
    deactivateButtons.forEach( ( button ) => {
        // @todo make these event listeners, do the click and refresh the page.
        const apiPath = button.attributes['data-deactivate'].value;
        deactivatePlugin( apiPath ).then( response => response.json() ).then( json => console.log( json ) );
    } );

    const network_plugins_page = document.querySelector( 'body.plugins-php.network-admin' );

    if ( ! network_plugins_page ) {
        return;
    }

    const tableRows = document.querySelectorAll( 'table tr' );

    tableRows.forEach( ( row ) => {
        if ( row.querySelector( '.wholesome-network-active-plugins' ) ) {
            row.classList.remove( 'inactive' );
            row.classList.add( 'active' );
            row.classList.add( 'active--network' );
        }
    } );
} );