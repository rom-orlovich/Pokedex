/* eslint-disable no-console */
const { execSync } = require("child_process");
const { existsSync, writeFileSync } = require("fs");

const packageJson = {
  name: "pokedex",
  version: "1.0.0",
  description: "",
  scripts: {
    start: "node ./server/*.js",
    keywords: [],
    author: "",
    license: "ISC",
  },
};

// exec("npm run build", (error, stdout, stderr) => {
//   if (error) console.log(error);
//   if (stderr) console.log(stderr);
//   console.log(stdout);

//   writeFile("./public/package.json", JSON.stringify(packageJson), (err) => {
//     if (err) console.log(err);
//     console.log("Success");
//   });

//   writeFile("./public/Procfile", `web: npm run start`, (err) => {
//     if (err) console.log(err);
//     console.log("Success");
//   });

//   if (!existsSync("./public/.git"))
//     exec(
//       "cd ./public && git init  && git add . && git commit -m 'init public' && cd ./public && heroku create && git push heroku master -f",
//       (err, out, sterr) => {
//         if (err) console.log(err);
//         if (sterr) console.log(sterr);
//         console.log(out);
//       }
//     );
//   else {
//     const commitMessage = process.argv[2];
//     if (commitMessage)
//       exec(
//         `cd ./public && git add . && git commit -m '${commitMessage}' && git push heroku master -f`,
//         (err, stout, sterr) => {
//           if (err) console.log(err);
//           if (sterr) console.log(sterr);
//           console.log(stout);
//         }
//       );
//   }
// });
//
console.log("Start building the app...");
execSync("npm run build");
console.log("Write new package.json and Procfile in public directory...");
writeFileSync("./public/package.json", JSON.stringify(packageJson));
writeFileSync("./public/Procfile", `web: npm run start`);

console.log("Check git exist");
if (!existsSync("./public/.git")) {
  console.log(
    "Git is not exist , init git repo and depoly to heroku. Please wait..."
  );
  execSync(
    "cd ./public/ && git init  && git add . && git commit -m 'init public' && cd ./public && heroku create && git push heroku master -f"
  );
  console.log("Finish deploy the project to heroku!");
} else {
  const commitMessage = process.argv[2];
  if (commitMessage) {
    console.log("Commit the project and deploy to heroku. please wait...");
    execSync(
      `cd ./public && git add . && git commit -m '${commitMessage}' && git push heroku master -f`
    );
    console.log("Finish deploy the project to heroku!");
  } else console.log("Please add commit message!");
}
