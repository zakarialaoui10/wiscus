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

include 'includes/utils.php';
include 'includes/admin.php';

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

// Settings page UI
function wiscus_settings_page() {
    ?>
    <div class="wrap">
        <h1>Wiscus Settings</h1>

        <form method="post" action="options.php">
            <?php
            settings_fields('wiscus_settings_group');
            do_settings_sections('wiscus');
            submit_button();
            ?>
        </form>
		<!-- <script>
document.addEventListener('DOMContentLoaded', function () {
    const theme = document.getElementById('wiscus-theme');
    const custom = document.getElementById('wiscus-custom-theme');

    function toggleCustom() {
        if (theme.value === 'custom') {
            custom.style.display = 'block';
        } else {
            custom.style.display = 'none';
        }
    }

    theme.addEventListener('change', toggleCustom);
    toggleCustom();
});
</script> -->
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function () {
        const mapping = document.getElementById('wiscus-mapping');
        const termWrapper = document.getElementById('wiscus-term-wrapper');

        function toggleTerm() {
            if (mapping.value === 'specific') {
                termWrapper.style.display = 'block';
            } else {
                termWrapper.style.display = 'none';
            }
        }

        mapping.addEventListener('change', toggleTerm);
        toggleTerm();
    });
    </script>
    <?php
}



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
