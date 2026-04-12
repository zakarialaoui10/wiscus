<?php

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// Delete option for single site
delete_option( 'wiscus_settings' );

// Multisite support
if ( is_multisite() ) {
	global $wpdb;

	$wiscus_cache_key = 'wiscus_blog_ids';
	$wiscus_cache_group = 'wiscus';

	$wiscus_blog_ids = wp_cache_get( $wiscus_cache_key, $wiscus_cache_group );

	if ( false === $wiscus_blog_ids ) {
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
		$wiscus_blog_ids = $wpdb->get_col( "SELECT blog_id FROM {$wpdb->blogs}" );

		wp_cache_set( $wiscus_cache_key, $wiscus_blog_ids, $wiscus_cache_group );
	}

	if ( ! empty( $wiscus_blog_ids ) && is_array( $wiscus_blog_ids ) ) {
		foreach ( $wiscus_blog_ids as $blog_id ) {
			switch_to_blog( (int) $blog_id );

			delete_option( 'wiscus_settings' );

			restore_current_blog();
		}
	}
}