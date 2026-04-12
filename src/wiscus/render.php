<?php
/**
 * Server-side rendering for the Wiscus block.
 *
 * Available variables:
 * $attributes (array)
 * $content (string)
 * $block (WP_Block)
 */

if ( ! function_exists( 'render_wiscus_block' ) ) {
	function render_wiscus_block() {
		if ( ! function_exists( 'wiscus_render_with_js' ) ) {
			return '';
		}

		return wiscus_render_with_js();
	}
}

// Encode once, escape on output
$wiscus_data = wp_json_encode( $attributes );
?>

<!--
<div <?php echo wp_kses_post( get_block_wrapper_attributes() ); ?>>
	<?php echo wp_kses_post( render_wiscus_block() ); ?>
</div>
-->

<section 
	data-config="<?php echo esc_attr( $wiscus_data ); ?>" 
	data-engine="zikojs" 
	class="wiscus-discussion">
</section>