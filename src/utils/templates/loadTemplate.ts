import { getS3Object } from "../aws/s3.utils";

export type FullEmailTemplate = {
  subject: string;
  template: string;
  templateHtml?: string;
  templateMap: { [attInObject: string]: string };
};

/**
 * Parses and return a record configuration file. Template files must be utf8.
 * @param resourcesFolder The resources folder
 * @param fileName The key of the file in the record header
 * @returns {any} The record header as json
 */
export async function getTemplateFile(
  resourcesFolder: string,
  fileName: string
): Promise<string> {
  try {
    const resourcesBucket = process.env.resources;
    const templateFile = await getS3Object(
      resourcesBucket,
      `${resourcesFolder}/templates/${fileName}`
    );
    if (!templateFile.Body) {
      console.log("Template file without body");
      return "";
    }

    const fileAsString = templateFile.Body.toString("utf8");

    console.log(`Loaded template: ${fileAsString}`);

    return fileAsString;
  } catch (error) {
    console.log(`Didnt found template`);
    return "";
  }
}

/** @todo Join get s3 files */
export async function getTemplateMap(
  resourcesFolder: string,
  fileName: string
): Promise<any> {
  try {
    const resourcesBucket = process.env.resources;
    const mapFile = await getS3Object(
      resourcesBucket,
      `${resourcesFolder}/templates/${fileName}`
    );
    console.log("Got template file");
    if (!mapFile.Body) {
      console.log("Map file without body");
      return undefined;
    }

    console.log("Parsing file");

    const parsedFile = JSON.parse(mapFile.Body.toString("utf8"));

    console.log(`Loaded map: ${JSON.stringify(parsedFile)}`);

    return parsedFile;
  } catch (error) {
    console.log(`Didnt found map ${error}`);
    return undefined;
  }
}

/** @todo also load attachments */
export async function loadFullTemplate(
  resourcesFolder: string,
  templateName: string
) {
  const resourcesBucket = process.env.resources;
  const templateFile = await getS3Object(
    resourcesBucket,
    `${resourcesFolder}/templates/${templateName}`
  );
  console.log(`Loaded template ${templateName}`);
  if (!templateFile.Body) {
    console.log("Map file without body");
    throw { message: "Map file without body" };
  }

  console.log("Parsing file");
  const fullTemplate: FullEmailTemplate = JSON.parse(
    templateFile.Body.toString("utf8")
  );

  //If there's no template in the file, load from html
  if (!fullTemplate.template) {
    console.log(`No explicit template given, loading from html`);
    fullTemplate.template = await getTemplateFile(
      resourcesFolder,
      fullTemplate.templateHtml
    );
  }

  console.log(`Loaded Template: ${JSON.stringify(fullTemplate)}`);

  return fullTemplate;
}

export async function loadBestFullTemplate(
  resourcesFolder: string,
  templateList: string[]
) {
  let fullTemplate: FullEmailTemplate;
  for (let templateName of templateList) {
    try {
      fullTemplate = await loadFullTemplate(resourcesFolder, templateName);
      console.log(`Loaded Template: ${JSON.stringify(fullTemplate)}`);

      if (!!fullTemplate) {
        return fullTemplate;
      }
    } catch (error) {
      if (error.statusCode == 404) {
        console.log(`Didn't find template ${templateName}`);
      } else {
        throw error;
      }
    }
  }

  throw { statusCode: 404, message: "Didn't find any of the templates" };
}
