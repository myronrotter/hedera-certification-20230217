const {
    Client,
    PrivateKey,
    ScheduleInfoQuery
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '.env' });

console.log(process.env.MY_ACCOUNT_ID);
console.log(process.env.MY_PRIVATE_KEY);

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

// Throw error if not set
if (myAccountId == null || myPrivateKey == null ) {
  throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Connection to Hedera network
const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

async function main() {
    const scheduleId = process.env.SCHEDULE_ID;
    console.log("The schedule ID is " +scheduleId);

    //Create the query
    const query = new ScheduleInfoQuery()
     .setScheduleId(scheduleId);

    //Sign with the client operator private key and submit the query request to a node in a Hedera network
    const info = await query.execute(client);

    console.log("The schedule info: deleted timestamp: " +info.deleted);
    console.log("The schedule info: executed timestamp: " +info.executed);
    console.log("The schedule info: expiration timestamp: " +info.expirationTime);

    process.exit();
}

main();
