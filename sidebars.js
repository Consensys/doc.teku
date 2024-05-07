/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // apiSidebar: [
  //   {
  //     type: "category",
  //     label: "Teku",
  //     link: {
  //       type: "generated-index",
  //       title: "Teku API",
  //       slug: "/category/teku-api",
  //     },
  //     //@ts-ignore
  //     items: require("./docs/api-gen/sidebar.js"),
  //   },
  // ],
  docSidebar: [
    "index",
    {
      type: "category",
      label: "Get started",
      collapsed: false,
      link: {
        type: "generated-index",
        slug: "/get-started",
      },
      items: [{ type: "autogenerated", dirName: "get-started" }],
    },
    {
      type: "category",
      label: "How to",
      link: {
        type: "generated-index",
        slug: "/how-to",
      },
      items: [{ type: "autogenerated", dirName: "how-to" }],
    },
    {
      type: "category",
      label: "Concepts",
      link: {
        type: "generated-index",
        slug: "/concepts",
      },
      items: [{ type: "autogenerated", dirName: "concepts" }],
    },
    {
      type: "category",
      label: "Tutorials",
      link: {
        type: "generated-index",
        slug: "tutorials",
      },
      items: [{ type: "autogenerated", dirName: "tutorials" }],
    },
    "chatbot"
  ],
  referenceSidebar: [
    {
      type: "category",
      label: "Teku command line",
      items: [{ type: "autogenerated", dirName: "reference/cli" }],
    },
    "reference/rest",
  ],
};

module.exports = sidebars;
