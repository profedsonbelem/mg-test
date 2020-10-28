import * as x2j from "xml2js";

/**
 * Extract the XML within the given tag
 * @param xml The XML to be processed
 * @param outerTag The limiter tag
 * @todo Implement with several (ordered) tags
 */
export function getInnerXML(
  xml: string,
  outerTag: string,
  keepTag: boolean
): string[] {
  let regex: RegExp;
  if (keepTag) {
    regex = new RegExp("(<" + outerTag + ">)([^]*?)(</" + outerTag + ">)", "g");
  } else {
    regex = new RegExp(
      "(?<=(<" + outerTag + ">))([^]*?)(?=(</" + outerTag + ">))",
      "g"
    );
  }

  const innerXML = xml.match(regex);

  if (!innerXML) {
    return [];
  } else {
    return innerXML;
  }
}

/**
 * Transforms XML in JSON
 */
export async function parseXML(xmlAsString: string): Promise<any> {
  console.log(`xmlAsString: ${xmlAsString}`);
  const parser = new x2j.Parser();
  const obj = (await parser.parseStringPromise(xmlAsString)).xml;
  console.log(`Got ${obj}`);

  Object.keys(obj).forEach((k) => {
    obj[k] = obj[k][0];
  });

  Object.keys(obj).forEach((k) => {
    const lk = k.toLowerCase();
    const v = obj[k];
    delete obj[k];
    obj[lk] = v;
  });

  return obj;
}
