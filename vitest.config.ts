import { defineConfig } from "vitest/config";

const isInGHA = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  test: {
    projects: ["pkgs/*"],
    watch: false,
    reporters: isInGHA ? ["default", "github-actions"] : ["default"],
    coverage: {
      provider: "v8",
      include: ["pkgs/**/src/**/*.ts"],
      reporter: isInGHA ? ["cobertura"] : ["html"],
    },
  },
});
