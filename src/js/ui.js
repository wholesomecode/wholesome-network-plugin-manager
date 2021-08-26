/**
 * UI.
 */

/**
 * Slide down with JQuery and JS.
 * @param {object} element Element.
 */
export function slideDown( element ) {
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
export function slideUp( element ) {
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
