import { ConnectionLitify, ConnectionMongo } from "../utils/database/conn";
import { Field } from "jsforce";
import * as fs from "fs";

async function main(
  envPath: string,
  typeNamesConcat: string,
  tsFolder: string = ".",
  mdFolder: string = ".",
  overwrite: boolean = false
) {
  const env = JSON.parse(fs.readFileSync(envPath, "utf8"));
  process.env = { ...process.env, ...env };

  const conn = await ConnectionLitify.getConnection();

  const typeNames = typeNamesConcat.split(",");
  for (let typeName of typeNames) {
    console.log(`Documenting ${typeName}`);
    const description = await conn.describe(typeName);

    const allFields = description.fields
      .reduce((p, n) => {
        return p + ", " + n.name;
      }, "")
      .replace(", ", "");
    const types: string[] = [];
    let fieldsMd =
      "| Label | API Name | Type | Length | Possible Choices |\n| --- | --- | --- | --- | --- |";
    let typeFile = `/** @constant salesforceName Type name in salesforce */\n export const salesforceName = "${typeName}";\n\n`;
    typeFile += `/** @constant allFields All fields, comma separated.\n * As salesforce doesn't support 'SELECT *', use 'SELECT \`\${allFields}\`' \n */\n export const allFields = "${allFields}";\n\n`;
    typeFile += `/** @interface ${typeName} (labeled as ${description.label})\n * Check ${typeName}.md for fields labels and relationship info.\n */\nexport interface ${typeName} {`;
    for (let field of description.fields) {
      const a = processField(field);
      if (!a) {
        continue;
      }
      if (a.typeDeclaration) {
        types.push(a.typeDeclaration);
      }
      fieldsMd += a.mdText;
      typeFile += a.tsText;
    }
    typeFile += "\n}";

    for (let typeDef of types) {
      typeFile += `\n\n${typeDef}`;
    }

    const relationshipsMd = description.childRelationships.reduce((p, n) => {
      return `${p}\n|${n.relationshipName}|${n.childSObject}|${n.field}|`;
    }, "| Name | Child Object | Field |\n| --- | --- | --- |");

    try {
      fs.writeFileSync(
        `${mdFolder}/${typeName}.md`,
        `#${typeName} \n\n ## Fields \n\n${fieldsMd} \n\n ## Relationships \n\n${relationshipsMd}`,
        { flag: overwrite ? "w" : "wx" }
      );
      console.log(`Documentation written to ${mdFolder}/${typeName}.md`);
    } catch (error) {
      console.log(`Couldn't write file : ${mdFolder}/${typeName}.md ${error}`);
    }

    try {
      fs.writeFileSync(`${tsFolder}/${typeName}.ts`, typeFile, {
        flag: overwrite ? "w" : "wx",
      });
      console.log(`Interface written to ${tsFolder}/${typeName}.ts`);
    } catch (error) {
      console.log(`Couldn't write file ${tsFolder}/${typeName}.ts: ${error}`);
    }
  }
  await ConnectionMongo.closeConnection();
}

