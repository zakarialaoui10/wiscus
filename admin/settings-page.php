function wiscus_settings_page() {
    ?>
    <form method="post" action="options.php">
        <?php
        settings_fields('wiscus_settings_group');
        do_settings_sections('wiscus');
        submit_button();
        ?>
    </form>
    <?php
}