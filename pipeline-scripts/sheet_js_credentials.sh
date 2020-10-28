echo "Setting Login credentials for sheetjs"
echo '@sheet:registry=https://'${NPM_REGISTRY_URL}'/' >> ~/.npmrc
echo '//'${NPM_REGISTRY_URL}'/:_authToken="'${NPM_TOKEN}'"' >> ~/.npmrc