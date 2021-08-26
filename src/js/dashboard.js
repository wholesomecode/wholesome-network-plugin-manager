/**
 * Dashboard.
 */

/**
 * Add Network Active Class.
 * 
 * Add network active class to rows that have network active plugins.
 */
export function setNetworkActiveStatus() {
    const tableRows = document.querySelectorAll( 'table tr' );
    tableRows.forEach( ( row ) => {
        var text = row.querySelector( '.network-plugin-manager__text' );

        if ( row.classList.contains('active') && ! row.classList.contains('active--network') ) {
            return;
        }
        
        if ( row.querySelector( '.network-plugin-manager__toggle-panel input:checked' ) ) {
            row.classList.remove( 'inactive' );
            row.classList.add( 'active' );
            row.classList.add( 'active--network' );
            if ( text ) {
                row.querySelector( '.network-plugin-manager__text' ).innerHTML = WholesomeNetworkPluginManagerSettings.deactivateString;
            }
        } else {
            row.classList.remove( 'active' );
            row.classList.remove( 'active--network' );
            row.classList.add( 'inactive' );
            if ( text ) {
                row.querySelector( '.network-plugin-manager__text' ).innerHTML = WholesomeNetworkPluginManagerSettings.activateString;
            }
        }
    } );
};
