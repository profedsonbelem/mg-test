import { AuthorizerModule } from "./modules";
import { APIGatewayProxyEvent } from "aws-lambda";
import * as authModules from "./modules";

function loadModules(modulesName: string[]): AuthorizerModule[] {
  return modulesName.map((name) => {
    const module = authModules[name];
    if (!module) {
      throw new Error(`Invalid step name: ${name}`);
    } else {
      return module;
    }
  });
}

/** @todo consider loading modules here */
export function authorizeIfAny(
  event: APIGatewayProxyEvent,
  modulesName: string[]
) {
  const modules = loadModules(modulesName);
  for (let i in modules) {
    const run = modules[i];
    const moduleName = modulesName[i];

    console.log(`Trying ${moduleName}`);
    try {
      const authResult = run(event);
      if (authResult.authorized) {
        console.log(`Allowed by ${moduleName}`);
        return authResult;
      }
    } catch (error) {
      console.log(`Error on ${moduleName}: ${error}`);
    }
  }

  return { authorized: false };
}
