<?php
/**
 * Plugin Notifications file.
 *
 * @package wholesome-network-enabled-plugins
 */

namespace Wholesome\NetworkEnabledPlugins\PluginNotifications; // @codingStandardsIgnoreLine

const REST_ENDPOINT = 'wholesome/network-enabled-plugins/v1';

use const Wholesome\NetworkEnabledPlugins\ROOT_DIR;
use const Wholesome\NetworkEnabledPlugins\ROOT_FILE;

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	add_action( 'admin_notices', __NAMESPACE__ . '\\check_if_multisite', 10 );
	add_filter( 'network_admin_plugin_action_links', __NAMESPACE__ . '\\render_network_plugin_notifications', 10, 4 );
	add_action( 'rest_api_init', __NAMESPACE__ . '\\register_rest_deactivate_plugin', 10 );
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
 * Render Network Plugin Notifications
 *
 * @param array  $actions Actions.
 * @param string $plugin_file Plugin File.
 * @param array  $plugin_data Plugin Data.
 * @param string $context Context.
 *
 * @return array
 */
function render_network_plugin_notifications( $actions, $plugin_file, $plugin_data, $context ) {
	if ( is_plugin_active_for_network( $plugin_file ) ) {
		return $actions;
	}

	$sites           = get_sites();
	$active_on_sites = array();

	foreach ( $sites as $site ) {

		switch_to_blog( $site->blog_id );

		if ( is_plugin_active( $plugin_file ) ) {

			$plugin_path = $plugin_file;

			if ( strpos( $plugin_path, '/' ) ) {
				$plugin_path = str_replace( '\/', '%2F', $plugin_path );
				$plugin_path = str_replace( '/', '%2F', $plugin_path );
			}

			$admin_url        = get_admin_url( $site->blog_id, 'plugins.php' );
			$deactivation_url = add_query_arg(
				array(
					'action'        => 'deactivate',
					'paged'         => 1,
					'plugin'        => $plugin_path,
					'plugin_status' => 'all',
					's'             => '',
				),
				$admin_url
			);
			$deactivation_url = wp_nonce_url( $deactivation_url, sprintf( 'deactivate-plugin_%s', $plugin_path ) );

			$active_on_sites[] = array(
				'deactivation_url' => $deactivation_url,
				'id'               => $site->blog_id,
				'name'             => get_bloginfo( 'name' ),
				'plugin'           => str_replace( '/', '__', $plugin_file ),
				'plugins_url'      => $admin_url,
			);
		}
		restore_current_blog();
	}

	if ( empty( $active_on_sites ) ) {
		return $actions;
	}

	$active_on_sites_links = array();

	foreach ( $active_on_sites as $site ) {
		$rest_path               = sprintf( '%s/site/%s/plugin/%s', get_rest_url() . REST_ENDPOINT, $site['id'], $site['plugin'] );
		$rest_path               = add_query_arg( '_wpnonce', wp_create_nonce( 'wp_rest' ), $rest_path );
		$active_on_sites_links[] = sprintf( '<a href="%s">%s</a> (<a class="wholesome-network-active-plugins__deactivate" href="%s" data-deactivate="%s">%s</a>)', $site['plugins_url'], $site['name'], $site['deactivation_url'], $rest_path, esc_html__( 'Deactivate', 'wholesome-network-enabled-plugins' ) );
	}

	// Translators: Active on Sites.
	$active_message = sprintf( '<span class="wholesome-network-active-plugins__label">%s</span> ', esc_html__( 'Active on:', 'wholesome-network-enabled-plugins' ) ) . implode( ' | ', $active_on_sites_links );

	// Translators: Active on sites list.
	$actions[ array_key_last( $actions ) ] = sprintf( '%s<span class="wholesome-network-active-plugins">%s</span>', $actions[ array_key_last( $actions ) ], $active_message );
	return $actions;
}

/**
 * Register REST deactivate plugin.
 */
function register_rest_deactivate_plugin() {
	register_rest_route(
		REST_ENDPOINT,
		'/site/(?P<id>([0-9])+)/plugin/(?P<plugin>([A-Za-z0-9\_\?\.\-])+)/',
		array(
			'callback'            => function ( $request ) {
				$id     = isset( $request['id'] ) ? esc_attr( $request['id'] ) : null;
				$plugin = isset( $request['plugin'] ) ? esc_attr( $request['plugin'] ) : null;
				$plugin = '/' . str_replace( '__', '/', $plugin );

				if ( ! function_exists( 'deactivate_plugins' ) ) {
					require_once ABSPATH . 'wp-admin/includes/plugin.php';
				}

				switch_to_blog( $id );
				deactivate_plugins( $plugin );
				restore_current_blog();
			},
			'methods'             => 'GET',
			'permission_callback' => function () {
				return current_user_can( 'deactivate_plugin' );
			},
		)
	);
}
