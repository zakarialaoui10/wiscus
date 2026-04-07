<?php
/**
 * Plugin Name: Wiscus
 * Description: Add Giscus (GitHub Discussions) comments to your WordPress site with Gutenberg block and shortcode support.
 * Version: 0.1.0
 * Author: Zakaria Elalaoui
 * License: GPL2+
 */

if (!defined('ABSPATH')) exit;

// Register block
add_action('init', function () {
    register_block_type(__DIR__ . '/build/wiscus');
    // wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
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

    register_setting('wiscus_settings_group', 'wiscus_settings', function ($input) {
        return [
            'repo' => sanitize_text_field($input['repo'] ?? ''),
            'repoId' => sanitize_text_field($input['repoId'] ?? ''),
            'category' => sanitize_text_field($input['category'] ?? ''),
            'categoryId' => sanitize_text_field($input['categoryId'] ?? ''),
            'mapping' => sanitize_text_field($input['mapping'] ?? ''),
            'theme' => sanitize_text_field($input['theme'] ?? ''),
            'term' => sanitize_text_field($input['term'] ?? '')
        ];
    });

    add_settings_section('wiscus_main', 'Main Settings', null, 'wiscus');

    $fields = [
        'repo' => 'Repository (user/repo)',
        'repoId' => 'Repo ID',
        'category' => 'Category',
        'categoryId' => 'Category ID',
        'mapping' => 'Mapping',
        'theme' => 'Theme'
    ];

    foreach ($fields as $key => $label) {
        add_settings_field($key, $label, function () use ($key) {
            $opts = get_option('wiscus_settings');
            $value = $opts[$key] ?? '';

            // Mapping dropdown
            if ($key === 'mapping') {
                $options = ['pathname', 'url', 'title', 'og:title', 'specific'];

                echo "<select name='wiscus_settings[mapping]' id='wiscus-mapping'>";
                foreach ($options as $opt) {
                    $selected = selected($value, $opt, false);
                    echo "<option value='$opt' $selected>$opt</option>";
                }
                echo "</select>";

                echo "<p class='description'>Use 'specific' for custom mapping (e.g. post ID)</p>";

                // Extra field for term
                $term = $opts['term'] ?? '';
                $style = ($value === 'specific') ? '' : 'style="display:none;"';

                echo "<div id='wiscus-term-wrapper' $style>";
                echo "<input type='text' name='wiscus_settings[term]' placeholder='Enter unique ID' value='" . esc_attr($term) . "' />";
                echo "</div>";

                return;
            }

            // Theme dropdown (optional upgrade)
            if ($key === 'theme') {

				$themes = [
					'light' => 'GitHub Light',
					'light_high_contrast' => 'GitHub Light High Contrast',
					'light_protanopia' => 'GitHub Light Protanopia & Deuteranopia',
					'light_tritanopia' => 'GitHub Light Tritanopia',

					'dark' => 'GitHub Dark',
					'dark_high_contrast' => 'GitHub Dark High Contrast',
					'dark_protanopia' => 'GitHub Dark Protanopia & Deuteranopia',
					'dark_tritanopia' => 'GitHub Dark Tritanopia',
					'dark_dimmed' => 'GitHub Dark Dimmed',

					'preferred_color_scheme' => 'Preferred color scheme',

					'transparent_dark' => 'Transparent Dark',

					'noborder_light' => 'NoBorder Light',
					'noborder_dark' => 'NoBorder Dark',
					'noborder_gray' => 'NoBorder Gray',

					'cobalt' => 'RStudio Cobalt',
					'purple_dark' => 'Purple Dark',

					'gruvbox' => 'Gruvbox',
					'gruvbox_dark' => 'Gruvbox Dark',
					'gruvbox_light' => 'Gruvbox Light',

					'catppuccin_latte' => 'Catppuccin Latte',
					'catppuccin_frappe' => 'Catppuccin Frappé',
					'catppuccin_macchiato' => 'Catppuccin Macchiato',
					'catppuccin_mocha' => 'Catppuccin Mocha',

					'fro' => 'Fro',

					// 'custom' => 'Custom (experimental)'
				];

				echo "<select name='wiscus_settings[theme]' class='regular-text'>";

				foreach ($themes as $val => $label) {
					$selected = selected($value, $val, false);
					echo "<option value='$val' $selected>$label</option>";
				}

				echo "</select>";
				

				echo "<p class='description'>Choose a Giscus theme</p>";

				// // 👇 ADD THIS PART (custom input)
				// $customTheme = $opts['customTheme'] ?? '';
				// $style = ($value === 'custom') ? '' : 'style=\"display:none;\"';

				// echo "<div id='wiscus-custom-theme' $style>";
				// echo "<input type='text' name='wiscus_settings[customTheme]' placeholder='Enter custom theme URL' value='" . esc_attr($customTheme) . "' />";
				echo "</div>";

				return;
			}

            // Default input
            echo "<input type='text' name='wiscus_settings[$key]' value='" . esc_attr($value) . "' />";
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

// Shared render function
function wiscus_render() {
    static $loaded = false;
    if ($loaded) return '';
    $loaded = true;

    $opts = get_option('wiscus_settings');

    $mapping = $opts['mapping'] ?? 'pathname';
    $term = $opts['term'] ?? '';

    ob_start();
    ?>
    <div id="wiscus-comments"></div>
    <script src="https://giscus.app/client.js"
        data-repo="<?php echo esc_attr($opts['repo'] ?? ''); ?>"
        data-repo-id="<?php echo esc_attr($opts['repoId'] ?? ''); ?>"
        data-category="<?php echo esc_attr($opts['category'] ?? ''); ?>"
        data-category-id="<?php echo esc_attr($opts['categoryId'] ?? ''); ?>"
        data-mapping="<?php echo esc_attr($mapping); ?>"
        <?php if ($mapping === 'specific' && !empty($term)) : ?>
            data-term="<?php echo esc_attr($term); ?>"
        <?php endif; ?>
        data-theme="<?php echo esc_attr($opts['theme'] ?? 'light'); ?>"
        crossorigin="anonymous"
        async>
    </script>
    <?php
    return ob_get_clean();
}

// New Appraoch

function wiscus_render_with_js() {
    static $loaded = false;
    if ($loaded) return '';
    $loaded = true;

    $opts = get_option('wiscus_settings');

    $mapping = $opts['mapping'] ?? 'pathname';
    $term = $opts['term'] ?? '';

    $config = [
        'repo' => $opts['repo'] ?? '',
        'repoId' => $opts['repoId'] ?? '',
        'category' => $opts['category'] ?? '',
        'categoryId' => $opts['categoryId'] ?? '',
        'mapping' => $mapping,
        'term' => $term,
        'theme' => $opts['theme'] ?? 'light',
    ];

    ob_start();
    ?>
    <div 
        class="wiscus-discussion"
        data-config='<?php echo json_encode($config); ?>'>
    </div>
    <?php
    return ob_get_clean();
}

add_shortcode('wiscus-js', function () {
    return wiscus_render_with_js();
});
