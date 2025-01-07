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

print_r($attributes);
?>

<div style="background-color: <?php echo $attributes['bgColor']; ?>" class="posts-quiz-frontend" data-wp-interactive="create-block" <?php echo wp_interactivity_data_wp_context($attributes); ?>>
	<p> <?php echo $attributes['question']; ?> </p>
	<ul>
		<template data-wp-each="context.answers">
			<li data-wp-on--click="actions.guessAttempt" data-wp-text="context.item.name"></li>
		</template>
	</ul>
</div>