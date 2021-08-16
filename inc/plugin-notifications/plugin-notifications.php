<?php
/**
 * Plugin Notifications file.
 *
 * @package wholesome-network-enabled-plugins
 */

namespace Wholesome\NetworkEnabledPlugins\PluginNotifications; // @codingStandardsIgnoreLine

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	add_filter( 'network_admin_plugin_action_links', __NAMESPACE__ . '\\render_network_plugin_notifications', 10, 4 );

	// @todo
	// - Link active sites to sites URLs
	// - Dynamic deactivate link (JS, try no-js link too)
	// - JS to mark plugin as active if it has active sites
	// - Prevent plugin from being activated on single site
	// - Put it on codecanyon
	// - Ensure readme is correct and up-to-date
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
			$active_on_sites[] = array(
				'name' => get_bloginfo( 'name' ),
			);
		}
		restore_current_blog();
	}

	if ( empty( $active_on_sites ) ) {
		return $actions;
	}

	$active_on_sites_links = array();

	foreach ( $active_on_sites as $site ) {
		$active_on_sites_links[] = sprintf( '<a href="%s">%s</a> (<a href="">Deactivate</a>)', 'https://test.com', $site['name'] );
	}

	// Translators: Active on Sites.
	$active_message = '<span class="wholesome-network-active-plugins__label">' . __( 'Active on:', 'wholesome-network-enabled-plugins' ) . '</span> ' . implode( ' | ', $active_on_sites_links );

	// Translators: Active on sites list.
	$actions[ array_key_last( $actions ) ] = sprintf( '%s<span class="wholesome-network-active-plugins">%s</span>', $actions[ array_key_last( $actions ) ], $active_message );
	return $actions;
}

