const {
    Client,
    AccountBalanceQuery,
    TransferTransaction,
    Hbar,
    PrivateKey,
    AccountId
} = require("@hashgraph/sdk");
require("dotenv").config({ path: ".env" });

// Accounts 1 to 4
const account1Id = AccountId.fromString(process.env.ACCOUNT_1_ID);
const account1PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_1_PRIVATE_KEY);
const account2Id = AccountId.fromString(process.env.ACCOUNT_2_ID);
const account2PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_2_PRIVATE_KEY);
const account3Id = AccountId.fromString(process.env.ACCOUNT_3_ID);
const account3PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_3_PRIVATE_KEY);
const account4Id = AccountId.fromString(process.env.ACCOUNT_4_ID);
const account4PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_4_PRIVATE_KEY);

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
    // Multisig account ID
    const multisigAccountId = AccountId.fromString(process.env.MULTISIG_ACCOUNT_ID);
    console.log("The multisig ID is " +multisigAccountId);

    // Accounts to sign, then freez
    const nodeIds = [];
    nodeIds.push(new AccountId(3));

    // Create the transfer transaction
    const transferTransaction = new TransferTransaction()
    .addHbarTransfer(multisigAccountId, new Hbar(-10))
    .addHbarTransfer(account4Id, new Hbar(10))
    .setNodeAccountIds(nodeIds)
    .freezeWith(client);

    // Only account 1 signing transaction
    transferTransaction.sign(account1PrivateKey);

    console.log(`Doing transfer from ${multisigAccountId} to ${account4Id}`);

    // Sign with the client operator key and submit the transaction to a Hedera network
    const transactionResponse = await transferTransaction.execute(client);

    // Request the receipt of the transaction
    const receipt = await transactionResponse.getReceipt(client);

    // Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " + transactionStatus);

    // Create the queries
    const queryMine = new AccountBalanceQuery().setAccountId(multisigAccountId);
    const queryOther = new AccountBalanceQuery().setAccountId(account4Id);

    const multisigBalance = await queryMine.execute(client);
    const account4Balance = await queryOther.execute(client);

    console.log(`Multisig account balance ${multisigBalance.hbars} HBar, account 4 balance ${account4Balance.hbars}`);

    process.exit();
}

main();
