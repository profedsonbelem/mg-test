import { ConnectionLitify } from "../utils/database/conn";

async function main() {
  process.env.mongoUrl =
    "mongodb://microservices:lLyJv0rxkSm1JoIE@54.221.99.0:27017/microservicesdb";

  const conn = await ConnectionLitify.getConnection();
  conn.query("SELECT Id, Name FROM Account", {}, function (err, result) {
    if (err) {
      return console.error(err);
    }
    console.log("total : " + result.totalSize);
    console.log("fetched : " + result.records.length);
  });
}

main();
