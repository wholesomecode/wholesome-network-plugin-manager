<?php
/**
 * Settings.
 *
 * Plugin settings page.
 *
 * @package wholesome-network-plugin-manager
 */

namespace Wholesome\NetworkPluginManager\Settings; // @codingStandardsIgnoreLine

use const Wholesome\NetworkPluginManager\PLUGIN_PREFIX;
use const Wholesome\NetworkPluginManager\PLUGIN_SLUG;

const SETTING_REPORT_BUG_SECTION      = PLUGIN_PREFIX . '__report_bug_section';
const SETTING_REPORT_BUG              = PLUGIN_PREFIX . '__report_bug';
const SETTING_REQUEST_FEATURE_SECTION = PLUGIN_PREFIX . '__request_feature_section';
const SETTING_REQUEST_FEATURE         = PLUGIN_PREFIX . '__request_feature';
const SETTING_MANAGE_ACCOUNT_SECTION  = PLUGIN_PREFIX . '__manage_account_section';
const SETTING_MANAGE_ACCOUNT          = PLUGIN_PREFIX . '__manage_account';
const SUPPORT_EMAIL                   = 'support@wholesomecode.ltd';

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	add_action( 'admin_init', __NAMESPACE__ . '\\register_setting_fields' );
	add_action( 'network_admin_menu', __NAMESPACE__ . '\\add_settings_page' );
}

/**
 * Register Settings Fields.
 *
 * @return void
 */
function register_setting_fields() : void {

	// Add Section.
	add_settings_section(
		SETTING_REPORT_BUG_SECTION,
		__( 'Report a Bug', 'wholesome-network-plugin-manager' ),
		function() {
			$subject = esc_html__( 'Network Plugin Manager - Bug Report', 'wholesome-network-plugin-manager' );
			$content = esc_html__( 'Please describe the bug in as much detail as possible, provide step by step instructions on how it can be replicated and where possible provide screenshots.', 'wholesome-network-plugin-manager' );
			?>
			<p>
				<?php esc_html_e( 'Help us to keep the plugin running smoothly by reporting bugs. Use the button below to generate an email template so that you can report a bug.', 'wholesome-network-plugin-manager' ); ?>
			</p>
			<p class="submit">
				<a href="mailto:<?php echo esc_html( SUPPORT_EMAIL ); ?>?subject=<?php echo esc_html( $subject ); ?>&body=<?php echo esc_html( $content ); ?>" class="button button-primary"><?php esc_html_e( 'Report Bug', 'wholesome-network-plugin-manager' ); ?></a></p>
			<?php
		},
		PLUGIN_SLUG
	);

	// Add Section.
	add_settings_section(
		SETTING_REQUEST_FEATURE_SECTION,
		__( 'Request a Feature', 'wholesome-network-plugin-manager' ),
		function() {
			$subject = esc_html__( 'Network Plugin Manager - Feature Request', 'wholesome-network-plugin-manager' );
			$content = esc_html__( 'Please describe your requested feature in as much detail as possible, provide step by step instructions on how you would like to to work, and if possible provide diagrams or annotated screenshots.', 'wholesome-network-plugin-manager' );
			?>
			<p>
				<?php esc_html_e( 'Help us improve the plugin by requesting a feature. Use the button below to generate an email template so that you can request a feature. All feature requests are considered.', 'wholesome-network-plugin-manager' ); ?>
			</p>
			<p class="submit"><a href="mailto:<?php echo esc_html( SUPPORT_EMAIL ); ?>?subject=<?php echo esc_html( $subject ); ?>&body=<?php echo esc_html( $content ); ?>" class="button button-primary"><?php esc_html_e( 'Request Feature', 'wholesome-network-plugin-manager' ); ?></a></p>
			<?php
		},
		PLUGIN_SLUG
	);

	// Add Section.
	add_settings_section(
		SETTING_MANAGE_ACCOUNT_SECTION,
		__( 'Manage your Account', 'wholesome-network-plugin-manager' ),
		function() {
			?>
			<p>
				<?php esc_html_e( 'Manage your account via the Freemius system.', 'wholesome-network-plugin-manager' ); ?>
			</p>
			<p class="submit"><a href="<?php echo esc_url( network_admin_url( 'settings.php?page=wholesome-network-plugin-manager-account' ) ); ?>" class="button button-primary"><?php esc_html_e( 'Manage Account', 'wholesome-network-plugin-manager' ); ?></a></p>
			<?php
		},
		PLUGIN_SLUG
	);
}

/**
 * Add Settings Page.
 *
 * Add a settings page to the settings menu item.
 *
 * @return void
 */
function add_settings_page() : void {
	add_submenu_page(
		'settings.php',
		__( 'Network Plugin Manager', 'wholesome-network-plugin-manager' ),
		__( 'Network Plugin Manager', 'wholesome-network-plugin-manager' ),
		'manage_options',
		PLUGIN_SLUG,
		__NAMESPACE__ . '\\render_html'
	);
}

/**
 * Render HTML.
 *
 * Renders the settings page html. In this instance the WP Settings API fields.
 *
 * @return void
 */
function render_html() : void {
	?>
	<div class="wrap">
		<h2>
			<?php esc_html_e( 'Network Plugin Manager', 'wholesome-network-plugin-manager' ); ?>
		</h2>

		<form action="options.php" method="POST">
			<?php settings_fields( PLUGIN_SLUG ); ?>
			<?php do_settings_sections( PLUGIN_SLUG ); ?>
		</form>
	</div>
	<?php
}
