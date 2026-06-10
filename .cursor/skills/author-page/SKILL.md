---
name: author-page
description: >-
  Scaffold or draft new Teku documentation to editorial standards. Use when creating a
  new page, writing a first draft, or helping a contributor structure content correctly.
---

# Author a new documentation page

Help create a new Teku documentation page that follows repository standards from the start.

## Inputs

Ask for missing context:

1. **Content type** - concept, how-to, get-started, reference, or tutorial.
2. **Topic** - what the page should cover.
3. **File path** - where the page should live in `docs/`.
4. **Source material** - issue, PR, spec, code, or reference proving factual claims.

## Step 1: Load conventions

Use these rule files:

- `.cursor/rules/content-types.mdc`
- `.cursor/rules/product-teku.mdc`
- `.cursor/rules/editorial-voice.mdc`
- `.cursor/rules/markdown-formatting.mdc`
- `.cursor/rules/terminology.mdc`

Check nearby pages in the same folder and match local structure.

## Step 2: Scaffold correctly

Create frontmatter and headings based on content type:

- Always include `description`.
- Add `keywords` when useful.
- Use `sidebar_label` only when needed.
- Avoid duplicate H1 when frontmatter includes `title`.

## Step 3: Draft content

Apply repository writing rules:

- Active voice, present tense, second person.
- One sentence per line.
- No em dash or en dash.
- Language tags on code fences.
- No invented behavior or defaults.

If a technical detail cannot be verified, flag it for human review.

## Step 4: Final checks

Before finishing, verify:

- Folder and structure match the intended content type.
- Terminology follows `terminology.mdc`.
- Links and code blocks follow formatting rules.
- If files moved, note redirect updates needed in `docusaurus.config.js` and `vercel.json`.
