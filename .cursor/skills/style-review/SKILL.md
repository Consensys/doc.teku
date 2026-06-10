---
name: style-review
description: >-
  Review Teku documentation for editorial compliance (voice, terminology, formatting,
  content type, and workflow checks). Use before submitting a PR or when auditing pages.
---

# Style review

## Inputs

The user should provide a file path or directory to review.

## Step 1: Identify context

From the file path, determine:

1. **Content type** from folder (`concepts/`, `how-to/`, `get-started/`, `reference/`, `tutorials/`).
2. **Applicable product rules** from `.cursor/rules/product-teku.mdc`.

## Step 2: Run lint tooling if available

Try project lint checks for markdown/style where practical.
If unavailable, continue with manual review and note the limitation.

## Step 3: Review against rules

Use these files as source of truth:

- `.cursor/rules/product-teku.mdc`
- `.cursor/rules/editorial-voice.mdc`
- `.cursor/rules/terminology.mdc`
- `.cursor/rules/markdown-formatting.mdc`
- `.cursor/rules/content-types.mdc`
- `.cursor/rules/contributor-workflow.mdc`

## Step 4: Report findings

For each issue, provide:

1. Approximate location.
2. Category (Product-specific, Voice, Terminology, Formatting, Content type, Frontmatter, Workflow).
3. Issue description.
4. Suggested fix.

If no issues are found, say so explicitly.
