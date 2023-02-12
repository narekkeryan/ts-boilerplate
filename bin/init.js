#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";
import { generatePackageJson } from "./util/generate.package.json";
import { version } from "../package.json";

const remoteUrl = 'git@github.com:narekkeryan/ts-boilerplate.git';

const projectDirectory = process.argv[2] || 'ts-boilerplate';

const execute = promisify(exec);

(async () => {
  // step 1: clone repository
  await execute(`git clone --single-branch --branch ${version} ${remoteUrl} ${projectDirectory}`);

  // step 2: remove `.git` directory and initialize with new one
  await execute(`cd ${projectDirectory} && rm -rf .git && git init`);

  // step 3: remove `bin` directory
  await execute(`cd ${projectDirectory} && rm -rf bin`);

  // step 4: update package.json
  await generatePackageJson(projectDirectory);

  // step 5: yarn && yarn prepare
  await execute(`cd ${projectDirectory} && yarn && yarn prepare`);
})();
