/**
 * Admin.
 * 
 * The main file that runs in wp-admin.
 */

// Import SCSS.
import './admin.scss';

// Import modules.
import { setNetworkActiveStatus } from './js/dashboard';
import { detachPanel, handlePanelToggleClick } from './js/panel';
import { toggleActivationLinks } from './js/buttons';

/**
 * Run.
 */
document.addEventListener( 'DOMContentLoaded', () => {
    const networkPluginsPage = document.querySelector( 'body.plugins-php.network-admin' );

    if ( ! networkPluginsPage ) {
        return;
    }

    detachPanel();
    handlePanelToggleClick();
    setNetworkActiveStatus();
    toggleActivationLinks();
} );
