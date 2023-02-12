import { readFile, writeFile } from "fs/promises";

export async function generatePackageJson(projectDirectory) {
  const packageJsonPath = `./${projectDirectory}/package.json`;

  const packageJsonBuffer = await readFile(packageJsonPath);

  const packageJsonData = JSON.parse(packageJsonBuffer.toString());

  packageJsonData.name = projectDirectory;
  packageJsonData.version = '1.0.0';
  packageJsonData.repository = '';
  packageJsonData.author = '';

  delete packageJsonData.bin;

  const packageJsonStringified = JSON.stringify(packageJsonData, null, 2);

  await writeFile(packageJsonPath, packageJsonStringified);
}
