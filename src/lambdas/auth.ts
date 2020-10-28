import { CustomAuthorizerHandler } from "aws-lambda";
import { generateAuthorizerResponse } from "../utils/aws/policy.utils";
import { tokenToSecureLink } from "../utils/auth/token.utils";
import { validateAdminToken, validateJWT } from "../modules/auth/modules";
import { authorizeIfAny } from "../modules/auth/core";
import { error } from "pdf-lib";

// /** Authorize using admin token
//  */
// export const authorizeAdminToken: CustomAuthorizerHandler = (
//     event,
//     context,
//     callback
// ) => {
//     //Check permissions
//     if (validateAdminToken(event).authorized) {
//         console.log("Allowed");
//         return callback(
//             null,
//             generateAuthorizerResponse("user", "Allow", "*")
//         );
//     } else {
//         console.log(`Not allowed`);
//         return callback(
//             null,
//             generateAuthorizerResponse("user", "Deny", "*")
//         );
//     }
// };

// /** Authorize using admin token
//  */
// export const authorizeJWT: CustomAuthorizerHandler = (
//     event,
//     context,
//     callback
// ) => {
//     //Check permissions
//     console.log(`got ${event}`);
//     try {
//         const authResult = validateJWT(event);
//     if (authResult.authorized) {
//         console.log("Allowed");
//         return callback(
//             null,
//             generateAuthorizerResponse("user", "Allow", "*", authResult.info)
//         );
//     }
//     } catch (error) {
//         console.log(`Error on JWT v alidation ${error}`)
//     }
//         console.log(`Not allowed`);
//         return callback(
//             null,
//             generateAuthorizerResponse("user", "Deny", "*")
//         );
// };

// export const authorizeAdminOrJWT: CustomAuthorizerHandler = (event, context, callback) => {
//     //Authorized if using valid admin token or JWT
//     const modules = [validateAdminToken, validateJWT];
//     const authResult = authorizeIfAny(event, modules);
//     if (authResult.authorized) {
//         console.log("Allowed");
//         return callback(
//             null,
//             generateAuthorizerResponse("user", "Allow", "*", authResult.info)
//         );
//     } else {
//         console.log(`Not allowed`);
//         return callback(
//             null,
//             generateAuthorizerResponse("user", "Deny", "*")
//         );
//     }
// };
