import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageCards from "@site/src/components/HomepageCards";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.introductionBlock)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.title, styles.forceColor)}>
          {siteConfig.title}
        </h1>
        <p
          className={clsx(
            "hero__subtitle",
            styles.forceColor,
            styles.subtitle,
          )}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/introduction">
            Learn more
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  // const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Welcome`}>
      <HomepageHeader />
      <main>
        <HomepageCards />
      </main>
    </Layout>
  );
}
