const { execSync } = require("child_process");
const { existsSync, writeFileSync } = require("fs");

const packageJson = {
  name: "",
  version: "2.0.0",
  description: "",
  scripts: {
    start: "node ./server/*.js",
    keywords: [],
    author: "",
    license: "ISC",
  },
};
const path = require("path");

const cwd = path.resolve(".", "public");

console.log("Start building the app...");
execSync("npm run build");
console.log("Copy the client build folder to the deploy folder.");

console.log("Write new package.json");
const packageJsonPath = path.resolve(cwd, "package.json");
writeFileSync(packageJsonPath, JSON.stringify(packageJson));
console.log("Check git exist");

if (!existsSync(path.resolve(cwd, ".git"))) {
  console.log("Git is not exist , init git repo. Please wait...");
  execSync(
    "git init && git add . && git commit -m 'init public' && git push origin main ",
    { cwd }
  );

  console.log("Finish init git.");
} else {
  const commitMessage = process.argv[2];
  if (commitMessage) {
    console.log("Commit the project.");

    execSync(
      `git add . && git commit -m '${commitMessage}' && git push origin main  `,
      { cwd }
    );
    console.log("Finish commit.");
  } else console.log("Please add commit message!");
}
console.log("The building was finished successfully");
