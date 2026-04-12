<?php
function wiscus_get_props_from_admin_panel(){
    $opts = get_option('wiscus_settings');

    $mapping = $opts['mapping'] ?? 'pathname';
    $term = $opts['term'] ?? '';

    $config = [
        'repo' => $opts['repo'] ?? '',
        'repoid' => $opts['repoId'] ?? '',
        'category' => $opts['category'] ?? '',
        'categoryid' => $opts['categoryId'] ?? '',
        'mapping' => $mapping,
        'term' => $term,
        'theme' => $opts['theme'] ?? 'light',
    ];

    return $config;
}
?>