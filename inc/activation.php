<?php
/**
 * Activation file.
 *
 * @package wholesome-network-plugin-manager
 */

namespace Wholesome\NetworkPluginManager\Activation; // @codingStandardsIgnoreLine

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Wholesome\NetworkPluginManager\Licensing;

use const Wholesome\NetworkPluginManager\PLUGIN_SLUG;
use const Wholesome\NetworkPluginManager\ROOT_DIR;
use const Wholesome\NetworkPluginManager\ROOT_FILE;

/**
 * Setup
 *
 * @return void
 */
function setup() : void {

	$fs_priority = 10;
	if ( defined( 'WP_FS__LOWEST_PRIORITY' ) ) {
		$fs_priority = WP_FS__LOWEST_PRIORITY + 1;
	}

	add_action( 'admin_notices', __NAMESPACE__ . '\\check_if_multisite', 10 );
	add_filter( 'fs_redirect_on_activation_' . PLUGIN_SLUG, __NAMESPACE__ . '\\limit_redirect', 10 );
	add_filter( 'plugin_action_links_' . basename( ROOT_DIR ) . '/' . basename( ROOT_FILE ), __NAMESPACE__ . '\\remove_activation_action', 100 );
	add_filter( 'network_admin_plugin_action_links_' . basename( ROOT_DIR ) . '/' . basename( ROOT_FILE ), __NAMESPACE__ . '\\alter_network_actions', 100 );
}

/**
 * Check that the plugin is running in network admin.
 */
function check_if_multisite() {
	$is_multisite = true;
	$plugin_path  = str_replace( plugin_dir_path( ROOT_DIR ), '', ROOT_FILE );

	if ( ! is_multisite() ) {
		$is_multisite = false;
		?>
		<div class="notice notice-error is-dismissible">
			<?php // Translators: Network Plugin Manager must be enabled on a multisite network. ?>
			<p><?php printf( esc_html__( '%1$sNetwork Plugin Manager%2$s must be enabled on a multisite network.', 'wholesome-network-plugin-manager' ), '<strong>', '</strong>' ); ?></p>
		</div>
		<?php
	}

	if ( is_plugin_active( $plugin_path ) && ! is_plugin_active_for_network( $plugin_path ) ) {
		$is_multisite              = false;
		$network_admin_plugins_url = network_admin_url( 'plugins.php' );
		?>
		<div class="notice notice-error is-dismissible">
			<?php // Translators: Network Plugin Manager must be enabled on the network plugins page. ?>
			<p><?php printf( esc_html__( '%1$sNetwork Plugin Manager%2$s must be activated on the %3$snetwork admin plugins page%4$s.', 'wholesome-network-plugin-manager' ), '<strong>', '</strong>', '<a href="' . esc_url( $network_admin_plugins_url ) . '">', '</a>' ); ?></p>
		</div>
		<?php
	}

	if ( ! $is_multisite ) {
		// @codingStandardsIgnoreStart.
		if ( isset( $_GET['activate'] ) ) { 
			unset( $_GET['activate'] );
		}
		// @codingStandardsIgnoreEnd.
		deactivate_plugins( ROOT_FILE );
	}
}

/**
 * Limit redirect.
 *
 * @return bool
 */
function limit_redirect() {
	return is_multisite() && is_network_admin();
}

/**
 * Remove Activation Action.
 *
 * @param array $actions Actions.
 * @return array
 */
function remove_activation_action( $actions ) {
	unset( $actions[ 'activate-license ' . PLUGIN_SLUG ] );
	unset( $actions[ 'opt-in-or-opt-out ' . PLUGIN_SLUG ] );
	return $actions;
}

/**
 * Alter Network Actions.
 *
 * @param array $actions Actions.
 * @return array
 */
function alter_network_actions( $actions ) {
	unset( $actions[ 'activate-license ' . PLUGIN_SLUG ] );
	$actions['settings'] = sprintf( '<a href="settings.php?page=%1$s-account">%2$s</a>', PLUGIN_SLUG, esc_html__( 'Settings', 'wholesome-network-plugin-manager' ) );
	return $actions;
}
