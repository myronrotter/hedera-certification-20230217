const {
    Client,
    PrivateKey,
    Hbar,
    AccountCreateTransaction,
    AccountId,
    KeyList
} = require("@hashgraph/sdk");
require("dotenv").config({ path: ".env" });

// Accounts 1 to 3
const account1Id = AccountId.fromString(process.env.ACCOUNT_1_ID);
const account1PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_1_PRIVATE_KEY);
const account2Id = AccountId.fromString(process.env.ACCOUNT_2_ID);
const account2PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_2_PRIVATE_KEY);
const account3Id = AccountId.fromString(process.env.ACCOUNT_3_ID);
const account3PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_3_PRIVATE_KEY);

// Operator
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
  const keyList = new KeyList([account1PrivateKey.publicKey, account2PrivateKey.publicKey, account3PrivateKey.publicKey], 2);

    const transaction = new AccountCreateTransaction()
        .setInitialBalance(new Hbar(20))
        .setKey(keyList)

    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the account ID
    const accountId = receipt.accountId;

    console.log("Multisig account ID: " +accountId?.toString());

  process.exit();
}

main();
