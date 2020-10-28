echo "installing global packages"
npm install -g serverless@1.75.1
npm install -g mocha
serverless plugin install --name serverless-webpackserverless config credentials --stage $1 --provider aws --key ${AWS_ACCESS_KEY_ID} --secret ${AWS_SECRET_KEY}

