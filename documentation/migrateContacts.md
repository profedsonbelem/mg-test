# Migrate Contacts To Litify

    This script takes all the contacts from MongoDB, process them to create the litify types for contacts by e-mail and phone.

## Execution

    node lib/src/scripts/migrationDB/migrateContacts.js arguments

## Arguments

### envPath

        Path to json file with the necessary environment variables.

### Last

        Number of the last contact that was processed, if it's the first time, set it as zero.

### Salt

        The number of contacts processed between batches.

### Pause

        The number of batches that will be processed until the migration pauses and wait for the user input to continue.

##
