<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// Delete option for single site
delete_option( 'wiscus_settings' );

// Multisite support
if ( is_multisite() ) {
	global $wpdb;

	$cache_key = 'wiscus_blog_ids';
	$cache_group = 'wiscus';

	$blog_ids = wp_cache_get( $cache_key, $cache_group );

	if ( false === $blog_ids ) {
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$blog_ids = $wpdb->get_col( "SELECT blog_id FROM {$wpdb->blogs}" );

		wp_cache_set( $cache_key, $blog_ids, $cache_group );
	}

	if ( ! empty( $blog_ids ) && is_array( $blog_ids ) ) {
		foreach ( $blog_ids as $blog_id ) {
			switch_to_blog( (int) $blog_id );

			delete_option( 'wiscus_settings' );

			restore_current_blog();
		}
	}
}