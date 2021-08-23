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
    wholesomeHelpers.addNetworkActiveClass();
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
        if ( row.querySelector( '.network-enabled-plugins.active' ) ) {
            row.classList.remove( 'inactive' );
            row.classList.add( 'active' );
            row.classList.add( 'active--network' );
        }

        if ( row.querySelector( '.network-enabled-plugins:not(.active)' ) ) {
            row.classList.remove( 'active' );
            row.classList.remove( 'active--network' );
            row.classList.add( 'inactive' );
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
            const td = e.target.closest( 'td' );
            e.preventDefault();
            wholesomeHelpers.slideDown( td.querySelector( '.network-enabled-plugins__toggle-panel' ) );
            return false;
        } );
    } );
}

/**
 * Slide down with JQuery and JS.
 * @param {object} element Element.
 */
wholesomeHelpers.slideDown =  function( element ) {
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
    }, 500 );
};

/**
 * Slide up with JQuery and JS.
 * @param {object} element Element.
 */
wholesomeHelpers.slideUp =  function( element ) {
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
    }, 500 );
};