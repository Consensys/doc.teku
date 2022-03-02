# Pull request checklist

Use the following template to make sure your PR fits the Teku documentation standard.

## Before creating the PR

Make sure that:

- [ ] You've read the [contribution guidelines](https://consensys.net/docs/doctools/).
- [ ] You've [previewed your changes locally](https://consensys.net/docs/doctools/en/latest/preview/old-system/#preview-locally).

## Describe the change

<!-- Add a clear and concise description of what this PR changes in the documentation. -->

## Issue fixed

<!-- Except for minor changes (e.g., typos or commas) it's required to have a GitHub issue linked to your PR.

Add "fixes #{your issue number}" to close the issue automatically when the PR is merged.
If multiple issues are involved, use one line for each issue.

If you don't want to close the issue, link to the issue with "see #{your issue number}". -->

## Impacted parts

<!-- Check the items from the following lists that your PR impacts. You can check multiple boxes. -->

For content changes:

- [ ] Documentation content
- [ ] Documentation page organization

For tool changes:

- [ ] CircleCI workflow
- [ ] Build and QA tools (e.g., lint or vale)
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
where {your PR number} must be replaced by the number of this PR.
-->
