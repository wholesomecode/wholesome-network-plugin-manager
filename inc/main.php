<?php
/**
 * Main plugin file.
 *
 * @package wholesome-network-enabled-plugins
 */

namespace Wholesome\NetworkEnabledPlugins; // @codingStandardsIgnoreLine

const OPTION_PLUGIN_VERSION = PLUGIN_PREFIX . '_version';

/**
 * Setup
 *
 * @return void
 */
function setup() : void {

	// Register activation hook.
	register_activation_hook( ROOT_FILE, __NAMESPACE__ . '\\activate' );

	// After plugin upgrade.
	plugin_updated();

	// Load text domain.
	load_plugin_textdomain( 'wholesome-network-enabled-plugins', false, ROOT_DIR . '\languages' );

	// Enqueue Assets.
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\enqueue_admin_assets', 10 );

	/**
	 * Load plugin features.
	 *
	 * Load the namespace of each of the plugin features.
	 */
	require_once ROOT_DIR . '/inc/plugin-notifications/plugin-notifications.php';

	// Run features.
	PluginNotifications\setup();
}

/**
 * Activate hook.
 *
 * - Flush rewrite rules.
 *
 * @return void
 */
function activate() : void {
	flush_rewrite_rules();
}

/**
 * Plugin Updated.
 *
 * - Flush rewrite rules.
 *
 * @return void
 */
function plugin_updated() : void {
	$plugin_version = get_option( OPTION_PLUGIN_VERSION );
	if ( PLUGIN_VERSION !== $plugin_version ) {
		flush_rewrite_rules();
		update_option( OPTION_PLUGIN_VERSION, PLUGIN_VERSION, true );
	}
}

/**
 * Enqueue Admin Assets
 *
 * @throws \Error Warn if asset dependencies do not exist.
 *
 * @return void
 */
function enqueue_admin_assets() : void {

	$screen = get_current_screen();
	if ( 'plugins-network' !== $screen->base ) {
		return;
	}

	$admin_asset_path = ROOT_DIR . '/build/admin.asset.php';

	if ( ! file_exists( $admin_asset_path ) ) {
		throw new \Error(
			esc_html__( 'You need to run `npm start` or `npm run build` in the root of the plugin "wholesome-network-enabled-plugins" first.', 'wholesome-network-enabled-plugins' )
		);
	}

	$admin_scripts = '/build/admin.js';
	$admin_styles  = '/build/admin.css';
	$script_asset  = include $admin_asset_path;

	/**
	 * Settings.
	 *
	 * Settings have a filter so other parts of the plugin can append settings.
	 */
	$block_settings = apply_filters( PLUGIN_PREFIX . '_admin_settings', get_block_settings() );

	wp_enqueue_script(
		PLUGIN_SLUG . '-admin-scripts',
		plugins_url( $admin_scripts, ROOT_FILE ),
		$script_asset['dependencies'],
		$script_asset['version'],
		false
	);

	wp_enqueue_style(
		PLUGIN_SLUG . '-admin-styles',
		plugins_url( $admin_styles, ROOT_FILE ),
		array(),
		filemtime( ROOT_DIR . $admin_styles )
	);

	wp_localize_script(
		PLUGIN_SLUG . '-admin-scripts',
		'WholesomeNetworkEnabledPluginsSettings',
		$block_settings
	);

	wp_set_script_translations(
		PLUGIN_SLUG . '-admin-scripts',
		'wholesome-network-enabled-plugins',
		ROOT_DIR . '\languages'
	);
}

/**
 * Get Block Settings.
 *
 * Returns an array of settings which can be passed into the
 * application.
 *
 * Populate this with settings unique to your application.
 *
 * @return array
 */
function get_block_settings() : array {
	return array(
		'ajaxUrl' => esc_url( admin_url( 'admin-ajax.php', 'relative' ) ),
	);
}
