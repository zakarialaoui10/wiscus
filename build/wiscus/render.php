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

<?php
if(!function_exists("render_wiscus_block")){
	function render_wiscus_block() {
		if (!function_exists('wiscus_render_with_js')) return '';
		return wiscus_render_with_js();
	}
}

// echo render_wiscus_block();
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php echo render_wiscus_block(); ?>
</div>

<div class="wiscus-discussion" data-props="<?php echo $data ?>" data-engine='zikojs'> </div>

<p> from render.php </p>