<?php
/**
 * Activation file.
 *
 * @package wholesome-network-enabled-plugins
 */

namespace Wholesome\NetworkEnabledPlugins\Activation; // @codingStandardsIgnoreLine

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Wholesome\NetworkEnabledPlugins\Licensing;

use const Wholesome\NetworkEnabledPlugins\ROOT_DIR;
use const Wholesome\NetworkEnabledPlugins\ROOT_FILE;

/**
 * Setup
 *
 * @return void
 */
function setup() : void {

	add_action( 'admin_notices', __NAMESPACE__ . '\\check_if_multisite', 10 );

	if ( ! Licensing\is_active() ) {
		return;
	}
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
			<?php // Translators: Network Enabled Plugins must be enabled on a multisite network. ?>
			<p><?php printf( esc_html__( '%1$sNetwork Enabled Plugins%2$s must be enabled on a multisite network.', 'wholesome-network-enabled-plugins' ), '<strong>', '</strong>' ); ?></p>
		</div>
		<?php
	}

	if ( is_plugin_active( $plugin_path ) && ! is_plugin_active_for_network( $plugin_path ) ) {
		$is_multisite              = false;
		$network_admin_plugins_url = network_admin_url( 'plugins.php' );
		?>
		<div class="notice notice-error is-dismissible">
			<?php // Translators: Network Enabled Plugins must be enabled on the network plugins page. ?>
			<p><?php printf( esc_html__( '%1$sNetwork Enabled Plugins%2$s must be activated on the %3$snetwork admin plugins page%4$s.', 'wholesome-network-enabled-plugins' ), '<strong>', '</strong>', '<a href="' . esc_url( $network_admin_plugins_url ) . '">', '</a>' ); ?></p>
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
