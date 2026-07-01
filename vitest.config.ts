import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["pkgs/*"],
    watch: false,
    reporters: process.env.GITHUB_ACTIONS !== "" ? ["default", "github-actions"] : ["default"],
  },
});
