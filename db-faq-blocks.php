<?php
/**
 * Plugin Name: DB FAQ Blocks
 * Description: FAQ container and question blocks with selectable plain-text or details/summary output and FAQPage schema.
 * Version: 2.0.2
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Author: Daniel Bishop
 * Author URI: https://beachfleischman.com/
 * Text Domain: db-faq-blocks
 */

defined( 'ABSPATH' ) || exit;

function db_faq_blocks_register_blocks() {
	register_block_type( __DIR__ . '/blocks/faqs' );
	register_block_type( __DIR__ . '/blocks/question' );
}
add_action( 'init', 'db_faq_blocks_register_blocks' );
