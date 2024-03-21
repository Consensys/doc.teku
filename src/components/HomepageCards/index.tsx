import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from '@theme/Heading'

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
    link: "/get-started",
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
    title: "🤖 Chatbot",
    link: "/chatbot",
    // prettier-ignore
    description: (
      <>
        Use the Documentation Chatbot to get assistance with questions about Teku or usage instructions.
      </>
    ),
    buttonName: "Continue",
    buttonType: "secondary",
  },
  {
    title: "👨‍💻 Reference",
    link: "/reference/cli",
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
          <Heading as='h3'>{title}</Heading>
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
      <Heading as='h1'>Quick Links</Heading>
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
