import React from "react";

import classnames from "classnames";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import withBaseUrl from "@docusaurus/withBaseUrl";

import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";

import styles from "./styles.module.css";

const features = [
    {
        title: <>Modern architecture</>,
        imageUrl: "img/undraw_runner_start.svg",
        description: (
            <>Formite it easy to use and was designed from the ground up to use the latest React best practices.</>
        )
    },
    {
        title: <>Any UI framework</>,
        imageUrl: "img/undraw_selecting.svg",
        description: (
            <>
                Formite can be used with any UI framework and comes with adapters for several UI frameworks out of the
                box.
            </>
        )
    },
    {
        title: <>No magic IDs or Names</>,
        imageUrl: "img/undraw_questions.svg",
        description: (
            <>
                Formite does not depend on magic IDs or names on form elements. You can refactor your code without
                breaking your forms.
            </>
        )
    },
    {
        title: <>Powered by Typescript</>,
        imageUrl: "img/undraw_code_typing.svg",
        description: (
            <>
                Formite is implemented with Typescript and can be used by plain Javascript or Typescript. It has full
                Intellisense support.
            </>
        )
    },
    {
        title: <>No dependencies</>,
        imageUrl: "img/undraw_deliveries.svg",
        description: (
            <>Formite does not have any external dependecies and has a footprint of 9 KB minimized Javascript code.</>
        )
    },
    {
        title: <>Backward compatible</>,
        imageUrl: "img/undraw_having_fun.svg",
        description: (
            <>
                Formite uses React Hooks for functional components and can also be used with older class components if
                needed.
            </>
        )
    }
];

const sample = `
const { canSubmit, fields, Form, isDirty } = useForm({ firstName: "", lastName: "" }, handleSubmit);
return (
    <Form>
        <input type="text" placeholder="First name" {...useInput(fields.firstName)} />
        <input type="text" placeholder="Last name" {...useInput(fields.lastName)} />
        <button type="submit" disabled={!(canSubmit && isDirty)}>Save</button>
    </Form>
);
`;

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout title={siteConfig.title} description="Easy forms with React Hooks">
            <header className={classnames("hero hero--primary", styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={classnames("button button--outline button--lg", styles.getStarted)}
                            to={withBaseUrl("docs/getting-started")}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                {features && features.length && (
                    <section className={styles.sectionFeatures}>
                        <div className={styles.features}>
                            {features.map(({ imageUrl, title, description }, idx) => (
                                <div key={idx} className={classnames("col_ col--4_", styles.feature)}>
                                    {imageUrl && (
                                        <div className="text--center">
                                            <img
                                                className={styles.featureImage}
                                                src={withBaseUrl(imageUrl)}
                                                alt={title}
                                            />
                                        </div>
                                    )}
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
                <section className={styles.sample}>
                    <h2>Features</h2>
                    <li>Field and form validation</li>
                    <li>Synchronous and asynchronous validation and form submission</li>
                    <li>Dynamic forms and subforms</li>
                    <li>Tracks fields' touched state</li>
                    <li>Tracks form's isDirty state</li>
                    <li>No render props required</li>
                    <li>Local state - no global store necessary</li>
                </section>
                <section className={styles.sample}>
                    <h3>Everything, without any extra lines of code</h3>
                    <CodeBlock className="language-javascript">{sample}</CodeBlock>
                    <div className={styles.sampleDescription}>
                        <p>Just add the form behavior to your component with React Hooks and you are ready to go...</p>
                    </div>
                    <div className={styles.buttons}>
                        <Link
                            className={classnames("button button--outline button--lg", styles.getStarted)}
                            to={withBaseUrl("docs/getting-started")}
                        >
                            Get Started
                        </Link>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default Home;
