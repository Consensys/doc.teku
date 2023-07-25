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
    title: "🏁 Get started",
    link: "/stable/get-started",
    // prettier-ignore
    description: (
      <>
        Get started with Teku using one of several installation options.
      </>
    ),
    buttonName: "Continue",
    buttonType: "success",
  },
  {
    title: "💭 Learn",
    link: "/stable/concepts",
    // prettier-ignore
    description: (
      <>
        Learn about Teku concepts such as proof of stake and weak subjectivity.
      </>
    ),
    buttonName: "Continue",
    buttonType: "secondary",
  },
  {
    title: "👨‍💻 Reference",
    link: "/stable/reference/cli",
    // prettier-ignore
    description: (
      <>
        See Teku command line options and REST API methods.
      </>
    ),
    buttonName: "Continue",
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
        <h1>Quick links</h1>
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
