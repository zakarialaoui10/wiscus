<?php
/**
 * Plugin Name: Wiscus
 */

if (!defined('ABSPATH')) exit;

// Register block
add_action('init', function () {
    register_block_type(__DIR__ . '/build/wiscus');
});

// Shortcode
add_shortcode('wiscus', function () {
    return wiscus_render();
});

// Admin menu
add_action('admin_menu', function () {
    add_options_page(
        'Wiscus Settings',
        'Wiscus',
        'manage_options',
        'wiscus',
        'wiscus_settings_page'
    );
});

// Register settings
add_action('admin_init', function () {
    register_setting('wiscus_settings_group', 'wiscus_settings');

    add_settings_section('wiscus_main', 'Main Settings', null, 'wiscus');

    $fields = [
        'repo' => 'Repository (user/repo)',
        'repoId' => 'Repo ID',
        'categoryId' => 'Category ID',
        'mapping' => 'Mapping (pathname, title...)',
        'theme' => 'Theme'
    ];

    foreach ($fields as $key => $label) {
        add_settings_field($key, $label, function () use ($key) {
            $opts = get_option('wiscus_settings');
            echo "<input type='text' name='wiscus_settings[$key]' value='" . esc_attr($opts[$key] ?? '') . "' />";
        }, 'wiscus', 'wiscus_main');
    }
});

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
    </div>
    <?php
}

// Shared render function
function wiscus_render() {
    static $loaded = false;
    if ($loaded) return '';
    $loaded = true;

    $opts = get_option('wiscus_settings');

    ob_start();
    ?>
    <div id="wiscus-comments"></div>
    <script src="https://giscus.app/client.js"
        data-repo="<?php echo esc_attr($opts['repo'] ?? ''); ?>"
        data-repo-id="<?php echo esc_attr($opts['repoId'] ?? ''); ?>"
        data-category-id="<?php echo esc_attr($opts['categoryId'] ?? ''); ?>"
        data-mapping="<?php echo esc_attr($opts['mapping'] ?? 'pathname'); ?>"
        data-theme="<?php echo esc_attr($opts['theme'] ?? 'light'); ?>"
        crossorigin="anonymous"
        async>
    </script>
    <?php
    return ob_get_clean();
}