<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<p <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Wiscus – hello from a dynamic block!', 'wiscus' ); ?>
	<div class="wiscus-discussion"></div>
</p>



<?php
// function render_wiscus_block() {
//     if (!function_exists('wiscus_render')) return '';
//     return wiscus_render();
// }

// echo render_wiscus_block();