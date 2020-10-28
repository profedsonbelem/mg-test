source $1

echo "Executing script of Serverless Deploy (${StageName})";


echo "--mongoUrl mongodb://${MongoUPW}@${MongoHost} "
echo "--clientDataBucket ${ClientDataBucket} "
echo "--senderEmail ${SenderEmail} "
echo "--role ${Role} "
echo "--key ${CryptoKey} "
echo "--iv ${Iv} "
echo "--secret ${Secret} "
echo "--failedEmail ${FailedEmail} "
echo "--resources ${Resources}"
echo "--jumioUserAgent ${JumioUserAgent}"
echo "--jumioRegion ${JumioRegion}"
echo "--jumioAuthorization ${JumioAuthorization}"




serverless logs \
    --function $2
    --mongoUrl "mongodb://${MongoUPW}@${MongoHost}" \
    --clientDataBucket "${ClientDataBucket}" \
    --senderEmail "${SenderEmail}" \
    --cryptoKey "${CryptoKey}" \
    --role "${Role}" \
    --iv "${Iv}" \
    --secret "${Secret}" \
    --failedEmail "${FailedEmail}" \
    --resources "${Resources}"\
    --stage "${StageName}"\
    --jumioUserAgent "${JumioUserAgent}"\
    --jumioRegion "${JumioRegion}"\
    --jumioAuthorization "${JumioAuthorization}"
sleep 3;

echo "Finish!"
