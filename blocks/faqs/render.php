<?php

/**
 * Server-side renderer for the FAQ container.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner blocks.
 * @var WP_Block $block      Current block instance.
 */

defined('ABSPATH') || exit;

$format = isset($attributes['outputFormat']) && 'details' === $attributes['outputFormat'] ? 'details' : 'plain';
$wrapper_attributes = get_block_wrapper_attributes(
	array('class' => 'db-faqs db-faqs--' . $format)
);

$entities = array();
$inner_blocks = (isset($block->parsed_block['innerBlocks']) && is_array($block->parsed_block['innerBlocks']))
	? $block->parsed_block['innerBlocks']
	: array();

foreach ($inner_blocks as $inner_block) {
	if ('db-faq-blocks/question' !== ($inner_block['blockName'] ?? '')) {
		continue;
	}
	$item_attributes = isset($inner_block['attrs']) && is_array($inner_block['attrs']) ? $inner_block['attrs'] : array();
	$question = trim(wp_strip_all_tags($item_attributes['question'] ?? ''));
	$answer   = trim(wp_strip_all_tags($item_attributes['answer'] ?? ''));
	if ('' === $question || '' === $answer) {
		continue;
	}
	$entities[] = array(
		'@type'          => 'Question',
		'name'           => $question,
		'acceptedAnswer' => array('@type' => 'Answer', 'text' => $answer),
	);
}
?>
<section
	<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	aria-label="<?php esc_attr_e('Frequently asked questions', 'db-faq-blocks'); ?>"
>
	<?php echo is_string($content) ? $content : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</section>
<?php if ($entities) : ?>
	<script type="application/ld+json">
		<?php echo wp_json_encode(array('@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $entities), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</script>
<?php endif; ?>
