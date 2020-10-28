import Axios from "axios";

export async function getToken() {
  const SalesforceUrl = process.env.SalesforceUrl;
  const ClientIdLitify = process.env.ClientIdLitify;
  const ClientSecretLitify = process.env.ClientSecretLitify;
  const UsernameLitify = process.env.UsernameLitify;
  const PasswordLitify = process.env.PasswordLitify;

  console.log(
    "url",
    `${SalesforceUrl}/services/oauth2/token?grant_type=password&client_id=${ClientIdLitify}&client_secret=${ClientSecretLitify}&username=${UsernameLitify}&password=${PasswordLitify}`
  );
  const tokenLitify = await Axios.post(
    `${SalesforceUrl}/services/oauth2/token?grant_type=password&client_id=${ClientIdLitify}&client_secret=${ClientSecretLitify}&username=${UsernameLitify}&password=${PasswordLitify}`,
    {}
  )
    .then((res) => {
      console.log(
        `Successfully posted to ${SalesforceUrl}/services/oauth2/token?grant_type=password&client_id=${ClientIdLitify}&client_secret=${ClientSecretLitify}&username=${UsernameLitify}&password=${PasswordLitify}`
      );
      console.log(`Response: ${JSON.stringify(res.data)}`);

      const tokenLitify: { token: string } = {
        token: res.data.access_token,
      };

      return tokenLitify;
    })
    .catch((err) => {
      console.log(`Error on get token post ${err}`);
      throw err;
    });

  return tokenLitify.token;
}
