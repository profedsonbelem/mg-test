/** @todo implment properly */
export function getTokenForMethod(methodArn: string): string {
  if (methodArn.endsWith("sendMail") || methodArn.endsWith("translateText")) {
    return "3YsyYH7duA8EjGDP";
  } else {
    return "ernj4ZLjhhm2sRxB";
  }
}
