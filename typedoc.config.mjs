const { job_html_url } = process.env;

const navigationLinks = {
  "GitHub Repo": "https://github.com/aereal/graphql-signedops",
};
if (job_html_url) {
  navigationLinks["Build Job"] = job_html_url;
}

/**
 * @type {import('typedoc').TypeDocOptions}
 */
const config = {
  entryPoints: ["pkgs/*"],
  entryPointStrategy: "packages",
  packageOptions: {
    entryPoints: ["src/index.ts"],
  },
  exclude: ["pkgs/test-utils"],
  out: "./docs",
  name: "graphql-signedops",
  navigationLinks,
};

export default config;