function processField(field: Field) {
  const isOptional =
    field.nillable ||
    !field.createable ||
    field.defaultedOnCreate ||
    !field.updateable;
  let tsText: string;
  let mdText = `\n|${field.label}|${field.name}|`;
  let typeDeclaration: string;

  switch (field.type) {
    case "string": {
      tsText = `\n/** Max length: ${field.length} */\n\t${field.name}${
        isOptional ? "?:" : ":"
      } `;
      tsText += `string;`;
      mdText += `${field.type} | ${field.length} | |`;
      break;
    }
    case "currency": {
      tsText = `\n/** Max length: ${field.precision - field.scale}.${
        field.scale
      }. */\n\t${field.name}${isOptional ? "?:" : ":"} `;
      tsText += `number;`;
      mdText += `${field.type} | ${field.precision - field.scale}.${
        field.scale
      } | |`;
      break;
    }
    case "date": {
      tsText = `\n/** YYYY-MM-DD */\n\t${field.name}${
        isOptional ? "?:" : ":"
      } `;
      tsText += `string;`;
      mdText += `${field.type} | | |`;
      break;
    }
    case "datetime": {
      tsText = `\n\t${field.name}${isOptional ? "?:" : ":"} `;
      tsText += `Date;`;
      mdText += `${field.type} | | |`;
      break;
    }
    case "boolean": {
      tsText = `\n\t${field.name}${isOptional ? "?:" : ":"} `;
      tsText += `boolean;`;
      mdText += `${field.type} | | |`;
      break;
    }
    case "double": {
      tsText = `\n/** Max length: ${field.precision - field.scale}.${
        field.scale
      }. */\n\t${field.name}${isOptional ? "?:" : ":"} `;
      tsText += `number;`;
      mdText += `${field.type} | ${field.precision - field.scale}.${
        field.scale
      } | |`;
      break;
    }
    case "int": {
      tsText = `\n/** Max length: ${field.digits}.*/\n\t${field.name}${
        isOptional ? "?:" : ":"
      } `;
      tsText += `number;`;
      mdText += `${field.type} | ${field.digits} | |`;
      break;
    }
    case "email": {
      tsText = `\n/** Email. Max length: ${field.length}. */\n\t${field.name}${
        isOptional ? "?:" : ":"
      } `;
      tsText += `string;`;
      mdText += `${field.type} | ${field.length} | |`;
      break;
    }
    case "phone": {
      tsText = `\n/** Phone. Max length: ${field.length}. */\n\t${field.name}${
        isOptional ? "?:" : ":"
      } `;
      tsText += `string;`;
      mdText += `${field.type} | ${field.length} | |`;
      break;
    }
    case "textarea": {
      tsText = `\n/** Max length: ${field.length}. */\n\t${field.name}${
        isOptional ? "?:" : ":"
      } `;
      tsText += `string;`;
      mdText += `${field.type} | ${field.length} | |`;
      break;
    }
    case "picklist": {
      tsText = `\n\t${field.name}${isOptional ? "?:" : ":"} `;
      typeDeclaration = `export type ${field.name}Type = `;
      const possibleChoices = !!field.picklistValues
        ? field.picklistValues
            .reduce((p, n) => {
              typeDeclaration += `| "${n.value}"`;

              return `${p}<br>${n.label}(${n.value})`;
            }, "")
            .replace("<br>", "")
        : "";

      typeDeclaration = typeDeclaration.replace("|", "") + ";";
      tsText += `${field.name}Type;`;
      mdText += `${field.type} | ${field.length} | ${possibleChoices} |`;
      break;
    }
    case "multipicklist": {
      tsText = `\n\t${field.name}${isOptional ? "?:" : ":"} `;
      typeDeclaration = `export type ${field.name}Type = `;
      const possibleChoices = !!field.picklistValues
        ? field.picklistValues
            .reduce((p, n) => {
              typeDeclaration += `| "${n.value}"`;

              return `${p}<br>${n.label}(${n.value})`;
            }, "")
            .replace("<br>", "")
        : "";

      typeDeclaration = typeDeclaration.replace("|", "") + ";";
      tsText += `${field.name}Type[];`;
      mdText += `${field.type} | ${field.length} | ${possibleChoices} |`;
      break;
    }
    case "reference": {
      tsText = `\n/** Check ${field.referenceTo} relationship ${
        field.relationshipName
      }. */\n\t${field.name}${isOptional ? "?:" : ":"} `;
      tsText += `any;`;
      mdText += `${field.type} | ${field.length} | |`;
      break;
    }
    case "id": {
      tsText = `\n/** Max length: ${field.length}. */\n\t${field.name}${
        isOptional ? "?:" : ":"
      } `;
      tsText += `string;`;
      mdText += `${field.type} | ${field.length} | |`;
      break;
    }
    default: {
      tsText = `\n/** // Check .md for details. */\n\t${field.name}${
        isOptional ? "?:" : ":"
      } `;
      tsText += `any;`;
      mdText += `${field.type} | | |`;
    }
  }

  return { typeDeclaration, tsText, mdText };
}

main(
  process.argv[2],
  process.argv[3],
  process.argv[4],
  process.argv[5],
  process.argv[6] === "true"
);
