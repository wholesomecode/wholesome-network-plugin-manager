<?php
/**
 * Dashboard file.
 *
 * @package wholesome-network-plugin-manager
 */

// @todo.
// - Sanity check all files and make sure everything is in its right place.
// - Sort the settings page (remove title, and perhaps make a parent settings page).

namespace Wholesome\NetworkPluginManager\Dashboard; // @codingStandardsIgnoreLine

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const REST_ENDPOINT = 'wholesome/network-plugin-manager/v1';

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	add_filter( 'network_admin_plugin_action_links', __NAMESPACE__ . '\\render_network_plugin_toggle_button', 10, 4 );
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
function render_network_plugin_toggle_button( $actions, $plugin_file, $plugin_data, $context ) {
	if ( is_plugin_active_for_network( $plugin_file ) ) {
		return $actions;
	}

	$toggle_panel       = get_toggle_panel( $plugin_file );
	$link_inactive      = esc_html__( 'Site Activate', 'wholesome-network-plugin-manager' );
	$link_active        = esc_html__( 'Site Deactivate', 'wholesome-network-plugin-manager' );
	$has_checked_inputs = strpos( $toggle_panel, 'checked="checked"' ) || strpos( $toggle_panel, "checked='checked'" );

	if ( empty( $has_checked_inputs ) ) {
		$action_link = sprintf( '<button class="network-plugin-manager" data-toggle-network-panel aria-owns="%s"><span class="network-plugin-manager__text">%s</span><span class="network-plugin-manager__icon">▼</span>%s</button>', 'network-plugin-manager__panel-toggle-' . esc_attr( sanitize_title( $plugin_file ) ), $link_inactive, $toggle_panel );
	} else {
		$action_link = sprintf( '<button class="network-plugin-manager active" data-toggle-network-panel aria-owns="%s"><span class="network-plugin-manager__text">%s</span><span class="network-plugin-manager__icon">▼</span>%s</button>', 'network-plugin-manager__panel-toggle-' . esc_attr( sanitize_title( $plugin_file ) ), $link_active, $toggle_panel );
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
	<ul id="network-plugin-manager__panel-toggle-<?php echo esc_attr( sanitize_title( $plugin_file ) ); ?>" class="network-plugin-manager__toggle-panel" style="display:none;" aria-hidden="true">
		<?php
		foreach ( $sites as $site ) {
			switch_to_blog( $site->blog_id );
			?>
			<li class="network-plugin-manager__row">
				<input 
					<?php checked( is_plugin_active( $plugin_file ), true ); ?> 
					class="network-plugin-manager__toggle toggle"
					data-toggle-activation-link
					data-plugin="<?php echo esc_attr( str_replace( '/', '__', $plugin_file ) ); ?>"
					data-site="<?php echo esc_attr( $site->blog_id ); ?>"
					id="network-plugin-manager__activation-toggle-<?php echo esc_attr( sanitize_title( $plugin_file ) ); ?>-<?php echo esc_attr( $site->blog_id ); ?>"
					type="checkbox"
					id="network-plugin-manager__activation-toggle-<?php echo esc_attr( sanitize_title( $plugin_file ) ); ?>-<?php echo esc_attr( $site->blog_id ); ?>"
				/> 
				<label for="network-plugin-manager__activation-toggle-<?php echo esc_attr( sanitize_title( $plugin_file ) ); ?>-<?php echo esc_attr( $site->blog_id ); ?>"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></label>
			</li>
			<?php
			restore_current_blog();
		}
		?>
	</ul>
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

				if ( ! function_exists( 'get_plugins' ) ) {
					require_once ABSPATH . 'wp-admin/includes/plugin.php';
				}

				$action    = isset( $request['action'] ) ? esc_attr( $request['action'] ) : null;
				$blog_name = '';
				$id        = isset( $request['id'] ) ? esc_attr( $request['id'] ) : null;
				$message   = '';
				$plugin    = isset( $request['plugin'] ) ? esc_attr( $request['plugin'] ) : null;
				$plugin    = '/' . str_replace( '__', '/', $plugin );
				$plugins   = get_plugins();
				$plugin_name = $plugins[ ltrim( $plugin, '/' ) ]['Name'];

				if ( ! function_exists( 'activate_plugins' ) || ! function_exists( 'deactivate_plugins' ) ) {
					require_once ABSPATH . 'wp-admin/includes/plugin.php';
				}

				switch_to_blog( $id );
				$blog_name = get_bloginfo( 'name' );
				if ( 'deactivate' === $action ) {
					deactivate_plugins( $plugin );
					$message = sprintf( "'%s' deactivated on '%s'.", $plugin_name, $blog_name );
				} else {
					activate_plugins( $plugin );
					$message = sprintf( "'%s' activated on '%s'.", $plugin_name, $blog_name );
				}
				restore_current_blog();

				return $message;
			},
			'methods'             => 'GET',
			'permission_callback' => function () {
				return current_user_can( 'deactivate_plugin' );
			},
		)
	);
}
