# Build a CLI using Typescript

## Description
You can create your own cli using this example repo.

## Installation
Create a folder and open with vscode

```ts
npm init -y //create a package.json file
tsc --init ///create a tsconfig.json file
npm install yargs //cath and use command line command
npm install @types/yargs //typescript version of yargs
npm install @types/node //if we want to use fs module this package we need to install
```

## Usage
You must create bellow folders and files then you can try
```ts
npm run build //this build your cli to dist folder
npm link //this install cli
ts --help //you can see what inside it
```

## Folder tree
- node_modules
- src
  - index.ts
- package-lock.json
- package.json
- tsconfig.json


## Package.json
```json
{
  "name": "my-test-cli", //this npm package name. If you want to publish you must give a unique name
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "ts": "./dist/index.js" //this cli name and folder. You can change you're cli name here.
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^20.6.0",
    "@types/yargs": "^17.0.24",
    "yargs": "^17.7.2"
  }
}
```


## TSConfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## index.ts
```ts
#!/usr/bin/env node
import yargs from 'yargs';
import fs from 'fs';
import { exec } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const argv = yargs
    .command({
        command: "create", //command name
        describe: "Create a style.css file", //description
        aliases: ["c"], //alias
        builder: {}, //options
        handler: function (argv){ //what do you want this command
            createStyleCss();
        }
    })
    .command("build", "Run npm run build") //name - description
    .command("new", "Create a new project",{
        'name': { //options
            describe: "Project name", //options description
            demandOption: true, //is have to?
            type: 'string', //type
            alias: 'n' //alias
        }
    })
    .help()
    .argv as { [key: string]: unknown, _: string[]};


if(argv._.includes("create")){
    createStyleCss();
}

if(argv._.includes("build")){
    exec("npm run build", (error, stdout, stderr)=> {
        if(error){
            console.error(`Error: ${stdout}`)
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    })
}

if(argv._.includes("new")){
    let projectName = argv.name as string;

    if(!projectName){
        rl.question("Please enter a project name:", (inputName: string)=> {
            projectName = inputName;
            rl.close();
            createNewProject(projectName);
        })
    }else{
        createNewProject(projectName);
    }
}

function createNewProject(projectName: string){
    fs.mkdirSync(projectName);

    exec(`git clone https://github.com/TanerSaydam/task-angular-app.git ${projectName}`, (error, stdout, stderr)=> {
        if(error){
            console.error(`Error: ${stdout}`)
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        exec(`cd ${projectName} && npm install`, (error, stdout, stderr)=> {
            if(error){
                console.error(`Error: ${stdout}`)
                return;
            }
    
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        })
    })
}

function createStyleCss(){
    const defaultCss = `
    *{
        margin: 0;
        padding: 0;
    }`

    fs.writeFileSync("style.css",defaultCss);
    console.log("Style.css has ben created.");
}
```
