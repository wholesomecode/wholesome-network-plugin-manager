/**
 * Panel.
 */

// Import modules.
import { slideDown, slideUp } from './ui';

/**
 * Detach Panel.
 * 
 * Detaches the Panel from the Button on load.
 */
export function detachPanel() {
    const panels = document.querySelectorAll( '.network-plugin-manager__toggle-panel' );
    panels.forEach( ( panel ) => {
        const td = panel.closest( 'td' );
        td.insertBefore( panel, td.querySelector('.toggle-row') );
    } );
}

/**
 * Handle Panel Toggle Click.
 * 
 * Expand and collapse the toggle panel.
 */
export function handlePanelToggleClick() {
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
                slideDown( panel );
                icon.innerHTML = '▲';
            } else {
                button.setAttribute( 'aria-expanded', 'false' );
                panel.setAttribute( 'aria-hidden', 'true' );
                icon.innerHTML = '▼';
                slideUp( panel );
            }
            return false;
        } );
    } );
}
