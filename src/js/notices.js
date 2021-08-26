/**
 * Notices.
 */

/**
 * Create Admin Notice.
 * 
 * @param {string} message Message.
 */
export function createAdminNotice( message ) {
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
