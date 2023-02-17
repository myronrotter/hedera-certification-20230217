const {
    PrivateKey,
    TopicMessageSubmitTransaction,
    Client,
    AccountId
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '.env' });

const account2Id = AccountId.fromString(process.env.ACCOUNT_2_ID);
const account2PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_2_PRIVATE_KEY);

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
    const topicId = process.env.TOPIC_ID;
    console.log("The topic ID is " +topicId);

    const timestamp = Date.now();

    // Send one message
    let tx = await new TopicMessageSubmitTransaction({
        topicId: topicId,
        message: timestamp.toString(),
    }).freezeWith(client).sign(account2PrivateKey)

    let sendResponse = await tx.execute(client);

    //Get the receipt of the transaction
    const getReceipt = await sendResponse.getReceipt(client);

    //Get the status of the transaction
    const transactionStatus = getReceipt.status;
    console.log("The message transaction status: " + transactionStatus);

    process.exit();
}

main();
