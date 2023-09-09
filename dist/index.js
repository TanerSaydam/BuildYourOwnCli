#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const readline_1 = __importDefault(require("readline"));
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const argv = yargs_1.default
    .command({
    command: "create",
    describe: "Create a style.css file",
    aliases: ["c"],
    builder: {},
    handler: function (argv) {
        createStyleCss();
    }
})
    .command("build", "Run npm run build")
    .command("new", "Create a new project", {
    'name': {
        describe: "Project name",
        demandOption: true,
        type: 'string',
        alias: 'n'
    }
})
    .help()
    .argv;
if (argv._.includes("create")) {
    createStyleCss();
}
if (argv._.includes("build")) {
    (0, child_process_1.exec)("npm run build", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stdout}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}
if (argv._.includes("new")) {
    let projectName = argv.name;
    if (!projectName) {
        rl.question("Please enter a project name:", (inputName) => {
            projectName = inputName;
            rl.close();
            createNewProject(projectName);
        });
    }
    else {
        createNewProject(projectName);
    }
}
function createNewProject(projectName) {
    fs_1.default.mkdirSync(projectName);
    (0, child_process_1.exec)(`git clone https://github.com/TanerSaydam/task-angular-app.git ${projectName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stdout}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        (0, child_process_1.exec)(`cd ${projectName} && npm install`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${stdout}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    });
}
function createStyleCss() {
    const defaultCss = `
    *{
        margin: 0;
        padding: 0;
    }`;
    fs_1.default.writeFileSync("style.css", defaultCss);
    console.log("Style.css has ben created.");
}
