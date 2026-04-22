<?php
if (!defined('ABSPATH')) exit;

function wiscus_admin_menu_init() {
    add_options_page(
        'Wiscus Settings',
        'Wiscus',
        'manage_options',
        'wiscus',
        'wiscus_settings_page'
    );
}

function wiscus_admin_enqueue_scripts($hook) {
    if ($hook !== 'settings_page_wiscus') return;

    wp_enqueue_script(
        'wiscus-admin',
        plugin_dir_url(__FILE__) . 'admin.js',
        [],
        '1.0.0',
        ['in_footer' => true]
    );
}
add_action('admin_enqueue_scripts', 'wiscus_admin_enqueue_scripts');

function wiscus_admin_init() {

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
                    echo '<option value="' . esc_attr($opt) . '" ' . selected($selected, true, false) . '>' . esc_html($opt) . '</option>';
                }
                echo "</select>";

                echo "<p class='description'>Use 'specific' for custom mapping (e.g. post ID)</p>";

                // Extra field for term
                $term = $opts['term'] ?? '';
                $style = ($value === 'specific') ? '' : 'style="display:none;"';

                echo '<div id="wiscus-term-wrapper" ' . esc_attr($style) . '>';
                echo "<input type='text' name='wiscus_settings[term]' placeholder='Enter unique ID' value='" . esc_attr($term) . "' />";
                echo "</div>";

                return;
            }
            $json = file_get_contents(plugin_dir_path(__FILE__) . '../data/themes.json');
            $themes = json_decode($json, true);
            // Theme dropdown (optional upgrade)
            if ($key === 'theme') {
				echo "<select name='wiscus_settings[theme]' class='regular-text'>";

				foreach ($themes as $val => $label) {
					$selected = selected($value, $val, false);
					echo '<option value="' . esc_attr($val) . '" ' . selected($selected, true, false) . '>' . esc_html($label) . '</option>';
				}

				echo "</select>";
				

				echo "<p class='description'>Choose a Giscus theme</p>";
				echo "</div>";

				return;
			}

            // Default input
            echo '<input type="text" name="wiscus_settings[' . esc_attr($key) . ']" value="' . esc_attr($value) . '" />';
        }, 'wiscus', 'wiscus_main');
    }
}

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

?>