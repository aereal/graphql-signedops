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
};

export default config;
