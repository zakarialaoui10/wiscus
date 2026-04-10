<?php
/**
 * Plugin Name: Wiscus
 * Plugin URI: https://github.com/zakarialaoui10/wiscus
 * GitHub Plugin URI: https://github.com/zakarialaoui10/wiscus
 * Description: Add Giscus (GitHub Discussions) comments to your WordPress site with Gutenberg block and shortcode support.
 * Version: 1.0.0
 * Author: zakarialaoui10
 * Author URI: https://github.com/zakarialaoui10
 * License: GPL2+
 */

if (!defined('ABSPATH')) exit;

include 'admin/admin-props.php';
include 'admin/admin.php';

$json = file_get_contents(plugin_dir_path(__FILE__) . 'data/themes.json');
$themes = json_decode($json, true);

// Register block
add_action('init', function () {
    register_block_type(__DIR__ . '/build/wiscus');
    // wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
});


// Admin menu
add_action('admin_menu', 'admin_menu_init');
add_action('admin_init', 'admin_init');
// add_action('admin_init',function() use ($themes) {
//     return admin_init($themes);
// });


function wiscus_render_with_js() {
    static $loaded = false;
    if ($loaded) return '';
    $loaded = true;

    $config = get_props_from_admin_panel(); 
    ob_start();
    ?>
    <div 
        class="wiscus-discussion"
        data-config='<?php echo json_encode($config); ?>'
        data-from="wiscus.php"
    >
    </div>
    <?php
    return ob_get_clean();
}

add_shortcode('wiscus', function () {
    wp_enqueue_script(
        'wiscus-view',
        plugin_dir_url(__FILE__) . 'build/wiscus/view.js',
        [],
        null,
        true
    );

    wp_script_add_data('wiscus-view', 'type', 'module');
    $config = get_props_from_admin_panel();
    $data = esc_attr(json_encode($config));
    return "<div class='wiscus-discussion' data-config='{$data}' data-engine='zikojs' data-from='wiscus-js'></div>";
});
