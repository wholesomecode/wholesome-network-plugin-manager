<?php
/**
 * Network Enabled Plugins
 *
 * Plugin Name:       Network Enabled Plugins
 * Plugin URI:        https://wholesomecode.ltd/plugins/network-enabled-plugins
 * Description:       Network disabled a plugin only to find it still active on one or more sub-sites? Use this plugin to identify where it is still enabled and quickly deactivate it.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Wholesome Code <hello@wholesomecode.ltd>
 * Author URI:        https://wholesomecode.ltd
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wholesome-network-enabled-plugins
 * Domain Path:       /languages
 *
 * @package           wholesome-network-enabled-plugins
 */

namespace Wholesome\NetworkEnabledPlugins; // @codingStandardsIgnoreLine

const PLUGIN_PREFIX  = 'wholesome_network_enabled_plugins';
const PLUGIN_SLUG    = 'wholesome-network-enabled-plugins';
const PLUGIN_VERSION = '1.0.0';
const ROOT_DIR       = __DIR__;
const ROOT_FILE      = __FILE__;

require_once ROOT_DIR . '/inc/licensing/licensing.php';
require_once ROOT_DIR . '/inc/main.php';

if ( ! Licensing\is_active() ) {
	return;
}

/**
 * Load Plugin
 */
add_action( 'plugins_loaded', __NAMESPACE__ . '\\setup' );
