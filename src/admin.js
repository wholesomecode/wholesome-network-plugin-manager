import { __ } from '@wordpress/i18n';

import './admin.scss';

const wholesomeHelpers = {};

/**
 * Run.
 */
document.addEventListener( 'DOMContentLoaded', () => {
    const network_plugins_page = document.querySelector( 'body.plugins-php.network-admin' );

    if ( ! network_plugins_page ) {
        return;
    }

    wholesomeHelpers.toggleActivationLinks();
    wholesomeHelpers.setNetworkActiveStatus();
    wholesomeHelpers.detachPanel();
    wholesomeHelpers.handlePanelToggleClick();
} );

/**
 * Deactivate Plugin Fetch.
 * 
 * Fetch command to deactivate the plugin.
 * 
 * @param {string} path API Path.
 * @returns {object}
 */
wholesomeHelpers.toggleActivationPluginFetch = async function( path ) {
    try {
        const response = await fetch( path );
        return response;
    } catch( e ) {
        // Error.
        return e;
    }
};

/**
 * Toggle Activation Plugin Buttons.
 * 
 * Click listeners for the deactivate and activate links.
 */
wholesomeHelpers.toggleActivationLinks = function() {
    const deactivateCheckboxes = document.querySelectorAll( '[data-toggle-activation-link]' );
    deactivateCheckboxes.forEach( ( checkbox ) => {
        checkbox.addEventListener( 'change', ( e ) => {
            e.preventDefault();
            const pathRoot = WholesomeNetworkPluginManagerSettings.restUrl;
            const path = 'site/' + e.target.attributes[ 'data-site' ].value + '/plugin/' + e.target.attributes[ 'data-plugin' ].value + '/?_wpnonce=' + WholesomeNetworkPluginManagerSettings.restNonce;
            let result = '';
            if ( e.target.checked ) {
                wholesomeHelpers.toggleActivationPluginFetch( pathRoot + '/activate/' + path )
                    .then( response => response.json() )
                    .then( response => wholesomeHelpers.createAdminNotice( response ) );
            } else {
                wholesomeHelpers.toggleActivationPluginFetch( pathRoot + '/deactivate/' + path )
                .then( response => response.json() )
                .then( response => wholesomeHelpers.createAdminNotice( response ) );
            }
            
            wholesomeHelpers.setNetworkActiveStatus();

            return false;
        } );
    } );
};

/**
 * Add Network Active Class.
 * 
 * Add network active class to rows that have network active plugins.
 */
wholesomeHelpers.setNetworkActiveStatus = function() {
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

wholesomeHelpers.detachPanel = function() {
    const panels = document.querySelectorAll( '.network-plugin-manager__toggle-panel' );
    panels.forEach( ( panel ) => {
        const td = panel.closest( 'td' );
        td.insertBefore( panel, td.querySelector('.toggle-row') );
    } );
}

wholesomeHelpers.handlePanelToggleClick = function() {
    const buttons = document.querySelectorAll( 'button[data-toggle-network-panel]' );
    buttons.forEach( ( button ) => {
        button.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            const td = e.target.closest( 'td' );
            const panel = td.querySelector( '.network-plugin-manager__toggle-panel' );
            const icon = td.querySelector( '.network-plugin-manager__icon' );
            if ( 'none' === panel.style.display ) {
                button.setAttribute( 'aria-expanded', 'true' );
                panel.setAttribute( 'aria-hidden', 'false' );
                wholesomeHelpers.slideDown( panel );
                icon.innerHTML = '▲';
            } else {
                button.setAttribute( 'aria-expanded', 'false' );
                panel.setAttribute( 'aria-hidden', 'true' );
                icon.innerHTML = '▼';
                wholesomeHelpers.slideUp( panel );
            }
            return false;
        } );
    } );
}

/**
 * Slide down with JQuery and JS.
 * @param {object} element Element.
 */
wholesomeHelpers.slideDown = function( element ) {
    if ( 'block' === element.style.display ) {
        return;
    }

    element.style.height = 0;
    element.classList.add( 'slide-down' );
    element.style.display = 'block';
    element.style.height = `${element.scrollHeight}px`;
    setTimeout( function() {
        element.classList.remove( 'slide-down' );
        element.style.height = '';
    }, 250 );
};

/**
 * Slide up with JQuery and JS.
 * @param {object} element Element.
 */
wholesomeHelpers.slideUp = function( element ) {
    if ( 'none' === element.style.display ) {
        return;
    }

    element.style.height = `${element.scrollHeight}px`;
    element.classList.add( 'slide-up' );
    setTimeout( function() {
        element.style.height = 0;
    }, 10 );
    setTimeout( function() {
        element.style.display = 'none';
        element.classList.remove( 'slide-up' );
        element.style.height = '';
    }, 250 );
};

/**
 * Create Admin Notice.
 */
wholesomeHelpers.createAdminNotice = function( message ) {
    document.querySelectorAll( '.updated.notice.is-dismissible' ).forEach( element => element.remove() );
    const div = document.createElement( 'div' );
    div.setAttribute( 'aria-live', 'polite' );
    div.classList.add( 'updated', 'notice', 'is-dismissible', 'network-plugin-manager__notice' );

    const p = document.createElement( 'p' );
    p.innerHTML = message;

    div.append( p );

    const button = document.createElement( 'button' );
    button.setAttribute( 'type', 'button' );
    button.classList.add( 'notice-dismiss' );

    const span = document.createElement( 'span' );
    span.classList.add( 'screen-reader-text' );
    span.innerHTML = WholesomeNetworkPluginManagerSettings.dismissNoticeString;
    button.append( span );
    div.append( button );

    var area = document.querySelector( '.wrap > h2' );
    area.parentNode.insertBefore( div, area );

    button.addEventListener( 'click', function () {
        div.remove();
    });
};
