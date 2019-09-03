module.exports = {
    title: "Formite",
    tagline: "Easy forms with React Hooks",
    url: "https://www.formite.org",
    baseUrl: "/",
    favicon: "img/favicon.ico",
    organizationName: "formitedev", // Usually your GitHub org/user name.
    projectName: "formite", // Usually your repo name.
    themeConfig: {
        navbar: {
            title: "Formite",
            logo: {
                alt: "Formite Logo",
                src: "img/logo.svg"
            },
            links: [
                { to: "docs/getting-started", label: "Docs", position: "left" },
                { to: "blog", label: "Blog", position: "left" },
                {
                    href: "https://github.com/formitedev/formite",
                    label: "GitHub",
                    position: "right"
                }
            ]
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Getting started",
                            to: "docs/getting-started"
                        },
                        {
                            label: "API",
                            to: "docs/api-form-hook"
                        }
                    ]
                },
                {
                    title: "Community",
                    items: [
                        {
                            label: "Github",
                            href: "https://github.com/formitedev/formite/issues"
                        }
                    ]
                },
                {
                    title: "Social",
                    items: [
                        {
                            label: "Blog",
                            to: "blog"
                        }
                    ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} formite.org. Documentation built with Docusaurus.`
        }
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.js")
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css")
                }
            }
        ]
    ]
};
