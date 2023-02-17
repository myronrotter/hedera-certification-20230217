const {
    TopicCreateTransaction,
    Client,
    PrivateKey,
    AccountId
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '.env' });

const account1Id = AccountId.fromString(process.env.ACCOUNT_1_ID);
const account1PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_1_PRIVATE_KEY);

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
    //Create a new topic
    let tx = await new TopicCreateTransaction()
        .setAdminKey(account1PrivateKey.publicKey)
        .setSubmitKey(account1PrivateKey.publicKey)
        .freezeWith(client)
        .sign(account1PrivateKey)

    let txResponse = await tx.execute(client);

    //Get the receipt of the transaction
    let receipt = await txResponse.getReceipt(client);

    //Grab the new topic ID from the receipt
    let topicId = receipt.topicId;

    //Log the topic ID
    console.log(`Your topic ID is: ${topicId}`);

    // Wait 5 seconds between consensus topic creation and subscription
    await new Promise((resolve) => setTimeout(resolve, 5000));

    process.exit();
}

main();
