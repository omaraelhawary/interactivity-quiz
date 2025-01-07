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

// Generates a unique id for aria-controls.
$unique_id = wp_unique_id( 'p-' );
?>

<div data-wp-interactive="create-block" data-wp-context='{"clickCount": 0}'>
	<p> Clicked <span data-wp-text="context.clickCount"></span> times </p>
	<button data-wp-on--click="actions.btnHandler"> Click Me </button>
</div>