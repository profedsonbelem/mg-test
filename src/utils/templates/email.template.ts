import { getTemplateFile } from "./loadTemplate";

/** @deprecated use loadEmailTemplate */
export async function getEmailTemplate(resourcesFolder: string) {
  const template = await getTemplateFile(resourcesFolder, "email.html");

  return template;
}
