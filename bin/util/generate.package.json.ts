import { readFile, writeFile } from "fs/promises";

export async function generatePackageJson(projectDirectory: string): Promise<void> {
  const packageJsonPath: string = `./${projectDirectory}/package.json`;

  const packageJsonBuffer: Buffer = await readFile(packageJsonPath);

  const packageJsonData: Record<string, any> = JSON.parse(packageJsonBuffer.toString());

  packageJsonData.name = projectDirectory;
  packageJsonData.version = '1.0.0';
  packageJsonData.repository = '';
  packageJsonData.author = '';

  delete packageJsonData.bin;

  const packageJsonStringified: string = JSON.stringify(packageJsonData, null, 2);

  await writeFile(packageJsonPath, packageJsonStringified);
}
