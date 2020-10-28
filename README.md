# Initial configs

1. Install node v13.2.0
2. Install serverless v1.67.0

# After cloning the repository, in the project directory

1. Run command to login in SheetJS
   `npm login --scope=@sheet --registry=https://pylon.sheetjs.com:54111/`
   `Ask your tech leader for access credentials`

2. `npm install`

# For test

1. Ask someone from your team for the file `development.sh` and place it in the folder `environment`

2. For offline test: `sls offline start`
   1. run servesless.yml `./sls\ scripts/offlineStart.sh environment/development.sh`
   2. run specific service `./sls\ scripts/offlineStart.sh environment/development.sh services/nameService.yml`

# Utils

1. robo3t
2. Postman
   `Ask someone from your team the link to the collection copy`
3. Visual Studio Code or other text editor / ide of your choice

[//]: # "# Folder Structure"
[//]: # "## documentation"
[//]: # "## sls scripts"
[//]: # "## src"
[//]: # "## tests"

# AWS CLI Version 2

1. Linux 64 bit

   1. Instal
      `curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"`
      `unzip awscliv2.zip`
      `sudo ./aws/install`
   2. verify the installation
      `aws --version`
      1. should return something like:
         aws-cli/2.0.33 Python/3.7.3 Linux/5.4.0-7634-generic botocore/2.0.0dev37
   3. configure
      `aws configure`

      1. AWS Access Key ID: `contact the suport to get that, if you don't have.`
      2. AWS Secret Access Key: `contact the suport to get that, if you don't have.`
      3. Default region name: `us-east-1`
      4. Default output format: `leave it blanck, just press enter.`

   4. Somenthing has change?
      Please, verify the documetation:
      `https://docs.aws.amazon.com/pt_br/cli/latest/userguide/install-cliv2-linux.html#cliv2-linux-install`
