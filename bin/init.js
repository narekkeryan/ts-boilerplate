#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');
const { generatePackageJson } = require('./util/generate.package.json');
const { version } = require('../package.json');

const remoteUrl = 'git@github.com:narekkeryan/ts-boilerplate.git';

const projectDirectory = process.argv[2] || 'ts-boilerplate';

const execute = promisify(exec);

(async () => {
  // step 1: clone repository
  console.info('Downloading...');
  await execute(`git clone --single-branch --branch ${version} ${remoteUrl} ${projectDirectory}`);

  // step 2: remove `.git` directory and initialize with new one
  console.info('Initializing Git...');
  await execute(`cd ${projectDirectory} && rm -rf .git && git init`);

  // step 3: remove `bin` directory
  console.info('Removing Unnecessary Files...');
  await execute(`cd ${projectDirectory} && rm -rf bin`);

  // step 4: update package.json
  console.info('Creating Package.json...');
  await generatePackageJson(projectDirectory);

  // step 5: yarn && yarn prepare
  console.info('Installing Dependencies...');
  await execute(`cd ${projectDirectory} && yarn && yarn prepare`);

  console.info('Success!');
})();
