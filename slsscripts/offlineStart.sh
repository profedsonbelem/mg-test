source $1

echo "Executing script of Serverless offilne start (${StageName})";


echo "--mongoUrl mongodb://${MongoUPW}@${MongoHost} "
echo "--clientDataBucket ${ClientDataBucket} "
echo "--senderEmail ${SenderEmail} "
echo "--role ${Role} "
echo "--cryptoKey ${CryptoKey} "
echo "--iv ${Iv} "
echo "--secret ${Secret} "
echo "--failedEmail ${FailedEmail} "
echo "--resources ${Resources}"
echo "--jumioUserAgent ${JumioUserAgent}"
echo "--jumioRegion ${JumioRegion}"
echo "--jumioAuthorization ${JumioAuthorization}"
echo "--callbackUrl ${CallbackUrl}"
echo "--emailBucket ${EmailBucket}"
echo "--carAPIKey ${CarAPIKey}"
echo "--questionnaireBucket ${QuestionnaireBucket}"
echo "--LitifyUrl ${LitifyUrl}"
echo "--SalesforceUrl ${SalesforceUrl}"
echo "--UsernameLitify ${UsernameLitify}"
echo "--PasswordLitify ${PasswordLitify}"
echo "--AuthorizationLitify ${AuthorizationLitify}"




serverless offline start --config $2 \
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
    --jumioAuthorization "${JumioAuthorization}"\
    --callbackUrl "${CallbackUrl}"\
    --emailBucket "${EmailBucket}"\
    --carAPIKey "${CarAPIKey}"\
    --questionnaireBucket "${QuestionnaireBucket}"\
    --LitifyUrl "${LitifyUrl}"\
    --SalesforceUrl "${SalesforceUrl}"\
    --UsernameLitify "${UsernameLitify}"\
    --PasswordLitify "${PasswordLitify}"\
    --restApiId "${RestApiId}"\
    --rootResourceId "${RootResourceId}"\
    --attachmentsBucket "${AttachmentsBucket}"\
    --queueURL "${QueueURL}"\
    --configurationSet "${ConfigurationSet}"\
    --outBucket "${OutBucket}"\
    --litifyClientId "${litifyClientId}"\
    --litifyClientSecret "${litifyClientSecret}"\
    --litifyRedirectUri "${litifyRedirectUri}"\
    --litifyInstanceUrl "${litifyInstanceUrl}"
    
sleep 3;

echo "Finish!"
