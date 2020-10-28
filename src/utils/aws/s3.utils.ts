import { S3 } from "aws-sdk";

export async function getAttachment(
  bucket: string,
  key: string
): Promise<string> {
  console.log("GET ATT " + key);
  return new Promise((res, rej) => {
    var params = {
      Bucket: bucket,
      Key: key,
    };
    const s3 = new S3({ signatureVersion: "v4", region: "us-east-1" });
    s3.getObject(params, function(err, response) {
      if (err) {
        console.log("ERROR ON GETOBJECT", { bucket, key });
        rej(err);
      } // an error occurred
      else {
        res("a;base64," + response.Body.toString("base64"));
      } // successful response
    });
  });
}

/** @todo List all objects! Currently limited to 1000 */
async function listObjects(bucket: string, prefix: string): Promise<string[]> {
  console.log(`Get objects with prefix ${prefix} from bucket ${bucket}`);
  return new Promise((res, rej) => {
    const s3 = new S3({ signatureVersion: "v4", region: "us-east-1" });
    s3.listObjects(
      {
        Bucket: bucket,
        Prefix: prefix,
      },
      async (err, data) => {
        if (err) {
          console.log("Couldn't list objects");
          rej(err);
        } else {
          if (!data.Contents) {
            res([]);
          } else {
            const keys: string[] = [];
            for (let i in data.Contents) {
              const key = data.Contents[i].Key;
              if (!!key && !key.endsWith("/")) {
                keys.push(key);
              }
            }
            console.log(`Listed: ${JSON.stringify(keys)}`);

            res(keys);
          }
        }
      }
    );
  });
}

export async function getS3ObjectsWithPrefix(
  bucket: string,
  prefix: string
): Promise<{ key: string; file: S3.GetObjectOutput }[]> {
  const keys = await listObjects(bucket, prefix);

  return Promise.all(
    keys.map(async (key) => {
      return { key, file: await getS3Object(bucket, key) };
    })
  );
}

export async function getS3Object(
  bucket: string,
  key: string
): Promise<S3.GetObjectOutput> {
  console.log("GET Object " + key);
  return new Promise((res, rej) => {
    var params = {
      Bucket: bucket,
      Key: key,
    };
    const s3 = new S3({ signatureVersion: "v4", region: "us-east-1" });
    s3.getObject(params, function(err, response) {
      console.log("Inside get object");
      if (err) {
        console.log("ERROR ON GETOBJECT", { bucket, key });
        console.log(err);
        rej(err);
      } // an error occurred
      else {
        console.log(`Got response: ${response.ETag}`);
        res(response);
      } // successful response
    });
  });
}

export async function putObjectOnS3(
  body: any,
  bucket: string,
  key: string,
  encoding?: string
): Promise<S3.PutObjectOutput> {
  console.log("PUT Object " + key);
  return new Promise((res, rej) => {
    var params = {
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentEncoding: encoding,
    };
    const s3 = new S3({ signatureVersion: "v4", region: "us-east-1" });
    s3.putObject(params, function(err, response) {
      if (err) {
        console.log("ERROR ON PUTOBJECT", { bucket, key });
        rej(err);
      } // an error occurred
      else {
        console.log("\n\n\n\nresponse\n\n\n");
        console.log(response);
        console.log("\n\n\n\n\n\n\n");
        res(response);
      } // successful response
    });
  });
}

export async function getS3SignedUrl(
  bucket: string,
  key: string,
  operation: string
) {
  const s3Path = `${bucket}/${key}`;
  //Get temporary credential
  console.log(`Trying to get signed url`);
  const s3 = new S3({ signatureVersion: "v4", region: "us-east-1" });

  const url = await s3.getSignedUrlPromise(operation, {
    Bucket: bucket,
    Key: key,
    Expires: 300,
  }); // tenta

  console.log(`Got url ${url}`);
  return url;
}
