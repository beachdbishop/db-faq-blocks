---
name: faq-markdown-to-wp-blocks
description: convert faq content written in markdown, plain text, or heading-and-paragraph pairs into wordpress block editor markup for the db-faq-blocks plugin. use when a user asks to transform faqs into db-faq-blocks/faqs container markup with db-faq-blocks/question children, choose plain or details output, clean markdown separators, or validate existing faq block markup.
---

# FAQ Markdown to WordPress Blocks

Convert FAQ source content into paste-ready WordPress Code Editor markup for the `db-faq-blocks` plugin.

## Workflow

1. Identify question-and-answer pairs.
   - Treat each Markdown heading as a question.
   - Treat the content after that heading and before the next heading as its answer.
   - Accept `###` by default, but also accept other heading levels when the structure is clear.
   - Ignore separator-only HTML such as `<br>`, `<br/>`, and `<br />` between entries.
   - Preserve the wording and factual content unless the user explicitly requests editing.
2. Validate every pair.
   - Require nonempty question and answer text.
   - Do not silently emit an incomplete Question block.
   - If an item is incomplete, identify it concisely and ask only for the missing text. Convert all complete pairs when useful.
3. Choose the container format.
   - Use `plain` when the user asks for Plain Text, H3/P, expanded output, or gives no preference.
   - Use `details` when the user asks for Details/Summary, accordion, collapsible, or disclosure output.
4. Encode block attributes as valid JSON.
   - Escape double quotes, reverse solidus characters, and control characters correctly.
   - Preserve allowed inline HTML in attribute strings when present, including `<strong>`, `<em>`, and `<a>`.
   - Do not convert dollar signs, ampersands, apostrophes, or ordinary punctuation unnecessarily.
5. Emit only the block markup in one fenced `html` code block unless the user requests explanation.
6. After the code block, add one short sentence: paste it into the WordPress Code editor, not a Custom HTML block. Omit this sentence if the user asks for markup only.

## Exact output structure

Always use this structure:

```html
<!-- wp:db-faq-blocks/faqs {"outputFormat":"plain"} -->
<!-- wp:db-faq-blocks/question {"question":"Question text","answer":"Answer text"} /-->

<!-- wp:db-faq-blocks/question {"question":"Second question","answer":"Second answer"} /-->
<!-- /wp:db-faq-blocks/faqs -->
```

For collapsible output, change only the container attribute:

```html
<!-- wp:db-faq-blocks/faqs {"outputFormat":"details"} -->
```

Keep each Question block self-closing because its dynamic `render.php` generates front-end markup. Do not place saved `<h3>`, `<p>`, `<details>`, `<summary>`, or `<div>` markup inside the Question block comment.

## Conversion rules

- Strip Markdown heading markers from questions.
- Join multiline answer paragraphs with a single space only when they are part of the same paragraph.
- Preserve separate paragraphs as HTML paragraph markup inside the answer attribute only if the source clearly contains multiple answer paragraphs.
- Do not include separator `<br>` elements in the output.
- Do not add FAQPage JSON-LD. The container's PHP renderer generates it.
- Do not add HTML wrappers outside the FAQ container block.
- Do not invent answers or update facts. If the source includes dates, limits, tax amounts, or legal claims, preserve them exactly unless the user separately asks for verification.

## Example

Input:

```markdown
### What are the new QSEHRA limits for 2026?
For 2026, QSEHRA limits are $6,450 for self-only coverage and $13,100 for family coverage.
<br>
### How much can employees contribute to Health FSAs in 2026?
The Health FSA contribution limit for 2026 is $3,400.
```

Output:

```html
<!-- wp:db-faq-blocks/faqs {"outputFormat":"plain"} -->
<!-- wp:db-faq-blocks/question {"question":"What are the new QSEHRA limits for 2026?","answer":"For 2026, QSEHRA limits are $6,450 for self-only coverage and $13,100 for family coverage."} /-->

<!-- wp:db-faq-blocks/question {"question":"How much can employees contribute to Health FSAs in 2026?","answer":"The Health FSA contribution limit for 2026 is $3,400."} /-->
<!-- /wp:db-faq-blocks/faqs -->
```
