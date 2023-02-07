const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const isDev = process.env.NODE_ENV === "development";
const baseUrl = isDev ? "/" : "/";

/**
 * @type {import('redocusaurus').PresetEntry}
 */
const redocusaurus = [
  "redocusaurus",
  {
    specs: [
      {
        id: "using-remote-url",
        // Remote File
        spec: "https://raw.githubusercontent.com/ConsenSys/teku/gh-pages/latest.json",
        route: "/api/",
      },
    ],
    theme: {
      /**
       * Highlight color for docs
       */
      primaryColor: "#ed774f",
      primaryColorDark: "#ed774f",
      /**
       * Options to pass to redoc
       * @see https://github.com/redocly/redoc#redoc-options-object
       */
      options: { disableSearch: true },
      /**
       * Options to pass to override RedocThemeObject
       * @see https://github.com/Redocly/redoc#redoc-theme-object
       */
      theme: {},
    },
  },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ConsenSys Teku",
  tagline:
    "An open-source Ethereum consensus client written in Java that contains a full beacon node and a validator client for participating in proof of stake consensus",
  url: "https://docs.teku.consensys.net",
  baseUrl,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.svg",
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "ConsenSys", // Usually your GitHub org/user name.
  projectName: "doc.teku", // Usually your repo name.
  deploymentBranch: "gh-pages", // Github Pages deploying branch

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Set a base path separate from default /docs
          editUrl: "https://github.com/ConsenSys/doc.teku/tree/master/",
          path: "docs",
          routeBasePath: "/",
          // @ts-ignore
          // eslint-disable-next-line global-require
          remarkPlugins: [require("remark-docusaurus-tabs")],
          include: ["**/*.md", "**/*.mdx"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          includeCurrentVersion: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
    redocusaurus,
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: "NSRFPEJ4NC",

        // Public API key: it is safe to commit it
        apiKey: "cea41b975ad6c9a01408dfda6e0061d3",

        indexName: "teku",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        // ... other Algolia params
      },
      announcementBar: {
        id: "announcement_bar",
        content: "⛔️ This documentation site is still under construction! 🚧",
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: false,
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 5,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "Teku",
        logo: {
          alt: "Teku",
          src: "img/logo.svg",
          srcDark: "img/logo_dark.svg",
          width: 32,
          height: 32,
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docSidebar",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          {
            type: "docSidebar",
            sidebarId: "referenceSidebar",
            docId: "index",
            position: "left",
            label: "Reference",
          },
          {
            label: "API",
            to: "/api/",
          },
          {
            href: "https://github.com/ConsenSys/teku",
            className: "header-github-link",
            position: "right",
          },
          {
            href: "https://discord.gg/ChtFaC4",
            className: "header-discord-link",
            position: "right",
          },
          {
            href: "https://twitter.com/consensys",
            className: "header-twitter-link",
            position: "right",
          },
          {
            href: "https://hub.docker.com/r/consensys/teku",
            className: "header-dockerhub-link",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Get Started",
                to: "/category/get-started",
              },
              {
                label: "Concepts",
                to: "/category/concepts",
              },
              {
                label: "Tutorials",
                to: "/category/tutorials",
              },
              {
                label: "Reference",
                to: "/Reference/CLI/CLI-Syntax",
              },
              {
                label: "REST API",
                to: "/api",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/ChtFaC4",
              },
              {
                label: "Issues",
                href: "https://github.com/ConsenSys/teku/issues",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Documentation on GitHub",
                href: "https://github.com/ConsenSys/doc.teku",
              },
              {
                label: "ConsenSys",
                href: "https://consensys.net",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ConsenSys, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["solidity", "toml"],
      },
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
      ],
    }),
  plugins: [
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-F9RSB6WR52",
        anonymizeIP: true,
      },
    ],
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-W4K2Z88",
      },
    ],
  ],
  themes: [],
};

module.exports = config;
