## Pull request checklist

Use the following list to make sure your PR fits the Teku doc quality standard.

### Before creating the pull request

Make sure that:

- [ ] you have read the [contribution guidelines](https://github.com/ConsenSys/doc.common/wiki/Contributing-to-Documentation).
- [ ] you have [tested your changes locally](https://github.com/ConsenSys/doc.common/wiki/MkDocs-And-Custom-Markdown-Guide#preview-documentation-site-locally) before submitting them to the community for review.

### After creating your pull request and tests finished

Make sure that:

- [ ] you have fixed all the issues raised by the tests, if any.
- [ ] you have verified the rendering of your changes on
  [ReadTheDocs.org PR preview](https://github.com/ConsenSys/doc.common/wiki/MkDocs-And-Custom-Markdown-Guide#preview-the-doc-site-for-your-pr-on-readthedocscom)
  and updated the testing link (see [Testing](#testing)).

## Describe the change

<!-- A clear and concise description of what this PR changes in the documentation. -->

## Issue fixed

<!-- Except for minor changes (typos, commas) it's required to have a Github issue linked to your
pull request.

Use the following to make Github close the issue automatically when merging the PR:
fixes #{your issue number}
If multiple issues are involved, use one line for each issue.

If you don't want to close the issue, use:
see #{your issue number} -->

## Impacted parts <!-- check as many boxes as needed -->

### For content changes

- [ ] Doc content
- [ ] Doc pages organisation

### For tools changes

- [ ] CircleCI workflow
- [ ] Build and QA tools (lint, vale,…)
- [ ] MkDocs templates
- [ ] MkDocs configuration
- [ ] Python dependencies
- [ ] Node dependencies and JavaScript
- [ ] ReadTheDocs configuration
- [ ] GitHub integration

## Testing

<!-- Steps to follow to review and test your changes.
Add links to preview the pages changes here.
Link format is https://pegasys-teku--{your PR number}.org.readthedocs.build/en/{your PR number}/
Where {your PR number} must be replaced by the number of this PR, for instance 123
-->

## Screenshots / recording

<!-- If it helps to understand your change, you may link an annotated screenshot or a small demo video. -->
