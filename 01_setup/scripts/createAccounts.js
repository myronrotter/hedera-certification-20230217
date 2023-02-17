const {
    Client,
    PrivateKey,
    Hbar,
    AccountCreateTransaction
} = require("@hashgraph/sdk");
require("dotenv").config({ path: ".env" });

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
  for (let i = 1; i < 6; i++) {
    const privateKey = PrivateKey.generateED25519();

    console.log("Account " +i+ " private key: " +privateKey.toString());
    console.log("Account " +i+ " public key: " +privateKey.publicKey.toString());

    //Create the transaction
    const transaction = new AccountCreateTransaction()
      .setKey(privateKey.publicKey)
      .setInitialBalance(new Hbar(100));

    //Sign the transaction with the client operator private key and submit to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the account ID
    const accountId = receipt.accountId;

    console.log("Account " +i+ " ID: " +accountId?.toString());
  }

  process.exit();
}

main();
