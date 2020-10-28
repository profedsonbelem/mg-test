/**
 * Check if the given object has all the attributes.
 * For subattributes use '.',
 * e.g., 'intake.id' will check the existence of the id attribute inside the intake attribute.
 */
export function objectHasAttributes(
  object: any,
  attributes: string[]
): { hasAttributes: boolean; missingAttributes: string[] } {
  // console.log(`Looking for attributes in ${JSON.stringify(object)}`);

  const missingAttributes: string[] = [];
  for (let i in attributes) {
    const currentAttribute = attributes[i];
    console.log(`Looking for ${currentAttribute}`);
    const valueInSrc = getAttribute(object, currentAttribute);

    if (!valueInSrc) {
      console.log(`Don't have ${currentAttribute}`);
      missingAttributes.push(currentAttribute);
    }
  }

  if (missingAttributes.length != 0) {
    return { hasAttributes: false, missingAttributes };
  } else {
    return { hasAttributes: true, missingAttributes };
  }
}

/** @todo allow default value to specific fields */
export function mapAttributes(
  object: any,
  map: { [attributesInSrc: string]: string },
  options: {
    keepAttributes?: boolean;
    defaultValues?: { [attributesInTarged: string]: any };
  } = {}
) {
  options = {
    keepAttributes: false,
    defaultValues: {},
    ...options,
  };
  const mappedAttributes: any = options.keepAttributes ? object : {};

  for (let currentAttribute in map) {
    // console.log(`Maping for ${currentAttribute}`);

    const valueInSrc = getAttribute(object, currentAttribute);

    const attributeInTarget = map[currentAttribute];
    delete mappedAttributes[currentAttribute];
    if (valueInSrc != undefined) {
      mappedAttributes[attributeInTarget] = valueInSrc;
      // console.log(`Mapped attribute: ${mappedAttributes[attributeInTarget]}`);
    } else {
      if (options.defaultValues[attributeInTarget] != undefined) {
        mappedAttributes[attributeInTarget] =
          options.defaultValues[attributeInTarget];
      }
    }
  }

  return mappedAttributes;
}

export function applyMaps<T = any>(
  object: T,
  maps: { [attributeInTarget: string]: (data: T) => any },
  options: { defaultValues?: { [attributesInTarged: string]: any } } = {}
) {
  const mapped: any = {};
  options = {
    defaultValues: {},
    ...options,
  };

  for (let att in maps) {
    try {
      const value = maps[att](object);
      if (value !== undefined) {
        mapped[att] = value;
      }
    } catch (error) {
      const value = options.defaultValues[att];
      if (value !== undefined) {
        mapped[att] = value;
      }
    }
  }

  return mapped;
}

export function getOnlyAttributes(object: any, attributes: string[]): any {
  const filteredObject: any = {};

  console.log(
    `Filtering ${JSON.stringify(attributes)} from ${JSON.stringify(object)}`
  );
  for (let i in attributes) {
    const att = attributes[i];
    const value = getAttribute(object, att);
    if (!!value) {
      filteredObject[att] = value;
    } else {
      console.log(`Didn't found ${att}`);
    }
  }

  return filteredObject;
}

export function getAttribute(object: any, attribute: string): any {
  if (!attribute) {
    return undefined;
  }

  const splitedAttribute = attribute.split(".");
  try {
    // Will fail if the current object don't have the key
    const finalObject = splitedAttribute.reduce((currentObject, key) => {
      // console.log(`Looking for ${key} in ${JSON.stringify(currentObject)}`);
      return currentObject[key];
    }, object);

    // console.log(`Final object: ${finalObject}`);
    return finalObject;
  } catch (error) {
    // console.log(`Don't have ${attribute}`);
    return;
  }
}

export function setAttribute(object: any, attribute: string, value: any): any {
  const firstDotIndex = attribute.indexOf(".");
  if (firstDotIndex === -1) {
    object[attribute] = value;
  } else {
    const beforeDot = attribute.slice(0, firstDotIndex);
    const afterDot = attribute.slice(firstDotIndex + 1);

    if (object[beforeDot] == undefined) {
      object[beforeDot] = {};
    }

    object[beforeDot] = setAttribute(object[beforeDot], afterDot, value);
  }

  return object;
}

/** Unless stated otherwise, will always prefer objectA attributes */
export function mergeObjects<T = any>(
  objectA: T,
  objectB: T,
  preference: { [attribute: string]: "A" | "B" } = {}
): T {
  const merged = { ...objectB };
  for (let att in objectA) {
    const valueInB = objectB[att];
    if (valueInB != undefined && preference[att] === "B") {
      // Keep the value from B
    } else {
      merged[att] = objectA[att];
    }
  }

  return merged;
}
