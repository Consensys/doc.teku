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
  title: "Teku documentation",
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
      // announcementBar: {
      //   id: "announcement_bar",
      //   content: "⛔️ This documentation site is still under construction! 🚧",
      //   backgroundColor: "#fafbfc",
      //   textColor: "#091E42",
      //   isCloseable: false,
      // },
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
                label: "Introduction",
                to: "introduction",
              },
              {
                label: "Get started",
                to: "/category/get-started",
              },
              {
                label: "How to guides",
                to: "/category/how-to",
              },
              {
                label: "Tutorials",
                to: "/category/tutorials",
              },
            ],
          },
          {
            title: "Reference",
            items: [
              {
                label: "Command line",
                to: "reference/cli",
              },
              {
                label: "REST API",
                to: "/reference/rest",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "ConsenSys Discord",
                href: "https://discord.gg/ChtFaC4",
              },
              {
                label: "Teku GitHub",
                href: "https://github.com/ConsenSys/teku",
              },
              {
                label: "Teku documentation GitHub",
                href: "https://github.com/ConsenSys/doc.teku",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} ConsenSys, Inc.`,
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
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/HowTo/Get-Started/Installation-Options/Install-Binaries",
            to: "/get-started/install/install-binaries",
          },
          {
            from: "/HowTo/Get-Started/Installation-Options/Build-From-Source",
            to: "/get-started/install/build-from-source",
          },
          {
            from: "/HowTo/Get-Started/Installation-Options/Run-Docker-Image",
            to: "/get-started/install/run-docker-image",
          },
          {
            from: "/HowTo/Get-Started/Run-Teku",
            to: "/get-started/start-teku",
          },
          {
            from: "/HowTo/Get-Started/Connect/Connect-To-Mainnet",
            to: "/get-started/connect/mainnet",
          },
          {
            from: "/HowTo/Get-Started/Connect/Connect-To-Testnet",
            to: "/get-started/connect/testnet",
          },
          {
            from: "/HowTo/Get-Started/Checkpoint-Start",
            to: "/get-started/checkpoint-start",
          },
          {
            from: "/HowTo/Get-Started/Manage-Memory",
            to: "/get-started/manage-memory",
          },
          {
            from: "/HowTo/Get-Started/Migrate-to-Teku",
            to: "/get-started/migrate-to-teku",
          },
          {
            from: "/category/external-signing",
            to: "/category/use-an-external-signer",
          },
          {
            from: "/HowTo/External-Signer/Use-External-Signer",
            to: "/how-to/use-external-signer/use-web3signer",
          },
          {
            from: "/HowTo/External-Signer/Manage-keys",
            to: "/how-to/use-external-signer/manage-keys",
          },
          {
            from: "/HowTo/Load-Validators-No-Restart",
            to: "/how-to/load-validators-without-restarting",
          },
          {
            from: "/HowTo/Monitor/Metrics",
            to: "/how-to/monitor/use-metrics",
          },
          {
            from: "/HowTo/Monitor/Logging",
            to: "/how-to/monitor/configure-logging",
          },
          {
            from: "/HowTo/Configure/Use-Configuration-File",
            to: "/how-to/configure/use-config-file",
          },
          {
            from: "/HowTo/Configure/Proposer-Configuration",
            to: "/how-to/configure/use-proposer-config-file",
          },
          {
            from: "/HowTo/Configure/Configure-TLS",
            to: "/how-to/configure/tls",
          },
          {
            from: "/HowTo/Find-and-Connect/Specifying-NAT",
            to: "/how-to/find-and-connect/specify-nat",
          },
          {
            from: "/HowTo/Voluntary-Exit",
            to: "/how-to/voluntarily-exit",
          },
          {
            from: "/HowTo/Reconstruct-Historical-States-Service",
            to: "/how-to/reconstruct-historical-states",
          },
          {
            from: "/HowTo/Sentry-Nodes",
            to: "/how-to/use-sentry-nodes",
          },
          {
            from: [
              "/category/troubleshoot",
              "/HowTo/Troubleshoot/Troubleshooting",
            ],
            to: "/how-to/troubleshoot",
          },
          {
            from: "/HowTo/Withdrawal-Keys",
            to: "/how-to/update-withdrawal-keys",
          },
          {
            from: "/Concepts/ArchitectureOverview",
            to: "/concepts/architecture",
          },
          {
            from: "/Reference/CLI/CLI-Syntax",
            to: "/reference/cli",
          },
        ],
        createRedirects(existingPath) {
          if (existingPath.includes("/how-to")) {
            // Redirect from /HowTo/X to /how-to/X
            return [existingPath.replace("/how-to", "/HowTo")];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
  ],
  themes: [],
};

module.exports = config;
