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

$answers = array();
for ($i = 0; $i < count($attributes['answers']); $i++) {
	$answers[$i]['index'] = $i;
	$answers[$i]['name'] = $attributes['answers'][$i];
	$answers[$i]['correct'] = $attributes['correctAnswer'] === $i;
}
$ourContext = array('answers' => $answers, 'solved' => false, 'showCongrats' => false, 'showSorry' => false, 'correctAnwer' => $attributes['correctAnswer']);

?>

<div style="background-color: <?php echo $attributes['bgColor']; ?>" class="posts-quiz-frontend" data-wp-interactive="create-block" <?php echo wp_interactivity_data_wp_context($ourContext); ?>>
	<p> <?php echo $attributes['question']; ?> </p>
	<ul>
		<?php
			foreach($attributes['answers'] as $answer) { ?>
				<li data-wp-context='{}' data-wp-on--click="actions.guessAttempt"><?php echo $answer; ?></li>
			<?php }
		?>
	</ul>
</div>