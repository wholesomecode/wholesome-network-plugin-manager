<?php
/**
 * Plugin Licensing.
 *
 * @package wholesome-network-enabled-plugins
 */

namespace Wholesome\NetworkEnabledPlugins\Licensing; // @codingStandardsIgnoreLine

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use const Wholesome\NetworkEnabledPlugins\ROOT_DIR;

/**
 * Setup
 *
 * @return bool
 */
function is_active() {
	// Activate multisite network integration.
	if ( ! defined( 'WP_FS__PRODUCT_8886_MULTISITE' ) ) {
		define( 'WP_FS__PRODUCT_8886_MULTISITE', true );
	}

	// Include Freemius SDK.
	require_once ROOT_DIR . '/inc/vendor/freemius/start.php';

	return fs_dynamic_init(
		array(
			'id'               => '8886',
			'slug'             => 'wholesome-network-enabled-plugins',
			'type'             => 'plugin',
			'public_key'       => 'pk_910466319ed2b50f026a278e0bd17',
			'is_premium'       => true,
			'is_premium_only'  => true,
			'has_addons'       => false,
			'has_paid_plans'   => true,
			'is_org_compliant' => false,
			'menu'             => array(
				'first-path' => 'plugins.php',
				'contact'    => false,
				'support'    => false,
			),
		)
	)->can_use_premium_code();
}
