const {
    TransferTransaction,
    Client,
    ScheduleCreateTransaction,
    PrivateKey,
    Hbar, ScheduleInfoQuery, AccountId
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '.env' });

const account1Id = AccountId.fromString(process.env.ACCOUNT_1_ID);
const account2Id = AccountId.fromString(process.env.ACCOUNT_2_ID);

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
    //Create a transaction to schedule
    const transaction = new TransferTransaction()
        .addHbarTransfer(account1Id, new Hbar(-2))
        .addHbarTransfer(account2Id, new Hbar(2));

    //Schedule a transaction
    const scheduleTransaction = await new ScheduleCreateTransaction()
        .setScheduledTransaction(transaction)
        .setScheduleMemo("Scheduled TX!")
        .setAdminKey(myPrivateKey)
        .execute(client);

    //Get the receipt of the transaction
    const receipt = await scheduleTransaction.getReceipt(client);

    //Get the schedule ID
    const scheduleId = receipt.scheduleId;
    console.log("The schedule ID is " +scheduleId);

    //Get the scheduled transaction ID
    const scheduledTxId = receipt.scheduledTransactionId;
    console.log("The scheduled transaction ID is " +scheduledTxId);

    process.exit();
}

main();
