const {
    Client,
    PrivateKey,
    AccountId,
    TransferTransaction,
    Hbar
} = require("@hashgraph/sdk");
require("dotenv").config({ path: ".env" });

// Accounts 1 to 4
const account1Id = AccountId.fromString(process.env.ACCOUNT_1_ID);
const account1PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_1_PRIVATE_KEY);
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
  const tokenId = process.env.TOKEN_ID;
  console.log("The smart contract ID is " + tokenId);

  // Not execute yet, but here is how it works
  // Associate token to account
   let associateTx = await new TokenAssociateTransaction()
        .setAccountId(account2Id)
        .setTokenIds([tokenId])
        .freezeWith(client)
        .sign(account2PrivateKey)

  // Make atomic transfer
  const atomicSwap = await new TransferTransaction()
        .addHbarTransfer(account1Id, new Hbar(-10))
        .addHbarTransfer(account2Id, new Hbar(10))
        .addTokenTransfer(tokenId, account1Id, -150)
        .addTokenTransfer(tokenId, account2Id, 150)
        //.build(client) build does not exist
        .freezeWith(client)

    //Sign the transaction with accountId1 and accountId2 private keys, submit the transaction to a Hedera network
    const txResponse = await (
        await (
            await atomicSwap.sign(account1PrivateKey)
        ).sign(account2PrivateKey)
    ).execute(client)

    let receipt = await txResponse.getReceipt(client)

  // Check balances

  process.exit();
}

main();
