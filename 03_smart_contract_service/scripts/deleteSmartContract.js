const {
    Client,
    PrivateKey,
    ContractId,
    ContractDeleteTransaction,
    AccountId,
} = require("@hashgraph/sdk");
require('dotenv').config({ path: '.env' });

console.log(process.env.ACCOUNT_1_ID);
console.log(process.env.ACCOUNT_1_PRIVATE_KEY);

const account1Id = AccountId.fromString(process.env.ACCOUNT_1_ID);
const account1PrivateKey = PrivateKey.fromString(process.env.ACCOUNT_1_PRIVATE_KEY);

// Throw error if not set
if (account1Id == null || account1PrivateKey == null ) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Connection to Hedera network
const client = Client.forTestnet();

client.setOperator(account1Id, account1PrivateKey);

async function main() {
    const contractId = ContractId.fromString(process.env.CONTRACT_ID);
    console.log("The smart contract ID is " + contractId);

    //Create the transaction
    const transaction = await new ContractDeleteTransaction()
        .setContractId(contractId)
        .setTransferAccountId(account1Id)
        .freezeWith(client);

    //Sign with the admin key on the contract
    const signTx = await transaction.sign(account1PrivateKey)

    //Sign the transaction with the client operator's private key and submit to a Hedera network
    const txResponse = await signTx.execute(client);

    //Get the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log("The transaction consensus status is " +transactionStatus.toString());

    process.exit();
}

main();
