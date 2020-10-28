import { getTemplateFile } from "./loadTemplate";

export async function getSMSTemplate(resourcesFolder: string) {
  const template = await getTemplateFile(resourcesFolder, "sms.txt");

  return template;
}
