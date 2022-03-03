# Pull request checklist

Use the following template to make sure your PR fits the Teku documentation standard.

## Before creating the PR

Make sure that:

- [ ] You've read the [contribution guidelines](https://consensys.net/docs/doctools/).
- [ ] You've [previewed your changes locally](https://consensys.net/docs/doctools/en/latest/preview/old-system/#preview-locally).

## Describe the change

<!-- Add a clear and concise description of what your PR changes in the documentation. -->

## Issue fixed

<!-- Link to the GitHub issue that your PR addresses.

Add "fixes #{your issue number}" to close the issue automatically when the PR is merged.

If your PR doesn't completely fix the issue, add "see #{your issue number}" to link to the issue
without automatically closing it. -->

## Impacted parts

<!-- Check the item from the following lists that your PR impacts. You can check multiple boxes. -->

For content changes:

- [ ] Documentation content
- [ ] Documentation page organization

For tool changes:

- [ ] CircleCI workflow
- [ ] Build and QA tools (for example lint or vale)
- [ ] MkDocs templates
- [ ] MkDocs configuration
- [ ] Python dependencies
- [ ] Node dependencies and JavaScript
- [ ] Read the Docs configuration
- [ ] GitHub integration

## After creating your PR and tests have finished

Make sure that:

- [ ] You've [fixed any issues](https://consensys.net/docs/doctools/en/latest/contribute/fix-cicd-errors/) raised by the tests.
- [ ] You've [previewed your changes on Read the Docs](https://consensys.net/docs/doctools/en/latest/preview/old-system/#preview-on-read-the-docs)
  and added a [preview link](#preview).

## Preview

<!-- Add the link to preview your changes on Read the Docs.

The link format is "https://pegasys-teku--{your PR number}.org.readthedocs.build/en/{your PR number}/",
where {your PR number} is replaced by the number of this PR.
-->
