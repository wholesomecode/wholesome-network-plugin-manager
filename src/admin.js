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

    wholesomeHelpers.deactivatePluginLinks();
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
 * Deactivate Plugin Buttons.
 * 
 * Click listeners for the deactivate links.
 */
wholesomeHelpers.deactivatePluginLinks = function() {
    const deactivateCheckboxes = document.querySelectorAll( '[data-deactivate]' );
    deactivateCheckboxes.forEach( ( checkbox ) => {
        checkbox.addEventListener( 'change', ( e ) => {
            e.preventDefault();
            if ( e.target.checked ) {
                wholesomeHelpers.toggleActivationPluginFetch( e.target.attributes[ 'data-activate' ].value );
            } else {
                wholesomeHelpers.toggleActivationPluginFetch( e.target.attributes[ 'data-deactivate' ].value );
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
        var text = row.querySelector( '.network-enabled-plugins__text' );

        if ( row.classList.contains('active') && ! row.classList.contains('active--network') ) {
            return;
        }
        
        if ( row.querySelector( '.network-enabled-plugins__toggle-panel input:checked' ) ) {
            row.classList.remove( 'inactive' );
            row.classList.add( 'active' );
            row.classList.add( 'active--network' );
            if ( text ) {
                row.querySelector( '.network-enabled-plugins__text' ).innerHTML = WholesomeNetworkEnabledPluginsSettings.deactivateString;
            }
        } else {
            row.classList.remove( 'active' );
            row.classList.remove( 'active--network' );
            row.classList.add( 'inactive' );
            if ( text ) {
                row.querySelector( '.network-enabled-plugins__text' ).innerHTML = WholesomeNetworkEnabledPluginsSettings.activateString;
            }
        }
    } );
};

wholesomeHelpers.detachPanel = function() {
    const panels = document.querySelectorAll( '.network-enabled-plugins__toggle-panel' );
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
            const panel = td.querySelector( '.network-enabled-plugins__toggle-panel' );
            if ( 'none' === panel.style.display ) {
                wholesomeHelpers.slideDown( panel );
            } else {
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