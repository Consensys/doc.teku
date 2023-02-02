import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
// import styles from "./styles.module.css";

type CardItem = {
  title: string;
  link: string;
  description: JSX.Element;
  buttonName: string;
  buttonType:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "link";
};

const CardList: CardItem[] = [
  {
    title: "🏁 Getting Started",
    link: "/category/get-started",
    description: (
      <>
        Get started with Teku by installing as binary, from source, or Docker.
        Hit the ground running in less than 5 minutes!
      </>
    ),
    buttonName: "Go and get started",
    buttonType: "success",
  },
  {
    title: "💭 Learn",
    link: "/category/concepts",
    description: (
      <>
        Check out some general concepts that will help you understand how Teku
        and Ethereum work under the hood and are architected.
      </>
    ),
    buttonName: "Go and learn",
    buttonType: "secondary",
  },
  {
    title: "👨‍💻 Reference",
    link: "/Reference/CLI/CLI-Syntax",
    description: (
      <>
        Find command line arguments, REST API methods, and general configuration
        in the References section.
      </>
    ),
    buttonName: "Go to reference",
    buttonType: "info",
  },
];

function Card({ title, link, description, buttonName, buttonType }: CardItem) {
  return (
    <div className={clsx("col", "col--4", "margin-top--md")}>
      <div className="card-demo">
        <div className="card">
          <div className="card__header">
            <h3>{title}</h3>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <Link
              className={clsx(
                "button",
                "button--" + buttonType,
                "button--block",
              )}
              to={link}>
              {buttonName}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageCards(): JSX.Element {
  return (
    <section className={clsx("margin-top--lg", "margin-bottom--lg")}>
      <div className="container">
        <h1>Quick Links</h1>
        <hr />
        <div className="row">
          {CardList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
