<?php
/**
 * Plugin Licensing.
 *
 * @package wholesome-network-plugin-manager
 */

namespace Wholesome\NetworkPluginManager\Licensing; // @codingStandardsIgnoreLine

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Activate multisite network integration.
if ( ! defined( 'WP_FS__PRODUCT_8886_MULTISITE' ) ) {
	define( 'WP_FS__PRODUCT_8886_MULTISITE', true );
}

use const Wholesome\NetworkPluginManager\ROOT_DIR;

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	// Init License Class.
	License::get_instance();
}

/**
 * Is Active
 *
 * @return bool
 */
function is_active() {
	return ( License::get_instance() )->is_active();
}

/**
 * Get License Instance.
 *
 * @return Object
 */
function get_instance() {
	return ( License::get_instance() )->get_license();
}

/**
 * License Class.
 */
class License {

	/**
	 * Instance.
	 *
	 * @var object License Object.
	 */
	private static $instance = null;

	/**
	 * Licence.
	 *
	 * @var object Freemius Licence Object.
	 */
	private $license = null;

	/**
	 * Constructor.
	 */
	private function __construct() {

		// Include Freemius SDK.
		require_once ROOT_DIR . '/inc/vendor/freemius/start.php';

		$this->license = fs_dynamic_init(
			array(
				'id'               => '8886',
				'slug'             => 'wholesome-network-plugin-manager',
				'type'             => 'plugin',
				'public_key'       => 'pk_910466319ed2b50f026a278e0bd17',
				'is_premium'       => true,
				'is_premium_only'  => true,
				'has_addons'       => false,
				'has_paid_plans'   => true,
				'is_org_compliant' => false,
				'menu'             => array(
					'menu' => array(
						'slug'       => 'settings.php',
						'first-path' => 'settings.php?page=wholesome-network-plugin-manager-account',
						'contact'    => false,
						'support'    => false,
						'network'    => true,
					),
				),
			)
		);
	}

	/**
	 * Get instance.
	 *
	 * @return object License Object.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new License();
		}

		return self::$instance;
	}

	/**
	 * Is Active.
	 *
	 * @return bool
	 */
	public function is_active() {
		return $this->license->can_use_premium_code();
	}

	/**
	 * Get License.
	 *
	 * @return object
	 */
	public function get_license() {
		return $this->license;
	}
}

/**
 * Run.
 */
setup();
