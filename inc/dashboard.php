<?php
/**
 * Dashboard file.
 *
 * @package wholesome-network-enabled-plugins
 */

// @todo.
// - Rename plugin to something more sensible.
// - Refactor CSS.
// - Sort the settings page (remove title, and perhaps make a parent settings page).
// - Sanity check all files and make sure everything is in its right place.
// - Perhaps show a message once plugin activated on sub site.
// - Perhaps add a line (or border) from labels to toggle boxes to better indicate which is which.

namespace Wholesome\NetworkEnabledPlugins\Dashboard; // @codingStandardsIgnoreLine

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const REST_ENDPOINT = 'wholesome/network-enabled-plugins/v1';

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	add_filter( 'network_admin_plugin_action_links', __NAMESPACE__ . '\\render_network_plugin_notifications', 10, 4 );
	add_action( 'rest_api_init', __NAMESPACE__ . '\\register_rest_deactivate_plugin', 10 );
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

	$toggle_panel       = get_toggle_panel( $plugin_file );
	$link_inactive      = esc_html__( 'Site Activate', 'wholesome-network-enabled-plugins' );
	$link_active        = esc_html__( 'Site Deactivate', 'wholesome-network-enabled-plugins' );
	$has_checked_inputs = strpos( $toggle_panel, 'checked="checked"' ) || strpos( $toggle_panel, "checked='checked'" );

	if ( empty( $has_checked_inputs ) ) {
		$action_link = sprintf( '<button class="network-enabled-plugins" data-toggle-network-panel><span class="network-enabled-plugins__text">%s</span><span class="network-enabled-plugins__icon">▼</span>%s</button>', $link_inactive, $toggle_panel );
	} else {
		$action_link = sprintf( '<button class="network-enabled-plugins active" data-toggle-network-panel><span class="network-enabled-plugins__text">%s</span><span class="network-enabled-plugins__icon">▼</span>%s</button>', $link_active, $toggle_panel );
	}

	$activation_key = array_search( 'activate', array_keys( $actions ) );

	$actions = array_slice( $actions, 0, $activation_key + 1, true ) +
		array( 'activate-site' => $action_link ) +
		array_slice( $actions, 3, count( $actions ) - $activation_key + 1, true );

	return $actions;
}

/**
 * Get Toggle Panel.
 *
 * @param string $plugin_file Plugin File.
 * @return string
 */
function get_toggle_panel( $plugin_file ) {
	$sites = get_sites();

	uasort( 
		$sites,
		function( $a, $b ) {
			// Compare site blog names alphabetically for sorting purposes.
			return strcmp( $a->__get( 'blogname' ), $b->__get( 'blogname' ) );
		}
	);

	ob_start();
	?>
	<div class="network-enabled-plugins__toggle-panel" style="display:none;" aria-hidden="true">
		<?php
		foreach ( $sites as $site ) {
			switch_to_blog( $site->blog_id );
			$toggle_path = sprintf( '%s/action/site/%s/plugin/%s', get_rest_url() . REST_ENDPOINT, $site->blog_id, str_replace( '/', '__', $plugin_file ) );
			$toggle_path = add_query_arg( '_wpnonce', wp_create_nonce( 'wp_rest' ), $toggle_path );
			?>
			<p class="network-enabled-plugins__row">
				<input 
					<?php checked( is_plugin_active( $plugin_file ), true ); ?> 
					class="network-enabled-plugins__toggle"
					data-activate="<?php echo esc_url( str_replace( '/action/', '/activate/', $toggle_path ) ); ?>"
					data-deactivate="<?php echo esc_url( str_replace( '/action/', '/deactivate/', $toggle_path ) ); ?>"
					id="network-enabled-plugins__activation-toggle-<?php echo esc_attr( sanitize_title( $plugin_file ) ); ?>-<?php echo esc_attr( $site->blog_id ); ?>"
					type="checkbox"
					id="network-enabled-plugins__activation-toggle-<?php echo esc_attr( sanitize_title( $plugin_file ) ); ?>-<?php echo esc_attr( $site->blog_id ); ?>"
				/> 
				<label for="network-enabled-plugins__activation-toggle-<?php echo esc_attr( sanitize_title( $plugin_file ) ); ?>-<?php echo esc_attr( $site->blog_id ); ?>"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></label>
			</p>
			<?php
			restore_current_blog();
		}
		?>
	</div>
	<?php
	return ob_get_clean();
}

/**
 * Register REST deactivate plugin.
 */
function register_rest_deactivate_plugin() {
	register_rest_route(
		REST_ENDPOINT,
		'/(?P<action>([a-z])+)/site/(?P<id>([0-9])+)/plugin/(?P<plugin>([A-Za-z0-9\_\?\.\-])+)/',
		array(
			'callback'            => function ( $request ) {
				$action = isset( $request['action'] ) ? esc_attr( $request['action'] ) : null;
				$id     = isset( $request['id'] ) ? esc_attr( $request['id'] ) : null;
				$plugin = isset( $request['plugin'] ) ? esc_attr( $request['plugin'] ) : null;
				$plugin = '/' . str_replace( '__', '/', $plugin );

				if ( ! function_exists( 'activate_plugins' ) || ! function_exists( 'deactivate_plugins' ) ) {
					require_once ABSPATH . 'wp-admin/includes/plugin.php';
				}

				switch_to_blog( $id );
				if ( 'deactivate' === $action ) {
					deactivate_plugins( $plugin );
				} else {
					activate_plugins( $plugin );
				}
				restore_current_blog();
			},
			'methods'             => 'GET',
			'permission_callback' => function () {
				return current_user_can( 'deactivate_plugin' );
			},
		)
	);
}
