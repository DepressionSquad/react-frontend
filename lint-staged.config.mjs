import path from "node:path";

const normalize = (file) =>
  path.relative(process.cwd(), file).replaceAll("\\", "/");
const quote = (file) =>
  `"${file.replaceAll("\\", "/").replaceAll('"', '\\"')}"`;

export default {
  "**/*": (files) => {
    const normalizedFiles = files.map((file) => ({
      file,
      path: normalize(file),
    }));
    const webSources = normalizedFiles.filter(({ path }) =>
      /^apps\/web\/.*\.(ts|tsx)$/.test(path),
    );
    const uiSources = normalizedFiles.filter(({ path }) =>
      /^packages\/ui\/.*\.(ts|tsx)$/.test(path),
    );
    const formatFiles = normalizedFiles.filter(({ path }) =>
      /\.(ts|tsx|json|md|css|html)$/.test(path),
    );
    const shouldBuild = normalizedFiles.some(({ path }) =>
      /^(apps\/web\/.*\.(ts|tsx)|apps\/web\/(package|tsconfig)\.json|apps\/web\/vite\.config\.ts|packages\/ui\/.*\.(ts|tsx)|packages\/ui\/package\.json|packages\/typescript-config\/.*\.json)$/.test(
        path,
      ),
    );
    const commands = [];

    if (formatFiles.length > 0) {
      commands.push(
        `prettier --write ${formatFiles.map(({ file }) => quote(file)).join(" ")}`,
      );
    }

    if (webSources.length > 0) {
      commands.push(
        `pnpm --filter web exec eslint --fix ${webSources.map(({ file }) => quote(file)).join(" ")}`,
      );
    }

    if (uiSources.length > 0) {
      commands.push(
        `pnpm --filter @repo/ui exec eslint --fix ${uiSources.map(({ file }) => quote(file)).join(" ")}`,
      );
    }

    if (shouldBuild) {
      commands.push("pnpm --filter web build");
    }

    return commands;
  },
};
