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
          lastVersion: "23.6.2",
          versions: {
            //defaults to the ./docs folder
            // using 'development' instead of 'next' as path
            current: {
              label: "development",
              path: "development",
              banner: "unreleased",
            },
            //the last stable release in the versioned_docs/version-stable
            // using 'stable' as path
            "23.6.2": {
              label: "stable (23.6.2)",
              path: "stable",
              banner: "none",
            },
          },
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
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },
          {
            href: "https://github.com/ConsenSys/teku",
            className: "header-github-link",
            position: "right",
          },
          {
            href: "https://discord.com/invite/consensys",
            className: "header-discord-link",
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
                to: "/stable/introduction",
              },
              {
                label: "Get started",
                to: "/stable/get-started",
              },
              {
                label: "How to guides",
                to: "/stable/how-to",
              },
              {
                label: "Tutorials",
                to: "/stable/tutorials",
              },
            ],
          },
          {
            title: "Reference",
            items: [
              {
                label: "Command line",
                to: "/stable/reference/cli",
              },
              {
                label: "REST API",
                to: "/stable/reference/rest",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "ConsenSys Discord",
                href: "https://discord.com/invite/consensys",
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
            from: "/en/latest",
            to: "/",
          },
          {
            from: "/en/stable",
            to: "/",
          },
          {
            from: "/HowTo/Get-Started/Installation-Options/Install-Binaries",
            to: "/stable/get-started/install/install-binaries",
          },
          {
            from: "/HowTo/Get-Started/Installation-Options/Build-From-Source",
            to: "/stable/get-started/install/build-from-source",
          },
          {
            from: "/HowTo/Get-Started/Installation-Options/Run-Docker-Image",
            to: "/stable/get-started/install/run-docker-image",
          },
          {
            from: "/HowTo/Get-Started/Run-Teku",
            to: "/stable/get-started/start-teku",
          },
          {
            from: "/HowTo/Get-Started/Connect/Connect-To-Mainnet",
            to: "/stable/get-started/connect/mainnet",
          },
          {
            from: "/HowTo/Get-Started/Connect/Connect-To-Testnet",
            to: "/stable/get-started/connect/testnet",
          },
          {
            from: "/HowTo/Get-Started/Checkpoint-Start",
            to: "/stable/get-started/checkpoint-start",
          },
          {
            from: "/HowTo/Get-Started/Manage-Memory",
            to: "/stable/get-started/manage-memory",
          },
          {
            from: "/HowTo/Get-Started/Migrate-to-Teku",
            to: "/stable/get-started/migrate-to-teku",
          },
          {
            from: "/category/external-signing",
            to: "/stable/how-to/use-external-signer",
          },
          {
            from: "/HowTo/External-Signer/Use-External-Signer",
            to: "/stable/how-to/use-external-signer/use-web3signer",
          },
          {
            from: "/HowTo/External-Signer/Manage-keys",
            to: "/stable/how-to/use-external-signer/manage-keys",
          },
          {
            from: "/HowTo/Load-Validators-No-Restart",
            to: "/stable/how-to/load-validators-without-restarting",
          },
          {
            from: "/HowTo/Monitor/Metrics",
            to: "/stable/how-to/monitor/use-metrics",
          },
          {
            from: "/HowTo/Monitor/Logging",
            to: "/stable/how-to/monitor/configure-logging",
          },
          {
            from: "/HowTo/Configure/Use-Configuration-File",
            to: "/stable/how-to/configure/use-config-file",
          },
          {
            from: "/HowTo/Configure/Proposer-Configuration",
            to: "/stable/how-to/configure/use-proposer-config-file",
          },
          {
            from: "/HowTo/Configure/Configure-TLS",
            to: "/stable/how-to/configure/tls",
          },
          {
            from: "/HowTo/Configure/Builder-Network",
            to: "/stable/how-to/configure/builder-network",
          },
          {
            from: "/HowTo/Find-and-Connect/Specifying-NAT",
            to: "/stable/how-to/find-and-connect/specify-nat",
          },
          {
            from: "/HowTo/Find-and-Connect/Improve-Connectivity",
            to: "/stable/how-to/find-and-connect/improve-connectivity",
          },
          {
            from: "/HowTo/Voluntary-Exit",
            to: "/stable/how-to/voluntarily-exit",
          },
          {
            from: "/HowTo/Reconstruct-Historical-States-Service",
            to: "/stable/how-to/reconstruct-historical-states",
          },
          {
            from: "/HowTo/Sentry-Nodes",
            to: "/stable/how-to/use-sentry-nodes",
          },
          {
            from: [
              "/category/troubleshoot",
              "/stable/HowTo/Troubleshoot/Troubleshooting",
            ],
            to: "/stable/how-to/troubleshoot",
          },
          {
            from: "/HowTo/Withdrawal-Keys",
            to: "/stable/how-to/update-withdrawal-keys",
          },
          {
            from: "/HowTo/Doppelganger-Detection",
            to: "/stable/how-to/enable-doppelganger-detection",
          },
          {
            from: "/HowTo/Migrate-Database",
            to: "/stable/how-to/migrate-database",
          },
          {
            from: "/HowTo/Prevent-Slashing",
            to: "/stable/how-to/prevent-slashing",
          },
          {
            from: "/Concepts/ArchitectureOverview",
            to: "/stable/concepts/architecture",
          },
          {
            from: "/Reference/CLI/CLI-Syntax",
            to: "/stable/reference/cli",
          },
          {
            from: "/category/get-started",
            to: "/stable/get-started",
          },
          {
            from: "/category/install-teku",
            to: "/stable/get-started/install",
          },
          {
            from: "/category/connect-to-a-network",
            to: "/stable/get-started/connect",
          },
          {
            from: "/category/how-to",
            to: "/stable/how-to",
          },
          {
            from: "/category/configure",
            to: "/stable/how-to/configure",
          },
          {
            from: "/category/use-an-external-signer",
            to: "/stable/how-to/use-external-signer",
          },
          {
            from: "/category/find-and-connect-to-peers",
            to: "/stable/how-to/find-and-connect",
          },
          {
            from: "/category/monitor-nodes",
            to: "/stable/how-to/monitor",
          },
          {
            from: "/category/concepts",
            to: "/stable/concepts",
          },
          {
            from: "/category/tutorials",
            to: "/stable/tutorials",
          },
        ],
        createRedirects(existingPath) {
          if (existingPath.includes("/development")) {
            return [
              existingPath.replace("/development", "/en/development"),
              existingPath.replace("/development", "/en/latest"),
              existingPath.replace("/development", "/latest"),
            ];
          }
          if (existingPath.includes("/stable")) {
            return [existingPath.replace("/stable", "/en/stable")];
          }
          return undefined; // Return a falsy value: no redirect created
        },
      },
    ],
  ],
  themes: [],
};

module.exports = config;
