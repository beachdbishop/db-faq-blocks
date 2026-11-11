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

## Optional Agent/Skill

The **faq-markdown-to-wp-blocks** folder contains skill that has been prepared to help quickly convert _FAQ markup_ --> the _WP block markup_ needed for this plugin.

For example, using Copilot or similar, you can ask it to convert the following markup:

```md
### Who can participate in a PTO contribution arrangement?

Eligibility depends on your retirement plan’s rules. Many employers allow full‑time employees who accrue PTO and are eligible for the plan to participate, but specifics vary. Always check the plan document and employee handbook.

### Is the converted PTO treated as taxable income?

If the feature is designed and documented to meet IRS requirements, converted amounts can be treated as pretax employee deferrals or employer contributions. If the rules aren’t met, the value may be taxed as regular wages.

### Do the conversions count toward annual contribution limits and testing?

Yes. Converted amounts are subject to the same annual limits (such as 401(k) deferral limits and overall contribution caps) and must satisfy applicable nondiscrimination tests.

### When must employees make their election to convert PTO?

Generally, employees need to elect conversion before PTO becomes available for use or cash‑out to receive pretax treatment. Your plan document should spell out the timing rules.

### How do state wage and hour laws affect PTO conversions?

Some states limit the forfeiture or conversion of accrued PTO. Employers should review state law and coordinate with counsel when designing or rolling out the feature.
```

And it will generate this snippet that you can paste into the Block Editor to quickly replace groups of quesions and answers:

```html
<!-- wp:db-faq-blocks/faqs {"outputFormat":"plain"} -->
<!-- wp:db-faq-blocks/question {"question":"Who can participate in a PTO contribution arrangement?","answer":"Eligibility depends on your retirement plan’s rules. Many employers allow full‑time employees who accrue PTO and are eligible for the plan to participate, but specifics vary. Always check the plan document and employee handbook."} /-->

<!-- wp:db-faq-blocks/question {"question":"Is the converted PTO treated as taxable income?","answer":"If the feature is designed and documented to meet IRS requirements, converted amounts can be treated as pretax employee deferrals or employer contributions. If the rules aren’t met, the value may be taxed as regular wages."} /-->

<!-- wp:db-faq-blocks/question {"question":"Do the conversions count toward annual contribution limits and testing?","answer":"Yes. Converted amounts are subject to the same annual limits (such as 401(k) deferral limits and overall contribution caps) and must satisfy applicable nondiscrimination tests."} /-->

<!-- wp:db-faq-blocks/question {"question":"When must employees make their election to convert PTO?","answer":"Generally, employees need to elect conversion before PTO becomes available for use or cash‑out to receive pretax treatment. Your plan document should spell out the timing rules."} /-->

<!-- wp:db-faq-blocks/question {"question":"How do state wage and hour laws affect PTO conversions?","answer":"Some states limit the forfeiture or conversion of accrued PTO. Employers should review state law and coordinate with counsel when designing or rolling out the feature."} /-->
<!-- /wp:db-faq-blocks/faqs -->
```

## Compatibility note

This package uses the namespace `db-faq-blocks`. If the prior plugin used different block names, existing saved blocks will need a migration or the names in both `block.json` files must be changed to match the original namespace before activation.
