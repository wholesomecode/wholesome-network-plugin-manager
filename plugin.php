<?php
/**
 * Network Plugin Manager
 *
 * Plugin Name:       Network Plugin Manager
 * Plugin URI:        https://wholesomecode.ltd/plugins/network-plugin-manager
 * Description:       Have you ever network disabled a plugin only to find it still active on one or more sub-sites? Use Network Plugin Manager to easily identify which sites your plugin is active on and quickly deactivate it.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.1
 * Author:            Wholesome Code <hello@wholesomecode.ltd>
 * Author URI:        https://wholesomecode.ltd
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wholesome-network-plugin-manager
 * Domain Path:       /languages
 *
 * @package           wholesome-network-plugin-manager
 */

namespace Wholesome\NetworkPluginManager; // @codingStandardsIgnoreLine

const PLUGIN_PREFIX  = 'wholesome_network_plugin_manager';
const PLUGIN_SLUG    = 'wholesome-network-plugin-manager';
const PLUGIN_VERSION = '1.0.0';
const ROOT_DIR       = __DIR__;
const ROOT_FILE      = __FILE__;

require_once ROOT_DIR . '/inc/licensing.php';
require_once ROOT_DIR . '/inc/main.php';

/**
 * Load Plugin.
 */
add_action( 'plugins_loaded', __NAMESPACE__ . '\\setup' );
