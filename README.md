# DB FAQ Blocks 2.0.0

## What changed

The FAQ container now has a **FAQ output** setting in the block inspector:

- **Plain Text (H3 + P):** each question renders in an `h3`; its answer renders in a `p`.
- **Details/Summary:** each item renders as `details`, with the question in `summary` and the answer in a `div` immediately afterward.

The container passes the selected format to child blocks with the WordPress Block Context API. FAQPage JSON-LD is emitted once by the container.

## Install

1. In WordPress, open **Plugins > Add Plugin > Upload Plugin**.
2. Upload `db-faq-blocks.zip` and activate it.
3. Insert the **FAQs** block, add **FAQ Question** children, and choose the output in the container block's sidebar.

## Compatibility note

This package uses the namespace `db-faq-blocks`. If the prior plugin used different block names, existing saved blocks will need a migration or the names in both `block.json` files must be changed to match the original namespace before activation.
