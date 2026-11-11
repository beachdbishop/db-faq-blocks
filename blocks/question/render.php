<?php

/**
 * Server-side renderer for an FAQ Question block.
 *
 * WordPress provides these variables when loading this file through
 * the block.json "render" property.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Saved block content.
 * @var WP_Block $block      Current block instance.
 */

defined('ABSPATH') || exit;

$question = isset($attributes['question'])
	? wp_kses_post($attributes['question'])
	: '';

$answer = isset($attributes['answer'])
	? wp_kses_post($attributes['answer'])
	: '';

/*
 * Convert the sanitized HTML to plain text for validation.
 *
 * This prevents markup-only values, such as <br>, from being treated
 * as completed Question or Answer fields.
 */
$question_text = trim(
	html_entity_decode(
		wp_strip_all_tags($question),
		ENT_QUOTES | ENT_HTML5,
		get_bloginfo('charset')
	)
);

$answer_text = trim(
	html_entity_decode(
		wp_strip_all_tags($answer),
		ENT_QUOTES | ENT_HTML5,
		get_bloginfo('charset')
	)
);

/*
 * Do not render incomplete FAQ items.
 *
 * Editor-side validation blocks publication, but this check also protects
 * the front end when content is modified through the REST API, Code Editor,
 * database, or another process that bypasses editor validation.
 */
if ('' === $question_text || '' === $answer_text) {
	return;
}

/*
 * The parent FAQs block provides this value through Block Context.
 * Default to the plain format if the context is absent or invalid.
 */
$format = (
	isset($block->context['db-faq-blocks/outputFormat']) &&
	'details' === $block->context['db-faq-blocks/outputFormat']
)
	? 'details'
	: 'plain';

if ('details' === $format) :
?>
	<details
		<?php
		echo get_block_wrapper_attributes(
			array(
				'class' => 'db-faq-item db-faq-item--details',
			)
		); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		?>>
		<summary class="db-faq-item__question">
			<?php
			echo $question; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			?>
		</summary>

		<div class="db-faq-item__answer details-inner">
			<?php
			echo $answer; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			?>
		</div>
	</details>
<?php
else :
?>
	<div
		<?php
		echo get_block_wrapper_attributes(
			array(
				'class' => 'db-faq-item db-faq-item--plain',
			)
		); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		?>>
		<h3 class="db-faq-item__question">
			<?php
			echo $question; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			?>
		</h3>

		<p class="db-faq-item__answer">
			<?php
			echo $answer; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			?>
		</p>
	</div>
<?php
endif;
