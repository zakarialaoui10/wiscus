<?php
/**
 * Plugin Name: Wiscus
 * Plugin URI: https://github.com/zakarialaoui10/wiscus
 * Description: Add Giscus (GitHub Discussions) comments to your WordPress site with Gutenberg block and shortcode support.
 * Version: 1.1.1
 * Author: zakarialaoui10
 * Author URI: https://github.com/zakarialaoui10
 * License: GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once plugin_dir_path( __FILE__ ) . 'admin/utils.php';
require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';

// Load themes safely
$themes = array();
$themes_file = plugin_dir_path( __FILE__ ) . 'data/themes.json';

if ( file_exists( $themes_file ) ) {
	$json   = file_get_contents( $themes_file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	$themes = json_decode( $json, true );
}

// Register block
add_action(
	'init',
	function () {
		register_block_type( __DIR__ . '/build/wiscus' );
	}
);

// Admin menu
add_action( 'admin_menu', 'wiscus_admin_menu_init' );
add_action( 'admin_init', 'wiscus_admin_init' );

/**
 * Render Wiscus container (JS-based).
 */
function wiscus_render_with_js() {
	static $loaded = false;

	if ( $loaded ) {
		return '';
	}
	$loaded = true;

	$config = wiscus_get_props_from_admin_panel();

	ob_start();
	?>
	<div 
		class="wiscus-discussion"
		data-config="<?php echo esc_attr( wp_json_encode( $config ) ); ?>"
		data-from="wiscus.php"
	></div>
	<?php
	return ob_get_clean();
}

/**
 * Shortcode handler.
 */
add_shortcode(
	'wiscus',
	function () {
		wp_enqueue_script(
			'wiscus-view',
			plugin_dir_url( __FILE__ ) . 'build/wiscus/view.js',
			array(),
			filemtime( plugin_dir_path( __FILE__ ) . 'build/wiscus/view.js' ),
			true
		);

		wp_script_add_data( 'wiscus-view', 'type', 'module' );

		$config = wiscus_get_props_from_admin_panel();
		$data   = wp_json_encode( $config );

		return '<div class="wiscus-discussion" data-config="' . esc_attr( $data ) . '" data-engine="zikojs" data-from="wiscus-js"></div>';
	}
);